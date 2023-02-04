import classNames from "classnames";
import { useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { api } from "../../api";
import apiRoutes from "../../api/apiRoutes";
import {
  IVideoDetailsItem,
  IVideoDetailsResponse,
} from "../../api/types/videoDetailsResponse";
import { formatInt } from "../../common/helpers";
import { DP } from "../../common/types";
import User from "../../components/User/User";
import { useCustomState } from "../../hooks/useCustomState";
import videoDetailsResponse from "../../mocks/videoDetailsResponse";
import { useCustomSelector } from "../../redux/store";
import s from "./VideoDetails.module.scss";

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
    // if (!videoId) return;
    // state.loading = true;
    // fetchVideoDetails().finally(() => (state.loading = false));
    state.data = videoDetailsResponse.items[0];
    // state.data && api.get(apiRoutes.channelDetails(state.data?.snippet.channelId));
  }, [videoId]);

  if (state.loading) return <>Loading...</>;
  if (!state.data) return <>Not found</>;

  return (
    <section className={classNames(s.main, className)}>
      <iframe
        className={s.frame}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Embedded youtube"
      />
      <div className={s.info}>
        <User className={s.user} channelId={state.data.snippet.channelId} />
        <div className={s.watch}>
          <BsEye />
          <span>{formatInt(state.data.statistics.viewCount)}</span>
        </div>
        <div className={s.like}>
          <BiLike />
          <span>{formatInt(state.data.statistics.likeCount)}</span>
        </div>
      </div>
      <h2 className={s.title}>{state.data.snippet.title}</h2>
      <p
        className={classNames(s.desc, {
          [s.opened]: state.descOpened,
        })}
      >
        {state.data.snippet.description.split(" ").map((el) =>
          /(http[s]*):\/\/(www)*\w+\..+/.test(el) ? (
            <a target={"_blank"} rel="noreferrer" href={el}>
              {el}
            </a>
          ) : (
            el + " "
          )
        )}
      </p>
      <button
        onClick={() => {
          state.descOpened = !state.descOpened;
        }}
        className={s.showBtn}
      >
        <IoIosArrowDown
          className={classNames({
            [s.opened]: state.descOpened,
          })}
        />
      </button>
    </section>
  );
};

export default VideoDetails;
