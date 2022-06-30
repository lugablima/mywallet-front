import GlobalStyle from "../assets/globalStyle/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ExtractPage from "./ExtractPage";
import TransactionPage from "./TransactionPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/extrato" element={<ExtractPage />} />
          <Route path="/registro" element={<TransactionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
