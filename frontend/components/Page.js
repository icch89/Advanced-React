import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import { Button } from "antd";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

const theme = {
  red: "#FF0000",
  black: "#393939",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  background: white;
  color: {props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  html {
    box-sizing: border-box; // vom kurs
  //  font-size: 15px; // vom kurs
    @import '~antd/dist/antd.css';
    @import url(//db.onlinewebfonts.com/c/f09066ce74ee31a4052f39d9cd00577b?family=Camphor);
  }

  body{
    padding: 0; //vom Kurs
    margin: 0; //vom Kurs
    line-height: 2;


    background:#fff;
    min-height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    font-size:80.5%;
    font-family:Camphor,Open Sans,Segoe UI,sans-serif;
    font-weight:400;
    font-style:normal;
    -webkit-text-size-adjust:100%;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-rendering:optimizeLegibility;
    -webkit-font-feature-settings:"pnum";
    font-feature-settings:"pnum";
    font-variant-numeric:proportional-nums;
    font-size: 80.5%;
  }
  *, *:before, *after {
    box-sizing:inherit;
  }
  html[lang=ja] body{
    font-family:Camphor,Meiryo,Hiragino Sans,sans-serif
}
button:hover {
  color: #7795f8;
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
a:hover {
  color: #7795f8;
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
a {
  text-decoration: none;
  color: ${theme.black};
}
`;

export default class extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
