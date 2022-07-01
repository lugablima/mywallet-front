import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ExtractsContainer from "./ExtractsContainer";

function OptionsBox({ text, icon }) {
  return (
    <ContainerBox>
      {icon === "add" ? <IoAddCircleOutline /> : <IoIosRemoveCircleOutline />}
      <h6>Nova {text}</h6>
    </ContainerBox>
  );
}

export default function ExtractPage() {
  const { userInfos } = useContext(UserContext);
  const firstName = userInfos.name.split(" ")[0];
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <h2>Olá, {firstName}</h2>
        <IoExitOutline size={32} style={{ color: "#fff", cursor: "pointer" }} onClick={() => navigate("/")} />
      </Header>
      <ExtractsContainer />
      <Footer>
        <OptionsBox text="entrada" icon="add" />
        <OptionsBox text="saída" icon="remove" />
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;

  h2 {
    font: 700 26px/31px "Raleway", sans-serif;
    color: #fff;
  }
`;

const ContainerBox = styled.div`
  width: 47.55%;
  max-width: 155px;
  height: 114px;
  background: #a328d6;
  border-radius: 5px;
  padding: 10.56px 0 9px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  color: #fff;
  font-size: 26px;

  h6 {
    width: 64px;
    font: 700 17px/20px "Raleway", sans-serif;
    text-align: left;
  }
`;

const Footer = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  column-gap: 15px;
`;
