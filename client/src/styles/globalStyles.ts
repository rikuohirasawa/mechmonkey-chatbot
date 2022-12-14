import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    :root {
        --mm-orange: #FB5012;
        --mm-black: #171717;
        --mm-white: #f7f7f7;
        --mm-light-blue: #ECF4FB;
    }

    body {
        font-family: 'Montserrat', sans-serif;
        color: var(--mm-white);
    }
`;