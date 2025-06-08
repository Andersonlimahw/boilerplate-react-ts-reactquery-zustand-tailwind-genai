import { describe, it, expect } from "vitest";
import BaseService from ".";


describe('Services : Base', () => {
  const service = new BaseService();  

  it('get should return success', () => {
    const result = service.GetAsync({
      endpoint: 'people'
    });
    expect(result).to.not.null;
  })

  it('post should return success', () => {
    const result = service.PostAsync({
      endpoint: 'people', 
      requestBody: {}
    });
    expect(result).to.not.null;
  })

  it('put should return success', () => {
    const result = service.PutAsync({
      endpoint: 'people', 
      requestBody: {}
    });
    expect(result).to.not.null;
  })

  it('delete should return success', () => {
    const result = service.DeleteAsync({
      endpoint: 'people'
    });
    expect(result).to.not.null;
  })
})