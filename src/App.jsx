import { styled } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// This implements the styling for the h1 styled component using ES6 feature 'tagged template literals'
// Variable must start with uppercase because it is a React Component
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm)
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  margin: 20px;

  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

// Convention to call StyledApp
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* {Global Styles component needs to be added to component tree but cannot
      accept any children} */}
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Check in')}>Check In</Button>
        <Button onClick={() => alert('Check out')}>Check Out</Button>
        <Input type='number' placeholder='number of guests' />
      </StyledApp>
    </>
  );
}

export default App;
