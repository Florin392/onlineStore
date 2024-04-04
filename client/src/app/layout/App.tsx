import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/products";
import { Typography } from "@mui/material";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "some descrp",
        pictureUrl: "htpp://picsum.photo/200",
      },
    ]);
  }

  return (
    <>
      <Typography variant="h1"></Typography>

      <Catalog products={products} addProduct={addProduct} />
    </>
  );
}
