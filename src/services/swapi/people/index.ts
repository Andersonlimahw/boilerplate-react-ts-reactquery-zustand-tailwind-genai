// Interfaces

interface IBaseInput {
  id: string;
}

interface IDeletePeopleInput extends IBaseInput {}

type IPostPeopleInput = PeopleModel;

interface IPostPeopleOutput extends IBaseInput {}

interface IGetPeopleByIdInput extends IBaseInput {}

interface IPutPeopleInput {
  data: PeopleModel;
  id: string;
}

import BaseService from "../../base";
import { PeopleModel } from "../../../models/swapi/peoples";
import { BASE_URL, PEOPLE_BY_ID_ROUTE, PEOPLE_ROUTE } from "../../../commons/utils/requests";

// Méthods:
export class SWApiPeopleService extends BaseService<PeopleModel[]> {

  public async postPeople(data: IPostPeopleInput): Promise<IPostPeopleOutput> {
    return await this.PostAsync({
      endpoint: PEOPLE_ROUTE,
      requestBody: data as any,
    }).then((data: any) => {
      // any customization
      const response: IPostPeopleOutput = {
        id: data.id,
      };
      return response;
    });
  }

  public async getPeople(): Promise<PeopleModel[]> {
    return await this.GetAsync({
      endpoint: PEOPLE_ROUTE,
    }).then((data: PeopleModel[]) =>
      data.map((item) => {
        return item;
      })
    );
  }

  public async getPeopleById({
    id,
  }: IGetPeopleByIdInput): Promise<PeopleModel[]> {
    return await this.GetAsync({
      endpoint: PEOPLE_BY_ID_ROUTE.replace(':id', id),
    }).then((data: PeopleModel[]) =>
      data.map((item) => {
        return item;
      })
    );
  }

  public async putPeopleById({ id, data }: IPutPeopleInput): Promise<boolean> {
    return await this.PutAsync({
      endpoint: PEOPLE_BY_ID_ROUTE.replace(':id', id),
      requestBody: data as any,
    }).then((_) => true);
  }

  public async deletePeopleById({ id }: IDeletePeopleInput): Promise<boolean> {
    return await this.DeleteAsync({
      endpoint: PEOPLE_BY_ID_ROUTE.replace(':id', id),
    }).then((_) => true);
  }
}
