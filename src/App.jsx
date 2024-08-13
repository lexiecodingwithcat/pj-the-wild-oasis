import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        {/* using "as" prop so that the styled component will know which HTML element need to be rendered exactly */}
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Heading as="h3">Form</Heading>
        <Button>Check in</Button>
      </div>
    </>
  );
}

export default App;
