import { useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CertificateIssuance from "./components/CertificateIssuance";
import CertificateVerification from "./components/CertificateVerification";
import CertificateRevocation from "./components/CertificateRevocation";
import CertificateTransfer from "./components/CertificateTransfer";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./components/HomePage";
import RevocationAppeal from "./components/RevocationAppeal";
import "w3-css/w3.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/certificate-revocation" element={<CertificateRevocation />} />
      <Route path="/certificate-transfer" element={<CertificateTransfer />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/certificate-issuance" element={<CertificateIssuance />} />
      <Route path="/revocation-appeal" element={<RevocationAppeal />} />
      <Route path="/certificate-verification" element={<CertificateVerification />} />

    </Routes>
    
    </>
  );
}

export default App;
