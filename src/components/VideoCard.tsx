import styled, { css } from "styled-components";
import tw from "twin.macro";
import { IVideo } from "../api/types/searchResponse";
import { DP } from "../common/types";
import { mainActions } from "../redux/mainSlice";
import { useCustomDispatch } from "../redux/store";

export interface VideoCardProps extends DP {
  data: IVideo;
}

const VideoCard = ({ data, className }: VideoCardProps) => {
  const dispatch = useCustomDispatch();

  const handleClick = () => {
    dispatch(
      mainActions.setField({ field: "videoId", value: data.id.videoId })
    );
    dispatch(
      mainActions.setField({ field: "currentTemplate", value: "details" })
    );
  };

  const handleChannelClick = () => {
    dispatch(
      mainActions.setField({
        field: "channelId",
        value: data.snippet.channelId,
      })
    );
    dispatch(
      mainActions.setField({ field: "currentTemplate", value: "channel" })
    );
  };

  return (
    <Wrapper className={className}>
      <ImageWrapper onClick={handleClick}>
        <img
          src={data.snippet.thumbnails.medium.url}
          height={data.snippet.thumbnails.medium.height}
          width={data.snippet.thumbnails.medium.width}
          alt="preview"
        />
      </ImageWrapper>
      <Title onClick={handleClick}>{data.snippet.title}</Title>
      <Channel onClick={handleChannelClick}>
        {data.snippet.channelTitle}
      </Channel>
    </Wrapper>
  );
};

var Wrapper = styled.div(() => [
  tw`flex flex-col text-white border-solid border-black-10 pb-2`,
]);

var ImageWrapper = styled.div(() => [
  tw`w-full cursor-pointer`,
  css`
    aspect-ratio: 16/9;
    img {
      height: 100%;
      width: 100%;
      aspect-ratio: 16/9;
    }
  `,
]);

var Title = styled.div(() => [tw`px-2 text-sm cursor-pointer my-2 font-bold`]);

var Channel = styled.div(() => [tw`px-2 text-xs mt-auto cursor-pointer`]);

export default styled(VideoCard)``;
