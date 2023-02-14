import styled, { css } from "styled-components";
import tw from "twin.macro";
import { categories } from "../common/const";
import { DP } from "../common/types";
import { mainActions } from "../redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "../redux/store";
// import s from "./Sidebar.module.scss";

const Sidebar = ({ className }: DP) => {
  const { currentCategory } = useCustomSelector((state) => state.main);
  const dispatch = useCustomDispatch();

  const handleClick = (category: string) => {
    dispatch(
      mainActions.setField({ field: "currentCategory", value: category })
    );
    dispatch(
      mainActions.setField({ field: "currentTemplate", value: "index" })
    );
  };

  return (
    <Wrapper className={className}>
      {categories.map((el) => {
        return (
          <Item
            isCurrent={el.name == currentCategory}
            onClick={() => handleClick(el.name)}
          >
            {el.icon}
            <p className="text">{el.name}</p>
          </Item>
        );
      })}
    </Wrapper>
  );
};

var Wrapper = styled.div(() => [
  tw`px-2 bg-black absolute left-0 top-[3.5rem] bottom-0`,
  css`
    grid-area: sidebar;
    cursor: pointer;

    &:hover .text {
      margin-left: 0.5rem;
    }
    &:not(:hover) .text {
      width: 0;
      overflow: hidden;
    }
  `,
]);

var Item = styled.div(({ isCurrent }: { isCurrent: boolean }) => [
  tw`flex p-2 items-center text-white text-2xl`,
  isCurrent && tw`shadow-[red 0px -2px 1px 0px inset]`,
  css`
    &:hover {
      box-shadow: red 0px -2px 1px 0px inset;
    }
  `,
]);

const Text = styled.div(() => [tw``]);

export default Sidebar;
