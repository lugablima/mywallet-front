import styled from "styled-components";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import isValidEmail from "../functions/isValidEmail";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function SignInPage() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisable] = useState(false);
  const { API, setUserInfos } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleForm(e) {
    e.preventDefault();

    for (const prop in inputs) inputs[prop] = inputs[prop].trim();

    if (!isValidEmail(inputs.email)) return alert("E-mail inválido, tente novamente!");

    setIsDisable(true);

    const body = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const res = await axios.post(`${API}/sign-in`, body);

      setUserInfos(res.data);

      navigate("/extrato");
    } catch (error) {
      if (error.response.status === 401) alert(error.response.data);
      else if (error.response.status === 500) alert("Erro interno no servidor, tente novamente mais tarde!");
      setIsDisable(false);
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={handleForm}>
        <input
          type="email"
          value={inputs.email}
          disabled={isDisabled}
          required
          placeholder="E-mail"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        <input
          type="password"
          value={inputs.password}
          disabled={isDisabled}
          required
          placeholder="Senha"
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <button disabled={isDisabled}>
          {isDisabled ? <ThreeDots color="#ffffff" width={51} height={51} /> : "Entrar"}
        </button>
      </form>
      <Link to="/cadastro" style={{ pointerEvents: isDisabled ? "none" : "" }}>
        <h6>Primeira vez? Cadastre-se!</h6>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font: 400 32px/50px "Saira Stencil One", cursive;
    color: #fff;
    margin-bottom: 24px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 100%;
    max-width: 326px;
    height: 58px;
    background: #fff;
    border-radius: 5px;
    padding: 18px 0 17px 15px;
    margin-bottom: 13px;
    font: 400 20px/23px "Raleway", sans-serif;
    color: #000;
    outline: #000;
    border: none;
  }

  input::placeholder {
    color: #000;
  }

  input:disabled {
    background: #f2f2f2;
    color: #afafaf;
  }

  button {
    width: 100%;
    max-width: 326px;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    border: none;
    padding: 0;
    margin-bottom: 36px;
    font: 700 20px/23px "Raleway", sans-serif;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    opacity: 0.7;
    cursor: default;
  }

  h6 {
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    font: 700 15px/18px "Raleway", sans-serif;
    color: #fff;
    cursor: pointer;
  }
`;
