// This implements the styling for the h1 styled component using ES6 feature 'tagged template literals'

import { css, styled } from 'styled-components';

// // using 'css' here allows for syntaxt highlighting and js execution
// const test = css`
//   text-align: center;
//   ${10 > 5 && 'background-color: yellow'};
// `;

// Variable must start with uppercase because it is a React Component
const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  line-height: 1.4rem;
`;

export default Heading;
