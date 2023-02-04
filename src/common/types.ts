import { DetailedHTMLProps, HTMLAttributes } from "react";

export type DP = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface IDefaultState<T> {
  loading: boolean;
  data?: T;
}
