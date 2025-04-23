import React from "react";
import styled from "styled-components";

// styled-componentsの使い方
const Test = styled.div<{ textColor: string; bg: string }>`
  color: ${(props) => props.textColor};
  border: 1px solid black;
  padding: 20px;
  background: ${(props) => props.bg};
`;

const Button = ({ bg = "white", textColor = "black" }) => {
  return (
    <Test textColor={textColor} bg={bg}>
      Button
    </Test>
  );
};

export default Button;