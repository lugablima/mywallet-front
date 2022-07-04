import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import isValidAmount from "../functions/isValidAmount";

export default function TransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const [inputs, setInputs] = useState({ amount: "", description: "" });
  const [isDisabled, setIsDisable] = useState(false);
  const {
    API,
    userInfos: { token },
  } = useContext(UserContext);

  async function handleForm(e) {
    e.preventDefault();

    for (const prop in inputs) inputs[prop] = inputs[prop].trim();

    if (!isValidAmount(inputs.amount)) return alert("Quantia inválida, insira uma quantia no formato (Ex: 230,90)!");

    if (inputs.description === "") return alert("Insira alguma descrição!");

    setIsDisable(true);

    const body = {
      amount: inputs.amount.replace(",", "."),
      description: inputs.description,
      type,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(`${API}/extract`, body, config);

      navigate("/extrato");
    } catch (error) {
      if (error.response.status === 401) alert("Erro de autenticação, tente novamente mais tarde!");
      else if (error.response.status === 422) alert("Os dados informados estão no formato incorreto, tente novamente!");
      else if (error.response.status === 500) alert("Erro interno no servidor, tente novamente mais tarde!");
      setIsDisable(false);
    }
  }

  return (
    <Container>
      <div>
        <p>Nova {type}</p>
      </div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          value={inputs.amount}
          disabled={isDisabled}
          required
          placeholder="Valor"
          onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
        />
        <input
          type="text"
          value={inputs.description}
          disabled={isDisabled}
          required
          placeholder="Descrição"
          onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        />
        <button disabled={isDisabled}>
          {isDisabled ? <ThreeDots color="#ffffff" width={51} height={51} /> : `Salvar ${type}`}
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
    max-width: 326px;
  }

  p {
    width: 168px;
    font: 700 26px/31px "Raleway", sans-serif;
    text-align: left;
    word-break: break-all;
    word-wrap: break-word;
    margin-bottom: 40px;
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
`;
