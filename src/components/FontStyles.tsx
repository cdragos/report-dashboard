import { createGlobalStyle } from "styled-components";

import robotoRegularUrl from "assets/fonts/Roboto/Roboto-Regular.ttf";
import robotoBoldUrl from "assets/fonts/Roboto/Roboto-Bold.ttf";

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-size: normal;
    font-weight: 400;
    src: url(${robotoRegularUrl});
  }

  @font-face {
    font-family: 'Roboto';
    font-size: normal;
    font-weight: 700;
    src: url(${robotoBoldUrl});
  }
`;

export default FontStyles;
