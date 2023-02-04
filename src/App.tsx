import classNames from "classnames";
import { SiPlayerdotme } from "react-icons/si";
import s from "./App.module.scss";
import { DP } from "./common/types";
import Search from "./components/Search/Search";
import User from "./components/User/User";
import { mainActions } from "./redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "./redux/store";
import Sidebar from "./sections/Sidebar/Sidebar";
import VideoDetails from "./sections/VideoDetails/VideoDetails";
import VideoList from "./sections/VideoList/VideoList";

const App = (): JSX.Element => {
  const { videoId, channelId, searchQuery } = useCustomSelector(
    (state) => state.main
  );
  const dispatch = useCustomDispatch();

  const handleReset = () => {
    // videoId &&
    // dispatch(mainActions.setField({ field: "videoId", value: undefined }));
    dispatch(mainActions.reset());
  };

  return (
    <main
      className={classNames({
        [s.details]: videoId,
        [s.channel]: channelId,
      })}
    >
      <Logo onClick={() => handleReset()} />
      <Sidebar className={classNames(s.sidebar, s.visible)} />
      <VideoDetails
        className={classNames(s.details, {
          [s.visible]: videoId,
        })}
      />
      <Search
        className={classNames(s.search, {
          [s.visible]: !channelId,
        })}
      />
      <User
        className={classNames(s.user, {
          [s.visible]: channelId,
        })}
        size="lg"
        channelId={channelId}
      />
      <VideoList
        className={classNames(s.cards, s.visible, {
          // [s.visible]: !channelId,
        })}
      />
    </main>
  );
};

const Logo = ({ onClick }: DP) => (
  <div className={classNames(s.logo, s.visible)} onClick={onClick}>
    <SiPlayerdotme />
    <span>Eye</span>
  </div>
);

export default App;
