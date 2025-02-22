import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProposeCertificate from "./components/ProposeCertificate";
import CertificateVerification from "./components/CertificateVerification";
import CertificateRevocation from "./components/CertificateRevocation";
import CertificateTransfer from "./components/CertificateTransfer";
import AdminPanel from "./components/AdminPanel";
import HomePage from "./components/HomePage";
import RevocationAppeal from "./components/RevocationAppeal";
import ApproveCertificate from "./components/ApproveCertificate";
import "w3-css/w3.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/certificate-revocation"
          element={<CertificateRevocation />}
        />
        <Route path="/certificate-transfer" element={<CertificateTransfer />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/propose-certificate" element={<ProposeCertificate/>} />
        <Route path="/revocation-appeal" element={<RevocationAppeal />} />
        <Route
          path="/certificate-verification"
          element={<CertificateVerification />}  />
          <Route path="/Approve-certificate" element={<ApproveCertificate />} /> 
       
      </Routes>
    </>
  );
}

export default App;
