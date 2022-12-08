import GlobalStyle from "../assets/globalStyle/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ExtractPage from "./ExtractPage";
import TransactionPage from "./TransactionPage";
import UserContext from "../contexts/UserContext";

export default function App() {
  const API = process.env.REACT_APP_API_BASE_URL;
  const [userInfos, setUserInfos] = useState({ name: "", token: "" });

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ API, userInfos, setUserInfos }}>
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
