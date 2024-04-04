import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog />
      </Container>
    </>
  );
}
