import { describe, it, expect } from "vitest";
import { SWApiPeopleService } from ".";
import { PeopleModel } from '../../../models/swapi/peoples';


describe('Services : Base', () => {
  const service = new SWApiPeopleService();  

  it('get should return success', () => {
    const result = service.getPeople();
    expect(result).to.not.null;
  })

  it('post should return success', () => {
    const body : PeopleModel = {
      name: "",
      height: "",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
      homeworld: "",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "",
      edited: "",
      url: ""
    };
    const result = service.postPeople(body);
    expect(result).to.not.null;
  })

  it('put should return success', () => {
    const body : PeopleModel = {
      name: "",
      height: "",
      mass: "",
      hair_color: "",
      skin_color: "",
      eye_color: "",
      birth_year: "",
      gender: "",
      homeworld: "",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "",
      edited: "",
      url: ""
    };
    const result = service.putPeopleById({
      id: '1', 
      data: body
    });
    expect(result).to.not.null;
  })

  it('delete should return success', () => {
    const result = service.deletePeopleById({
      id: '1'
    });
    expect(result).to.not.null;
  })
})