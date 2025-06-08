
interface RequestInput {
  url: string;
  options: any;
}

export const httpClient = async ({
  url,
  options,
} : RequestInput) => {
  return await fetch(url, {...options})
  .then(res => res.json())
  .catch(ex => console.error('Erro do fetch api: ', ex));
}