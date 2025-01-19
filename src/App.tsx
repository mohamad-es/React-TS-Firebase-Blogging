import { Fragment } from "react/jsx-runtime";
import Router from "./router";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router />
    </Fragment>
  );
}

export default App;
