import React from "react";
import styled from "styled-components";

class Avatar extends React.Component {
  state = {
    photo: "https://share.getcloudapp.com/P8ueeZ5q",
  };

  render() {
    return <Image source={require("../assets/avatar-default.jpg")} />;
  }
}

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
