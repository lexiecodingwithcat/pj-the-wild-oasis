import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import  Button  from "./ui/Button";
//this will return a styled component
//and the css we wrote only limit to the current file scope
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>Hello world</H1>
        <Button>Check in</Button>
      </div>
    </>
  );
}

export default App;
