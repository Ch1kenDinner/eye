import { FlattenSimpleInterpolation } from "styled-components";
import { theme } from "twin.macro";

export const formatInt = (str: string) =>
  str.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ".");

export const debounce = (fn: any, delay: number) => {
  let timer: NodeJS.Timeout | undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const templateSearch = (
  template: FlattenSimpleInterpolation,
  find: string
) => {
  return !!(template[0] as string).match(find);
};

export const formatLink = (str: string) => {
  return str.split(" ").map((el) =>
    /(http[s]*):\/\/(www)*\w+\..+/.test(el) ? (
      <a target={"_blank"} rel="noreferrer" href={el}>
        {el}
      </a>
    ) : (
      el + " "
    )
  );
};

export const getThemeScreens = () => {
  return Object.entries(theme("screens"))
    .map(([screen, width]): [string, number] => [
      screen,
      Number(width.slice(0, -2)),
    ])
    .sort((a, b) => (a[1] < b[1] ? 1 : -1));
};
