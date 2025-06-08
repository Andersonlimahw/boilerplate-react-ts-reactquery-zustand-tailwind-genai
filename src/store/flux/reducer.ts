import { IState } from "../hooks/use-store";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";

const selectedGradientThemeStyles: any = {
  light: "from-zinc-400 to-zinc-600",
  green: "from-green-900 to-green-400",
  blue: "from-blue-900 to-blue-400",
  purple: "from-purple-900 to-purple-400",
  red: "from-red-900 to-red-400",
  yellow: "from-yellow-800 to-yellow-900",
  pink: "from-pink-900 to-pink-400",
  dark: "from-zinc-900 to-zinc-400",
  "": "from-zinc-900 to-zinc-400",
  null: "from-zinc-900 to-zinc-400",
};

const selectedBackgroundThemeStyles: any = {
  light: "bg-white-900",
  green: "bg-green-900",
  blue: "bg-blue-900",
  purple: "bg-purple-900",
  red: "bg-red-900",
  yellow: "bg-yellow-600",
  pink: "bg-pink-900",
  dark: "bg-zinc-900",
  "": "bg-zinc-900",
  null: "bg-zinc-900",
};

const selectedTextThemeStyles: any = {
  light: "text-zinc-900",
  green: "text-zinc-100",
  blue: "text-zinc-100",
  purple: "text-zinc-100",
  red: "text-zinc-900",
  yellow: "text-zinc-900",
  pink: "text-zinc-900",
  dark: "text-zinc-100",
  "": "text-zinc-100",
  null: "text-zinc-100",
};

export const reducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case EActionType.SET_LOADING:
      return {
        ...initialState,
        ...state,
        loading: payload.loading,
      };
    case EActionType.SET_PEOPLE:
      return {
        ...initialState,
        ...state,
        people: payload.people
      };
    case EActionType.SET_THEME:
      return {
        ...initialState,
        ...state,
        theme: {
          type: payload.theme.type,
          styles: {
            gradient:
              selectedGradientThemeStyles[payload.theme.type] ?? "bg-zinc-900",
            background:
              selectedBackgroundThemeStyles[payload.theme.type] ??
              "bg-zinc-900",
            text:
              selectedTextThemeStyles[payload.theme.type] ?? "text-zinc-100",
          },
        },
      };
  }
};
