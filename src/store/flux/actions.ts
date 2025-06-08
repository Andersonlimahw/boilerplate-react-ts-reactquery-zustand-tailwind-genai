export enum EActionType {  
  SET_LOADING = "SET_LOADING",
  SET_PEOPLE = "SET_PEOPLE",
  SET_THEME = "SET_THEME",
}

export interface IAction {
  type: EActionType;
  payload: any;
}
