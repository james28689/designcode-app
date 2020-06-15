import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <TitleBar>
          <Avatar source={require("./assets/avatar.jpg")} />
          <Title>Welcome back, </Title>
          <Name>Meng</Name>
        </TitleBar>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background: #f0f3f5;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
