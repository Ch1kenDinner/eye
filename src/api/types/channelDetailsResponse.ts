export interface IChannelDetailsResponse {
  kind: string;
  pageInfo: PageInfo;
  items: IChannelDetails[];
}

export interface IChannelDetails {
  kind: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  brandingSettings: BrandingSettings;
}

interface BrandingSettings {
  channel: Channel;
  image: Image;
}

interface Image {
  bannerExternalUrl: string;
}

interface Channel {
  title: string;
  description: string;
  keywords: string;
  unsubscribedTrailer: string;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
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
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
