import { useState } from "react";
import CertificateIssuance from "./components/CertificateIssuance";
import CertificateVerification from "./components/CertificateVerification";
import CertificateRevocation from "./components/CertificateRevocation";
import CertificateTransfer from "./components/CertificateTransfer";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./components/HomePage";
import RevocationAppeal from "./components/RevocationAppeal";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <CertificateIssuance /> */}
      {/* <CertificateVerification /> */}
      <CertificateRevocation/>
       {/* <CertificateTransfer /> */}
       {/* <AdminPanel/> */}
       {/* <HomePage /> */}
       {/* <RevocationAppeal /> */}
    </>
  );
}

export default App;
