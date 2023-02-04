import User from "../../components/User/User";
import VideoList from "../VideoList/VideoList";
import s from "./ChannelDetails.module.scss";

const ChannelDetails = () => {
  return (
    <section className={s.main}>
      <User size="lg" />
      <VideoList />
    </section>
  );
};

export default ChannelDetails;
