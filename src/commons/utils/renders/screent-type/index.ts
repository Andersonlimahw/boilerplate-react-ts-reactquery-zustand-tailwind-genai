import { UseQueryResult } from "@tanstack/react-query";
import { EScreenState } from "../../../../enums";

export const stateKey = (queryResult : UseQueryResult) : EScreenState => {
    const {
        isLoading,
        isRefetching,
        isError,
        data
    } = queryResult;
    if(isLoading || isRefetching) {
      return EScreenState.loading;
    }
    if(isError) {
      return EScreenState.error;
    }
    if(!isLoading && !isError && data === null) {
      return EScreenState.noCotent;
    }
    return EScreenState.success;
  };