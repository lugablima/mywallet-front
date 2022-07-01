import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
// import calculateBalance from "../functions/calculateBalance";

function ExtractFooter({ extract }) {
  //   const balance = calculateBalance(extract);
  const balance = -100.0;
  //lembrar de trocar o ponto por vírgula no número

  return (
    <ContainerExtractFooter balance={balance}>
      <span>SALDO</span>
      <span>2849,96</span>
      {/* <span>{balance}</span> */}
    </ContainerExtractFooter>
  );
}

function Transaction({ transaction: { date, type, description, price } }) {
  return (
    <ContainerTransaction type={type}>
      <p>
        <span>{date}</span> {description} <span>{price}</span>
      </p>
    </ContainerTransaction>
  );
}

export default function ExtractsContainer() {
  // eslint-disable-next-line
  const [extract, setExtract] = useState(null);
  const { API, token } = useContext(UserContext);
  const transaction = { date: "30/11", type: "saída", description: "Almoço mãe", price: "39,90" };
  //lembrar de apagar transaction depois

  useEffect(() => {
    // eslint-disable-next-line
    async function getExtract() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const newExtract = await axios.get(`${API}/extract`, config);

        setExtract(newExtract);
      } catch (error) {
        alert(error.response);
      }
    }

    // getExtract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Transaction transaction={transaction} />
      <Transaction transaction={transaction} />
      <Transaction transaction={transaction} />
      <ExtractFooter />
      {/* {extract ? extract.map(extract => <Transaction transaction={extract} />) : <h5>Não há registros de entrada ou saída</h5>} */}
      {/* <ExtractFooter extract={extract} /> */}
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
