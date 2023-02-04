import classNames from "classnames";
import { KeyboardEvent, useCallback, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "../../common/helpers";
import { DP } from "../../common/types";
import { useCustomState } from "../../hooks/useCustomState";
import { mainActions } from "../../redux/mainSlice";
import { useCustomDispatch } from "../../redux/store";
import s from "./Search.module.scss";

const initState = {
  text: "",
  loading: false,
};

const Search = ({ className }: DP) => {
  const state = useCustomState(initState);
  const dispatch = useCustomDispatch();

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      dispatch(mainActions.setField({ field: "searchQuery", value: text }));
    }, 2000),
    []
  );

  const handleKeydown = (e: KeyboardEvent) => {
    console.log("handleKEydown");
    e.code === "Enter" &&
      dispatch(
        mainActions.setField({ field: "searchQuery", value: state.text + " " })
      );
  };

  useEffect(() => {
    debouncedSearch(state.text);
  }, [state.text]);

  return (
    <div className={classNames(s.search, className)}>
      <input
        type="text"
        value={state.text}
        onKeyDown={handleKeydown}
        onChange={(e) => (state.text = e.target.value)}
      />
      <button className={s.searchBtn}>
        <IoSearchOutline />
      </button>
    </div>
  );
};

export default Search;
