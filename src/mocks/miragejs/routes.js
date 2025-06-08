import { createServer, Response, Model } from "miragejs";

import peopleMock from "../api/swapi/people.json";
import { PEOPLE_BY_ID_ROUTE, PEOPLE_ROUTE } from "../../commons/utils/requests";


createServer({

  routes() {
    // this.namespace = import.meta.env.VITE_API_NAME_SPACE;
    this.timing = 250;
    this.logging = true;

    const headers = {};

    // If your API requests go to an external domain, pass those through by
    // specifying the fully qualified domain name
    this.passthrough("http://api.acme.com/**");

    // Sample with json
    // return simple json copiyng from api
    this.get('/people', (schema, request) => {
      const data = peopleMock;
      console.log('Miragejs: GET people schema: ', schema, ' request: ', request);
      return new Response(200, headers, data);
    });

    this.get('/people/:id' + PEOPLE_BY_ID_ROUTE, (schema, request) => {
      const [ personById ] = peopleMock;
      const data = personById;
      return new Response(200, headers, data);
    });

    // Sample with models:
    // return dynamisc models based on miragejs

    this.post('/' + PEOPLE_ROUTE, (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const data = {
        id: 2
      };

      return new Response(201, headers, data);
    });

    this.put('/' + PEOPLE_BY_ID_ROUTE, (schema, request) => {
      const { id } = request.params;
      let people = peopleMock.find((x) => x.id === id);
      if (!people) {
        return new Response(404, headers, {
          message: `People with id ${id} not found!`,
        });
      }

      const data = {};

      return new Response(204, headers, data);
    });

    

    this.delete('/' + PEOPLE_BY_ID_ROUTE, (schema, request) => {
      const { id } = request.params;
      let people = peopleMock.find((x) => x.id === id);
      if (!people) {
        return new Response(404, headers, {
          message: `People with id ${id} not found!`,
        });
      }
      const data = {};
      return new Response(204, headers, data);
    });
  },
});

export default function () { return createServer }
