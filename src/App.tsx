import { SiPlayerdotme } from "react-icons/si";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import tw from "twin.macro";
import { getThemeScreens, templateSearch } from "./common/helpers";
import Search from "./components/Search";
import User from "./components/User";
import useCurrentScreenWidth from "./hooks/useCurrentScreenWidth";
import { IMainState, mainActions } from "./redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "./redux/store";
import Sidebar from "./sections/Sidebar";
import VideoDetails from "./sections/VideoDetails";
import VideoList from "./sections/VideoList";

export const ThemeScreens = getThemeScreens();

type ITemplate = Record<
  IMainState["currentTemplate"],
  {
    default: FlattenSimpleInterpolation;
    [index: string]: FlattenSimpleInterpolation;
  }
>;

const templates: ITemplate = {
  index: {
    md: css`
      grid-template:
        " logo search ." 3rem
        " cards cards cards"
        / 1fr 1fr 1fr;
    `,
    default: css`
      grid-template:
        " logo search ." 3rem
        " cards cards cards"
        / auto 1fr calc(10px);
    `,
  },
  details: {
    lg: css`
      grid-template:
        " logo . search" 3rem
        " details details cards"
        / auto 3fr 2fr;
    `,
    md: css`
      grid-template:
        " logo . search" 3rem
        " details details cards"
        / auto 3fr 2fr;
    `,
    default: css`
      grid-template:
        " logo . search" 3rem
        " details details details" max-content
        "cards cards cards"
        / auto 1fr auto;
    `,
  },
  channel: {
    default: css`
      grid-template:
        " logo user ." 3rem
        " cards cards cards" 1fr
        / auto auto 1fr;
    `,
  },
};

const App = (): JSX.Element => {
  const { videoId, channelId, searchQuery, currentTemplate } =
    useCustomSelector((state) => state.main);
  const dispatch = useCustomDispatch();

  const currentScreenWidth = useCurrentScreenWidth(200);

  const handleReset = () => {
    dispatch(mainActions.reset());
  };

  const calcCurrentTemplate = () => {
    const currentTemplateScreens = templates[currentTemplate];

    const template = Object.entries(currentTemplateScreens).find(
      ([screen, style]) => {
        const configScreen = ThemeScreens.find(
          ([configScreen, width]) =>
            screen == configScreen && currentScreenWidth > width
        );
        return configScreen;
      }
    );
    return template ? template[1] : currentTemplateScreens.default;
  };

  return (
    <Wrapper template={calcCurrentTemplate()}>
      <Sidebar />
      <LogoWrapper onClick={() => handleReset()}>
        <SiPlayerdotme />
      </LogoWrapper>
      <User channelId={channelId} />
      <Search />
      <VideoList />
      <VideoDetails />
    </Wrapper>
  );
};

var LogoWrapper = styled.div(() => [
  tw`flex w-min items-center cursor-pointer space-x-2 pl-[4px] text-4xl`,
  tw`after:(content-['Eye'] text-white)`,
  css`
    svg {
      transform: rotate(-55deg) translate(-20%, 0%);
    }
  `,
]);

const Wrapper = styled.div(
  ({ template }: { template: FlattenSimpleInterpolation }) => [
    tw`grid h-screen gap-2 relative bg-black pl-[3.5rem]`,
    template,
    css`
      & > ${LogoWrapper} {
        grid-area: logo;
        display: ${!templateSearch(template, "logo") && "none"};

        margin-right: 1rem;
      }
      & > ${User} {
        grid-area: user;
        display: ${!templateSearch(template, "user") && "none"};

        align-self: center;
        padding: 0.3rem 0 0;
        color: var(--white);
        font-weight: bold;
      }
      & > ${VideoList} {
        grid-area: cards;
        display: ${!templateSearch(template, "cards") && "none"};
      }
      & > ${VideoDetails} {
        grid-area: details;
        display: ${!templateSearch(template, "details") && "none"};
      }
      & > ${Search} {
        grid-area: search;
        display: ${!templateSearch(template, "search") && "none"};
      }
    `,
  ]
);

export default App;
