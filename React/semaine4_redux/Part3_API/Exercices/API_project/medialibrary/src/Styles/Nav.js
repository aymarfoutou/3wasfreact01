import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ul {
        margin: 0;
        padding: 1rem;
        list-style:none;
        li{
            display : inline-block;
            margin: 0 0.5rem; padding : 0 0.4rem;
            text-align : center;
            span { font-size : 0.9rem ;}
        }   
    }
    a {
        font-size: 2rem;
        text-transform: uppercase;
        display:block;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.2rem;
        color: #0D0C1D;
        text-decoration: none;
        transition: color 0.3s linear;
        &:hover {
          color: #343078;
        }
      }
    @media(max-width: 600px) {
        flex-flow: column wrap;
        ul { li { margin: 0 0.25rem; padding : 0 0.2rem;  } a {  font-size: 1.2rem;} }
       
    }
`;

export default Nav;