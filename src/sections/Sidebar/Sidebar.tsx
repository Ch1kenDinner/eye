import classNames from "classnames";
import { categories } from "../../common/const";
import { DP } from "../../common/types";
import { mainActions } from "../../redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "../../redux/store";
import s from "./Sidebar.module.scss";

const Sidebar = ({ className }: DP) => {
  const { currentCategory } = useCustomSelector((state) => state.main);
  const dispatch = useCustomDispatch();

  const handleClick = (category: string) => {
    dispatch(
      mainActions.setField({ field: "currentCategory", value: category })
    );
  };

  return (
    <section className={classNames(s.main, className)}>
      <ul className={s.list}>
        {categories.map((el) => (
          <li
            onClick={() => handleClick(el.name)}
            className={classNames(s.item, {
              [s.current]: el.name == currentCategory,
            })}
          >
            {el.icon}
            <div className={s.text}>{el.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
