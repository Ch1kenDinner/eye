import { useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { api } from "../api";
import apiRoutes from "../api/apiRoutes";
import {
  IChannelDetails,
  IChannelDetailsResponse,
} from "../api/types/channelDetailsResponse";
import { DP, IDefaultState } from "../common/types";
import { useCustomState } from "../hooks/useCustomState";
import channelDetails from "../mocks/channelDetails";
import { mainActions } from "../redux/mainSlice";
import { useCustomDispatch } from "../redux/store";

export interface UserProps extends DP {
  channelId?: string;
  size?: "md" | "lg";
}

const initState: IDefaultState<IChannelDetails> = {
  loading: false,
  data: undefined,
};

const User = ({ channelId, className, size = "md" }: UserProps) => {
  const state = useCustomState(initState);
  const dispatch = useCustomDispatch();

  const handleChannelClick = () => {
    dispatch(
      mainActions.setField({
        field: "channelId",
        value: channelId,
      })
    );
    dispatch(
      mainActions.setField({ field: "currentTemplate", value: "channel" })
    );
  };

  useEffect(() => {
    if (!channelId) return;
    // state.loading = true;
    // api
    //   .get<IChannelDetailsResponse>(apiRoutes.channelDetails(channelId))
    //   .then(({ data }) => (state.data = data.items[0]))
    //   .finally(() => (state.loading = false));
    state.data = channelDetails.items[0];
  }, [channelId]);

  if (state.loading) return <></>;
  if (!state.data) return <></>;

  return (
    <Wrapper onClick={handleChannelClick} className={className}>
      <img src={state.data.snippet.thumbnails.high.url} />
      <p>{state.data.snippet.title}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div(({ isFlex = true }: { isFlex?: boolean }) => [
  tw`h-full w-auto whitespace-nowrap cursor-pointer`,
  isFlex && tw`flex items-center space-x-2`,
  css`
    img {
      height: 100%;
      width: auto;
      border-radius: 50%;
      overflow: hidden;
    }
  `,
]);

export default styled(User)``;
