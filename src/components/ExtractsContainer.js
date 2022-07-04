import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import calculateBalance from "../functions/calculateBalance";

function ExtractFooter({ extract }) {
  const balance = calculateBalance(extract);

  return (
    <ContainerExtractFooter balance={balance}>
      <span>SALDO</span>
      <span>{balance.toFixed(2).replace(".", ",")}</span>
    </ContainerExtractFooter>
  );
}

function Transaction({ transaction: { date, type, description, amount } }) {
  return (
    <ContainerTransaction type={type}>
      <p>
        <span>{date}</span> {description} <span>{amount.replace(".", ",")}</span>
      </p>
    </ContainerTransaction>
  );
}

export default function ExtractsContainer() {
  const [extract, setExtract] = useState([]);
  const {
    API,
    userInfos: { token },
  } = useContext(UserContext);

  useEffect(() => {
    async function getExtract() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(`${API}/extract`, config);

        setExtract(res.data);
      } catch (error) {
        if (error.response.status === 401) alert("Erro de autenticação, tente novamente mais tarde!");
        else if (error.response.status === 500) alert("Erro interno no servidor, tente novamente mais tarde!");
      }
    }

    getExtract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {extract.length !== 0 ? (
        extract.map((extract, index) => <Transaction key={index} transaction={extract} />)
      ) : (
        <h5>Não há registros de entrada ou saída</h5>
      )}
      {extract.length !== 0 ? <ExtractFooter extract={extract} /> : ""}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 326px;
  height: calc(100% - 180px);
  display: flex;
  flex-direction: column;
  padding: 23px 11px 10px 12px;
  margin-bottom: 13px;
  background: #fff;
  border-radius: 5px;
  overflow-y: auto;
  position: relative;

  h5 {
    width: 180px;
    text-align: center;
    font: 400 20px/23px "Raleway", sans-serif;
    color: #868686;
    word-break: break-all;
    word-wrap: break-word;
    margin: auto;
    /* justify-content: center; */
    /* align-self: center; */
  }
`;

const ContainerTransaction = styled.div`
  width: 100%;
  display: flex;
  font: 400 16px/19px "Raleway", sans-serif;
  color: #000;
  position: relative;
  margin-bottom: 19px;

  span:first-child {
    color: #c6c6c6;
    text-align: left;
    margin-right: 3px;
  }

  span:last-child {
    color: ${(prop) => (prop.type === "entrada" ? "#03AC00" : "#C70000")};
    position: absolute;
    right: 0;
  }
`;

const ContainerExtractFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  right: 11px;
  left: 12px;
  /* z-index: 1; */
  font: 17px/20px "Raleway", sans-serif;

  span:first-child {
    font-weight: 700;
    color: #000;
  }

  span:last-child {
    font-weight: 400;
    color: ${(prop) => (prop.balance >= 0 ? "#03ac00" : "#C70000")};
  }
`;
