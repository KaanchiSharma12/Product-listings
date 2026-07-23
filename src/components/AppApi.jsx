import { useEffect } from "react";
import { getProducts } from "../services/api";

function AppApi() {

  useEffect(() => {

    async function fetchProducts() {
      const data = await getProducts();
      console.log(data);
    }

    fetchProducts();

  }, []);

  return (
    <h1>Check Console</h1>
  );
}

export default AppApi;