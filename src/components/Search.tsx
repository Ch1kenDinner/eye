import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { ThemeScreens } from "../App";
import { debounce } from "../common/helpers";
import { DP } from "../common/types";
import { useCustomState } from "../hooks/useCustomState";
import useThemeCurrentScreen from "../hooks/useThemeCurrentScreen";
import { mainActions } from "../redux/mainSlice";
import { useCustomDispatch } from "../redux/store";

type IWrapperProps = Partial<typeof initState>;

const initState = {
  text: "",
  loading: false,
  isOpen: false,
  isMinified: true,
};

const Search = ({ className }: DP) => {
  const state = useCustomState(initState);
  const dispatch = useCustomDispatch();

  const currentScreen = useThemeCurrentScreen(ThemeScreens);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      dispatch(mainActions.setField({ field: "searchQuery", value: text }));
    }, 2000),
    []
  );

  const setSearchQuery = () => {
    state.text.length &&
      dispatch(
        mainActions.setField({ field: "searchQuery", value: state.text + " " })
      );
  };

  const handleBlurInput = (e: any) => {
    if (
      ![
        wrapperRef.current,
        ...(wrapperRef.current?.getElementsByTagName("*") ?? []),
      ].includes(e.target)
    ) {
      state.isOpen = false;
      window.removeEventListener("pointerdown", handleBlurInput);
    }
  };

  const handleSearchBtnClick = () => {
    if (state.isMinified && !state.isOpen) {
      state.isOpen = true;
    } else if (state.isMinified && state.isOpen) {
      setSearchQuery();
    }
  };
  useEffect(() => {
    if (state.isOpen) {
      inputRef.current?.focus();
      window.addEventListener("pointerdown", handleBlurInput);
    }
  }, [state.isOpen]);

  const handleKeydown = (e: KeyboardEvent) => {
    e.code === "Enter" && setSearchQuery();
  };

  useEffect(() => {
    switch (currentScreen) {
      case "zero":
      case "sm":
        state.isMinified = true;
        break;
      default:
        state.isMinified = false;
    }
  }, [currentScreen]);

  useEffect(() => {
    debouncedSearch(state.text);
  }, [state.text]);

  return (
    <Wrapper
      {...{ isOpen: state.isOpen, isMinified: state.isMinified }}
      className={className}
      ref={wrapperRef}
    >
      <Input
        ref={inputRef}
        onBlur={() => (state.isOpen = false)}
        type="text"
        value={state.text}
        onKeyDown={handleKeydown}
        onChange={(e) => (state.text = e.target.value)}
      />
      <Button onClick={handleSearchBtnClick}>
        <Icon />
      </Button>
    </Wrapper>
  );
};

var Wrapper = styled.div((p: IWrapperProps) => [
  tw`flex items-center w-full h-full `,
  p.isMinified &&
    !p.isOpen &&
    css`
      justify-content: end;
      ${Input} {
        display: none;
      }
    `,
  // p.isMinified &&
  //   p.isOpen &&
  //   css`
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;

  //     height: 3rem;

  //     ${Input}, ${Button} {
  //       background-color: var(--black);
  //       z-index: 10;
  //     }
  //   `,
]);

var Input = styled.input(() => [
  tw`h-[3rem] grow bg-black-10 outline-none px-2 text-2xl text-white overflow-hidden border-b-2 border-b-red`,
]);

var Button = styled.button(() => [
  tw`h-[3rem] px-2 cursor-pointer bg-black-10 border-b-2 border-b-red`,
]);

var Icon = styled(IoSearchOutline)`
  ${tw`stroke-1 text-2xl text-red`}
`;

export default styled(Search)``;
