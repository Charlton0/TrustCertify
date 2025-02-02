import { useState } from "react";
import CertificateIssuance from "./components/CertificateIssuance";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CertificateIssuance />
    </>
  );
}

export default App;
