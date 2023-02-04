export interface IChannelVideosResponse {
  kind: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: IChannelVideo[];
}

export interface IChannelVideo {
  kind: string;
  id: Id;
  snippet: Snippet;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
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

interface Id {
  kind: string;
  videoId?: string;
  playlistId?: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
