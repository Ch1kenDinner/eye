import { IVideo } from "../../api/types/searchResponse";
import { DP } from "../../common/types";
import { mainActions } from "../../redux/mainSlice";
import { useCustomDispatch } from "../../redux/store";
import s from "./VideoCard.module.scss";

export interface VideoCardProps extends DP {
  data: IVideo;
}

const VideoCard = ({ data }: VideoCardProps) => {
  const dispatch = useCustomDispatch();

  const handleClick = () => {
    dispatch(
      mainActions.setField({ field: "videoId", value: data.id.videoId })
    );
  };

  const handleChannelClick = () => {
    dispatch(
      mainActions.setField({
        field: "channelId",
        value: data.snippet.channelId,
      })
    );
  };

  return (
    <div className={s.main}>
      <div className={s.image}>
        <img
          src={data.snippet.thumbnails.medium.url}
          height={data.snippet.thumbnails.medium.height}
          width={data.snippet.thumbnails.medium.width}
          alt="preview"
        />
      </div>
      <h4 onClick={handleClick} className={s.title}>
        {data.snippet.title}
      </h4>
      <span onClick={handleChannelClick} className={s.channel}>
        {data.snippet.channelTitle}
      </span>
    </div>
  );
};

export default VideoCard;
