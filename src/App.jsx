import DisplayFields from "./components/DisplayFields";
import FormFields from "./components/FormFields";
import Selector from "./components/Selector";

function App() {
  const dropdown=["Student", "SelfEmployee", "Business"];
  return (
    <>
    {/* <Selector dropdown={dropdown} /> */}
      <FormFields />
      <DisplayFields />
    </>
  );
}

export default App;
