export async function getProducts() {
  const response = await fetch("http://localhost:8888/jsonapi/node/page");
  const data = await response.json();
  return data.data;
}