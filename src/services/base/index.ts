import { BASE_URL, httpClient } from "../../commons/utils/requests";
import { IDeleteInput, IGetInput, IPostInput, IPutInput } from "../../interfaces/Ibase-service";

export default class BaseService<T> {
    protected baseUrl: string;

    constructor() {
        this.baseUrl = BASE_URL;
    }

    public  async GetAsync({
        endpoint, 
        params, 
        options
    }: IGetInput) : Promise<T> {
        let requestUrl = `${this.baseUrl}/${endpoint}`
        if(params) {
            requestUrl += `?${params}`;
        }
        return httpClient({
            url: requestUrl,
            options: {
                method: 'GET', 
                ...options
            }
        })
        .then((response : T) => response)
        .catch((ex) => {
            throw new Error(ex);
        });
    }

    public  async PostAsync({
        endpoint, 
        requestBody,
        options,
    }: IPostInput) : Promise<T> {
        const requestUrl = `${this.baseUrl}/${endpoint}`
        return httpClient({
            url: requestUrl,
            options: {
                ...options,
                method: 'POST',
                body: JSON.stringify(requestBody),                      
                headers: {
                    'Content-Type': 'application/json', 
                    ...options?.headers,
                },
            }
        })
        .then((response : T) => response)
        .catch((ex) => {
            throw new Error(ex);
        });;
    }

    public  async PutAsync({
        endpoint, 
        requestBody, 
        options,
    }: IPutInput) : Promise<T> {
        const requestUrl = `${this.baseUrl}/${endpoint}`
        return httpClient({
            url: requestUrl,
            options: {
                ...options,
                method: 'PUT',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json', 
                    ...options?.headers,
                }                
            }
        })
        .then((response : T) => response)
        .catch((ex) => {
            throw new Error(ex);
        });;
    }

    public  async DeleteAsync({
        endpoint, 
        options,
    }: IDeleteInput) : Promise<T> {
        const requestUrl = `${this.baseUrl}/${endpoint}`
        return httpClient({
            url: requestUrl,
            options: {
                ...options,
                method: 'DELETE',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json', 
                    ...options?.headers,
                },                
            }
        })
        .then((response : T) => response)
        .catch((ex) => {
            throw new Error(ex);
        });;
    }

}