import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {darkTheme} from "./theme";

const GlobalStyle = createGlobalStyle`

   @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');
   
   /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */

   html, body, div, span, applet, object, iframe,
   h1, h2, h3, h4, h5, h6, p, blockquote, pre,
   a, abbr, acronym, address, big, cite, code,
   del, dfn, em, img, ins, kbd, q, s, samp,
   small, strike, strong, sub, sup, tt, var,
   b, u, i, center,
   dl, dt, dd, ol, ul, li,
   fieldset, form, label, legend,
   table, caption, tbody, tfoot, thead, tr, th, td,
   article, aside, canvas, details, embed,
   figure, figcaption, footer, header, hgroup,
   menu, nav, output, ruby, section, summary,
   time, mark, audio, video {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     vertical-align: baseline;
   }

   /* HTML5 display-role reset for older browsers */
   article, aside, details, figcaption, figure,
   footer, header, hgroup, menu, nav, section {
     display: block;
   }

   * {
     box-sizing: border-box;
   }
   
   body {
     line-height: 1; 
     font-family: 'Source Sans Pro', sans-serif;
     background-color: ${props => props.theme.bgColor};
     color: black;
   }
   
   a {
     text-decoration: none;
     color:inherit;
   }

   ol, ul {
     list-style: none;
   }

   blockquote, q {
     quotes: none;
   }

   blockquote:before, blockquote:after,
   q:before, q:after {
     content: '';
     content: none;
   }

   table {
     border-collapse: collapse;
     border-spacing: 0;
   }
 `;


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </RecoilRoot>
);

