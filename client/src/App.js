import React from "react";
import NavBar from "./Views/NavBar/NavBar.jsx";
import UserProfile from "./components/UserProfile/UserProfile";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import Home from "./Views/Home/Home.jsx";
import Cart from "./Views/Cart/Cart.jsx";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themeConfig";
import Footer from "./Views/Footer/Footer";
import { Route } from "react-router-dom";
import Authentication from "./Views/Authentication/Authentication";
import GoogleAuthSuccess from "../src/components/GoogleAuth/GoogleAuthSuccess/GoogleAuthSuccess";
import GoogleAuthError from "../src/components/GoogleAuth/GoogleAuthError/GoogleAuthError";
import Contact from "./Views/Contact/Contact";
import Devs from "./Views/Devs/Devs";
import Info from "./Views/Info/Info";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Route path="/" render={() => <NavBar />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/user" render={() => <UserProfile />} />
      <Route exact path="/admin" render={() => <AdminProfile />} />
      <Route exact path="/cart" render={() => <Cart />} />
      <Route exact path="/authentication" render={() => <Authentication />} />
      <Route path="/contact" render={() => <Contact />} />
      <Route path="/aboutus" render={() => <Devs />} />
      <Route path="/Info" render={() => <Info />} />
      <Route path="/" render={() => <Footer />} />
      <Route
        path="/authentication/google/success"
        render={() => <GoogleAuthSuccess />}
      />
      <Route
        path="/authentication/google/error"
        render={() => <GoogleAuthError />}
      />
    </ThemeProvider>
  );
}
