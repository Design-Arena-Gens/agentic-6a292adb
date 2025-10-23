export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  socialCaptions: {
    twitter: string;
    linkedin: string;
    threads: string;
  };
  readTime: number;
  eli5Summary: string;
  sourceUrl?: string;
}

export interface TrendingTopic {
  title: string;
  source: string;
  url: string;
  description: string;
  relevanceScore: number;
  publishedDate: string;
}

export interface SEOAnalysis {
  targetKeywords: string[];
  suggestions: string[];
  backlinkIdeas: string[];
  internalLinkOpportunities: string[];
}
