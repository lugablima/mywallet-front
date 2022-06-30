import GlobalStyle from "../assets/globalStyle/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ExtractPage from "./ExtractPage";
import TransactionPage from "./TransactionPage";
import UserContext from "../contexts/UserContext";

export default function App() {
  const API = "http://localhost:5000";
  const [token, setToken] = useState("");

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ API, token, setToken }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/extrato" element={<ExtractPage />} />
            <Route path="/registro" element={<TransactionPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
