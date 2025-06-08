const enviroment = import.meta.env;
const BASE_URL_API = enviroment.VITE_API_BASE_URL;
const NAMESPACE = enviroment.VITE_API_NAME_SPACE;

export let BASE_URL = `${BASE_URL_API}/${NAMESPACE}`;

if(import.meta.env.DEV) {
  BASE_URL = '';
}

export const PEOPLE_ROUTE = `people`;
export const PEOPLE_BY_ID_ROUTE = `people/:id`;