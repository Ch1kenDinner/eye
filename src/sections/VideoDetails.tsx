import { useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { api } from "../api";
import apiRoutes from "../api/apiRoutes";
import {
  IVideoDetailsItem,
  IVideoDetailsResponse,
} from "../api/types/videoDetailsResponse";
import { formatInt, formatLink } from "../common/helpers";
import { DP } from "../common/types";
import User from "../components/User";
import { useCustomState } from "../hooks/useCustomState";
import { useCustomSelector } from "../redux/store";

interface IInitState {
  loading: boolean;
  data?: IVideoDetailsItem;
  descOpened: boolean;
}

const initState: IInitState = {
  loading: false,
  descOpened: false,
  data: undefined,
};

const VideoDetails = ({ className }: DP) => {
  const state = useCustomState(initState);

  const { videoId } = useCustomSelector((state) => state.main);

  const fetchVideoDetails = async () => {
    if (!videoId) return Promise.reject(new Error("videoId is undefined"));
    api
      .get<IVideoDetailsResponse>(apiRoutes.videoDetails(videoId))
      .then(({ data }) => (state.data = data.items[0]));
  };

  useEffect(() => {
    if (!videoId) return;
    state.loading = true;
    fetchVideoDetails().finally(() => (state.loading = false));
  }, [videoId]);

  // if (state.loading) return <>Loading...</>;
  if (!state.data) return <></>;

  return (
    <Wrapper className={className}>
      <Frame src={`https://www.youtube.com/embed/${videoId}`} />
      <StatWrapper>
        <User channelId={state.data.snippet.channelId} />
        <Stat>
          <BiLike />
          <span>{formatInt(state.data.statistics.likeCount)}</span>
        </Stat>
        <Stat>
          <BsEye />
          <span>{formatInt(state.data.statistics.viewCount)}</span>
        </Stat>
      </StatWrapper>
      <Title>{state.data.snippet.title}</Title>
      <DescWrapper isOpen={state.descOpened}>
        <Desc>{formatLink(state.data.snippet.description)}</Desc>
        <OpenBtn
          onClick={() => {
            state.descOpened = !state.descOpened;
          }}
        >
          <IoIosArrowDown />
        </OpenBtn>
      </DescWrapper>
    </Wrapper>
  );
};

var Wrapper = styled.div(() => [
  tw`flex flex-col overflow-y-auto space-y-2 text-white`,
  css`
    ${User} {
      margin-right: auto;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  `,
]);
var Frame = styled.iframe(() => [tw`aspect-video w-full`]);
var StatWrapper = styled.div(() => [
  tw`flex bg-black-10 p-2 rounded-b-2xl space-x-4 h-12 items-center`,
]);
var Stat = styled.div(() => [tw`flex items-center space-x-1`]);
var Title = styled.div(() => [tw`text-2xl`]);

var DescWrapper = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`flex flex-col space-y-1`,
  !isOpen &&
    css`
      ${Desc} {
        overflow: hidden;
        max-height: 4.5rem;
      }
    `,
  isOpen &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `,
]);
var Desc = styled.p(() => [
  tw`block`,
  css`
    a {
      font-weight: bold;
      border-bottom: 1px solid var(--red);
    }
  `,
]);
var OpenBtn = styled.button(() => [
  tw`flex justify-center items-center w-full min-h-[2rem] rounded-2xl bg-black-10`,
]);

export default styled(VideoDetails)``;
