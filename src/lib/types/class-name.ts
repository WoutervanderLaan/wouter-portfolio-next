import { HTMLAttributes } from "react";

export type ClassName<T = HTMLElement> = HTMLAttributes<T>["className"];
