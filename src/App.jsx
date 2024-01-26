import DisplayFields from "./components/DisplayFields";
import FormFields from "./components/FormFields";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <>
      <FormFields />
      <DisplayFields />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
