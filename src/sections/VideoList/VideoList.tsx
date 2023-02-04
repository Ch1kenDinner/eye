import classNames from "classnames";
import { useEffect } from "react";
import { api } from "../../api";
import apiRoutes from "../../api/apiRoutes";
import {
  IChannelVideo,
  IChannelVideosResponse,
} from "../../api/types/channelVideosResponse";
import { ISearchResponse, IVideo } from "../../api/types/searchResponse";
import { DP } from "../../common/types";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useCustomState } from "../../hooks/useCustomState";
import searchResponse from "../../mocks/searchResponse";
import { useCustomSelector } from "../../redux/store";
import s from "./VideoList.module.scss";

interface IInitState {
  loading: boolean;
  data: IVideo[] | IChannelVideo[];
}

const initState: IInitState = {
  loading: false,
  data: [],
};

export const VideoList = ({ className }: DP) => {
  const state = useCustomState(initState);

  const { currentCategory, searchQuery, channelId } = useCustomSelector(
    (state) => state.main
  );

  const fetchCategorySearch = async () => {
    return api
      .get<ISearchResponse>(apiRoutes.search(currentCategory))
      .then(({ data }) => {
        state.data = data.items;
      });
  };

  const fetchQuerySearch = () => {
    if (!searchQuery)
      return Promise.reject(new Error("searchQuery is undefined"));
    return api
      .get<ISearchResponse>(apiRoutes.search(searchQuery))
      .then(({ data }) => (state.data = data.items));
  };

  useEffect(() => {
    // state.loading = true;
    // fetchCategorySearch().finally(() => (state.loading = false));
    state.data = searchResponse.items;
  }, [currentCategory]);

  useEffect(() => {
    // state.loading = true;
    // if (searchQuery) {
    //   fetchQuerySearch().finally(() => (state.loading = false));
    // } else {
    //   fetc
    state.data = searchResponse.items;
  }, [searchQuery]);

  useEffect(() => {
    if (!channelId) return;
    state.loading = true;
    api
      .get<IChannelVideosResponse>(apiRoutes.channelVideos(channelId))
      .then(({ data }) => {
        state.data = data.items;
      })
      .finally(() => (state.loading = false));
  }, [channelId]);

  if (state.loading) return <>Load</>;
  if (!state.data) return <>Not found</>;

  return (
    <div className={classNames(s.main, className)}>
      {state.data.map((el) => (
        <VideoCard data={el} />
      ))}
    </div>
  );
};

export default VideoList;
