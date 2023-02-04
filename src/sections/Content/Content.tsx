import cn from "classnames";
import { useEffect, useState } from "react";
import { IVideo } from "../../api/types/searchResponse";
import { DP } from "../../common/types";
import VideoCard from "../../components/VideoCard/VideoCard";
import mocks from "../../mocks/searchResponse";
import { useCustomSelector } from "../../redux/store";
import VideoDetails from "../VideoDetails/VideoDetails";
import s from "./Content.module.scss";

const Content = ({ className }: DP) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IVideo[]>();

  const { currentCategory } = useCustomSelector((state) => state.main);

  useEffect(() => {
    // setLoading(true);
    // api
    //   .get<ISearchResponse>(apiRoutes.search(currentCategory))
    //   .then(({ data }) => setData(data.items))
    //   .finally(() => setLoading(false));
    setData(mocks.items);
  }, [currentCategory]);

  if (loading) return <>Load</>;
  if (!data) return <>Not found</>;

  return (
    <section className={cn(s.main, className)}>
      <VideoDetails className={s.details} />
      <div className={s.list}>
        {data.map((el) => (
          <VideoCard data={el} />
        ))}
      </div>
    </section>
  );
};

export default Content;
