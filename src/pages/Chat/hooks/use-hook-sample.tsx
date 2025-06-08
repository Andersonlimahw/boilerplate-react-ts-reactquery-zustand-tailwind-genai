
import { useEffect } from "react";
import { EActionType } from "../../../store/flux";
import { useStoreHook } from "../../../store/hooks/use-store";
import { SWApiPeopleService } from '../../../services/swapi/people/index';
import { PeopleModel } from "../../../models";
import { useQuery } from "@tanstack/react-query";


export const useHookSample = () => {
  const useStore = useStoreHook((state: any) => state);
  const swApiPeopleService =  new SWApiPeopleService();
  const {
    dispatch, 
    theme
  } = useStore;

  async function fetchPeople() {
    return await swApiPeopleService.getPeople()
    .then((data : PeopleModel[]) => {
      return data as PeopleModel[];
    }).catch((error) => console.error('subscribeSample : ', error));    
  };

  const peopleQuery = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const data = await fetchPeople();
      console.log('React query sample: ', data);
      return data;
    },
  });

  return {
    peopleQuery, 
    theme,
    dispatch
  }
}