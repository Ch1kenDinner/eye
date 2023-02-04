/* eslint-disable import/no-anonymous-default-export */
export default {
  search: (q: string, part = "snippet", maxResults = "50") =>
    `/search?q=${q}&part=${part}&maxResults=${maxResults}`,
  videoDetails: (videoId: string, part = "contentDetails") =>
    `/videos?id=${videoId}&part=${part}`,
  channelDetails: (channelId: string, part = "snippet") =>
    `/channels?part=${part}&id=${channelId}`,
  channelVideos: (
    channelId: string,
    part = "snippet,id",
    order = "date",
    maxResults = "50"
  ) =>
    `/search?channelId=${channelId}&part=${part}&order=${order}&maxResults=${maxResults}`,
};
