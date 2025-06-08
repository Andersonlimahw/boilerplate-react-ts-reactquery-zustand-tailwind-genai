import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { IAction, initialState, reducer } from "../flux";

export type IThemeType = {
  type: 'dark' | 'light' | 'green' | 'blue' | 'purple' | 'red' | 'yellow' | 'pink'
}

export interface ThemeType { 
  type: IThemeType,
  styles: {
    gradient: string,
    background: string,
  }
}

export interface IState { 
  theme: ThemeType
}

const useStore = (set : any) => ({
  ...initialState,
  dispatch: ({ type, payload } : IAction) => set(
    (state : IState) => reducer(state, { type, payload }),
    true,
    {
      type: type, 
      payload: payload,
    }
  ),  
});

export const useStoreHook = create(devtools(useStore))

