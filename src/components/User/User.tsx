import classNames from "classnames";
import { useEffect } from "react";
import { IChannelDetails } from "../../api/types/channelDetailsResponse";
import { DP, IDefaultState } from "../../common/types";
import { useCustomState } from "../../hooks/useCustomState";
import channelDetails from "../../mocks/channelDetails";
import s from "./User.module.scss";

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

  useEffect(() => {
    if (!channelId) return;
    // setLoading(true);
    // api
    //   .get<IChannelDetailsResponse>(apiRoutes.channelDetails(channelId))
    //   .then(({ data }) => setData(data.items[0]))
    //   .finally(() => setLoading(false));
    state.data = channelDetails.items[0];
  }, [channelId]);

  if (state.loading) return <span className={s.message}>Loading</span>;
  if (!state.data) return <span className={s.message}>Not found</span>;

  return (
    <div
      className={classNames(s.main, className, {
        [s[size]]: size,
      })}
    >
      <div className={s.image}>
        <img src={state.data.snippet.thumbnails.high.url} alt={"user_image"} />
      </div>
      <div className={s.name}>{state.data.snippet.title}</div>
    </div>
  );
};

export default User;
