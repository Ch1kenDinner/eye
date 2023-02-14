import { useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { api } from "../api";
import apiRoutes from "../api/apiRoutes";
import {
  IChannelVideo,
  IChannelVideosResponse,
} from "../api/types/channelVideosResponse";
import { ISearchResponse, IVideo } from "../api/types/searchResponse";
import { DP } from "../common/types";
import VideoCard from "../components/VideoCard";
import { useCustomState } from "../hooks/useCustomState";
import searchResponse from "../mocks/searchResponse";
import { useCustomSelector } from "../redux/store";

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

  const { currentCategory, searchQuery, channelId, currentTemplate } =
    useCustomSelector((state) => state.main);

  const fetchCategorySearch = async () => {
    if (!currentCategory) return;
    return api
      .get<ISearchResponse>(apiRoutes.search(currentCategory))
      .then(({ data }) => {
        state.data = data.items;
      });
  };

  const fetchQuerySearch = () => {
    if (!searchQuery) return;
    return api
      .get<ISearchResponse>(apiRoutes.search(searchQuery))
      .then(({ data }) => (state.data = data.items));
  };

  const fetchChannelVideos = () => {
    if (!channelId) return;
    return api
      .get<IChannelVideosResponse>(apiRoutes.channelVideos(channelId))
      .then(({ data }) => (state.data = data.items));
  };

  useEffect(() => {
    state.data = searchResponse.items;
  }, []);

  // useEffect(() => {
  //   switch (currentTemplate) {
  //     case "index":
  //       fetchCategorySearch();
  //   }
  // }, [currentTemplate]);

  // useEffect(() => {
  //   switch (currentTemplate) {
  //     case "index":
  //       fetchCategorySearch();
  //       break;
  //   }
  // }, [currentCategory]);

  // useEffect(() => {
  //   switch (currentTemplate) {
  //     case "index":
  //     case "details":
  //       fetchQuerySearch();
  //   }
  // }, [searchQuery]);

  // useEffect(() => {
  //   switch (currentTemplate) {
  //     case "channel":
  //       fetchChannelVideos();
  //   }
  // }, [channelId]);

  // if (state.loading) return <>Load</>;
  // if (!state.data) return <>Not found</>;

  return (
    <Wrapper className={className}>
      {state.data.map((el) => (
        <VideoCard data={el} />
      ))}
    </Wrapper>
  );
};

var Wrapper = styled.div(() => [
  tw`overflow-y-auto`,
  css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(10rem + 5vh), 1fr));
    gap: 1rem;
  `,
]);

export default styled(VideoList)``;
