import { RootState } from "./index";

declare module "react-redux" {
  export interface DefaultRootState extends RootState {}
}
