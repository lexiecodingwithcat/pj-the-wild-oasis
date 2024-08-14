import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row"
function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        {/* using "as" prop so that the styled component will know which HTML element need to be rendered exactly */}
        <Row type="horizontal">
          <Heading as="h1">The Wild Oasis</Heading>
          <Heading as="h2">Check in and out</Heading>
        </Row>
        <Row>
          <Heading as="h3">Form</Heading>
          <Button variation="primary" size="medium">Check in</Button>
          <Button  variation="secondary" size="large">Check out</Button>
        </Row>
      </div>
    </>
  );
}

export default App;
