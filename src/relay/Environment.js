import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

//criamos uma querry
const fetchQuery = async (request, variables) => {
  const body = JSON.stringify({
    query: request.text,
    variables,
  });

  //passando o link da base/server
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
  };
  const response = await fetch(
    'http://localhost:5000/graphql', {
    method: 'POST',
    headers,
    body,

  });
  // GraphQL responde com um json
  return await response.json();
};

//forma de conexão com o banco
const network = Network.create(
  fetchQuery
);

//como armazenaremos o dado
const source = new RecordSource();
const store = new Store(source);
const env = new Environment({
  network,
  store,
});
export default env;