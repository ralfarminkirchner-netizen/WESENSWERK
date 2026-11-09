export interface WikiSummaryData {
  title: string;
  extract: string;
  description?: string;
  thumbnailUrl?: string;
  pageUrl: string;
  lang: 'de' | 'en';
}

export interface PubMedArticle {
  pmid: string;
  title: string;
  source: string;
  pubdate: string;
  authors: string;
  url: string;
}

export interface OlsTermResult {
  iri: string;
  oboId: string;
  label: string;
  ontologyName: string;
  description: string;
}

const wikiCache = new Map<string, WikiSummaryData>();
const pubmedCache = new Map<string, PubMedArticle[]>();
const olsCache = new Map<string, OlsTermResult[]>();

export async function fetchWikipediaSummary(
  wikiTitleDe: string,
  wikiTitleEn: string
): Promise<WikiSummaryData | null> {
  const cacheKey = `${wikiTitleDe}|${wikiTitleEn}`;
  if (wikiCache.has(cacheKey)) {
    return wikiCache.get(cacheKey)!;
  }

  try {
    const deUrl = `https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitleDe)}`;
    const deRes = await fetch(deUrl);
    if (deRes.ok) {
      const data = await deRes.json();
      if (data.extract) {
        const result: WikiSummaryData = {
          title: data.title ?? wikiTitleDe,
          extract: data.extract,
          description: data.description,
          thumbnailUrl: data.thumbnail?.source,
          pageUrl:
            data.content_urls?.desktop?.page ??
            `https://de.wikipedia.org/wiki/${encodeURIComponent(wikiTitleDe)}`,
          lang: 'de'
        };
        wikiCache.set(cacheKey, result);
        return result;
      }
    }
  } catch {
    // Fallback to English Wikipedia below
  }

  try {
    const enUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitleEn)}`;
    const enRes = await fetch(enUrl);
    if (enRes.ok) {
      const data = await enRes.json();
      if (data.extract) {
        const result: WikiSummaryData = {
          title: data.title ?? wikiTitleEn,
          extract: data.extract,
          description: data.description,
          thumbnailUrl: data.thumbnail?.source,
          pageUrl:
            data.content_urls?.desktop?.page ??
            `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitleEn)}`,
          lang: 'en'
        };
        wikiCache.set(cacheKey, result);
        return result;
      }
    }
  } catch {
    // Ignore network errors in offline/hermetic environments
  }

  return null;
}

export async function fetchPubMedArticles(query: string, maxResults = 3): Promise<PubMedArticle[]> {
  if (pubmedCache.has(query)) {
    return pubmedCache.get(query)!;
  }

  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(
      query
    )}&sort=relevance&retmode=json&retmax=${maxResults}&tool=AIStudioBuild&email=scientist@example.com`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return [];
    const searchJson = await searchRes.json();
    const idList: string[] = searchJson?.esearchresult?.idlist ?? [];
    if (idList.length === 0) return [];

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(
      ','
    )}&retmode=json&tool=AIStudioBuild&email=scientist@example.com`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) return [];
    const summaryJson = await summaryRes.json();
    const resultObj = summaryJson?.result ?? {};

    const articles: PubMedArticle[] = [];
    for (const pmid of idList) {
      const item = resultObj[pmid];
      if (item && item.title) {
        const authorsList = Array.isArray(item.authors)
          ? item.authors
              .slice(0, 3)
              .map((a: { name?: string }) => a.name)
              .filter(Boolean)
              .join(', ')
          : 'PubMed Autorenkollektiv';
        articles.push({
          pmid,
          title: String(item.title).replace(/\.$/, ''),
          source: item.source ?? 'PubMed',
          pubdate: item.pubdate ?? '',
          authors: authorsList,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
        });
      }
    }

    pubmedCache.set(query, articles);
    return articles;
  } catch {
    return [];
  }
}

export async function fetchOlsOntologyTerms(searchTerm: string): Promise<OlsTermResult[]> {
  if (olsCache.has(searchTerm)) {
    return olsCache.get(searchTerm)!;
  }

  try {
    const url = `https://www.ebi.ac.uk/ols4/api/search?q=${encodeURIComponent(
      searchTerm
    )}&ontology=hp,mondo,doid&rows=3`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    const docs = json?.response?.docs ?? [];
    const terms: OlsTermResult[] = docs.map((d: Record<string, unknown>) => ({
      iri: String(d.iri ?? ''),
      oboId: String(d.obo_id ?? d.short_form ?? ''),
      label: String(d.label ?? searchTerm),
      ontologyName: String(d.ontology_prefix ?? 'HPO/MONDO').toUpperCase(),
      description: Array.isArray(d.description) && d.description.length > 0
        ? String(d.description[0])
        : 'Klinischer Ontologie-Eintrag (EMBL-EBI OLS4)'
    }));
    olsCache.set(searchTerm, terms);
    return terms;
  } catch {
    return [];
  }
}

export interface PubMedPairEvidenceResult {
  totalCount: number;
  articles: PubMedArticle[];
}

const pubmedPairCache = new Map<string, PubMedPairEvidenceResult>();

export async function fetchPubMedPairEvidence(
  query: string,
  maxResults = 2
): Promise<PubMedPairEvidenceResult | null> {
  if (pubmedPairCache.has(query)) {
    return pubmedPairCache.get(query)!;
  }

  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(
      query
    )}&sort=relevance&retmode=json&retmax=${maxResults}&tool=AIStudioBuild&email=scientist@example.com`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchJson = await searchRes.json();
    const rawCount = Number(searchJson?.esearchresult?.count ?? 0);
    const idList: string[] = searchJson?.esearchresult?.idlist ?? [];

    if (idList.length === 0) {
      const emptyRes: PubMedPairEvidenceResult = { totalCount: rawCount, articles: [] };
      pubmedPairCache.set(query, emptyRes);
      return emptyRes;
    }

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(
      ','
    )}&retmode=json&tool=AIStudioBuild&email=scientist@example.com`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) {
      return { totalCount: rawCount, articles: [] };
    }
    const summaryJson = await summaryRes.json();
    const resultObj = summaryJson?.result ?? {};

    const articles: PubMedArticle[] = [];
    for (const pmid of idList) {
      const item = resultObj[pmid];
      if (item && item.title) {
        const authorsList = Array.isArray(item.authors)
          ? item.authors
              .slice(0, 2)
              .map((a: { name?: string }) => a.name)
              .filter(Boolean)
              .join(', ')
          : 'PubMed Autorenkollektiv';
        articles.push({
          pmid,
          title: String(item.title).replace(/\.$/, ''),
          source: item.source ?? 'PubMed',
          pubdate: item.pubdate ?? '',
          authors: authorsList,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
        });
      }
    }

    const finalRes: PubMedPairEvidenceResult = {
      totalCount: Math.max(rawCount, articles.length),
      articles
    };
    pubmedPairCache.set(query, finalRes);
    return finalRes;
  } catch {
    return null;
  }
}

