import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      {/* <Route path="/Home" component={NavBar} /> */}
      <NavBar />
      <Footer />
    </React.Fragment>
  );
}

export default App;
