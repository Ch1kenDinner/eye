export interface IVideoDetailsResponse {
  kind: string;
  items: IVideoDetailsItem[];
  pageInfo: PageInfo;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface IVideoDetailsItem {
  kind: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: RegionRestriction;
  contentRating: ContentRating;
  projection: string;
}

interface ContentRating {}

interface RegionRestriction {
  blocked: string[];
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
}

interface Localized {
  title: string;
  description: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}
