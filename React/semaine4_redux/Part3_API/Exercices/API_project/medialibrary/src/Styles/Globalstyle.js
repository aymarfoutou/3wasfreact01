import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {box-sizing: border-box}
  body {
    margin: 20px;
    background: #OOO;
    font-family: "Century Gothic", helvetica, arial, sans-serif;
    font-size: 1.2em;
  }
  div, nav, section, article, aside, header, footer {
    margin: 0.1rem;
    padding : 0.5rem;
  }
  header {
    background: hotpink;
  }
  h1 {
    margin: 0 0 1em;
    color: #345;
    text-align: center;
    font-family: georgia, "trebuchet ms", arial, serif;
  }
  footer {
    background: #CCC;
  }
`;

export default GlobalStyle;