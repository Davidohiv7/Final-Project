import React from "react";
import NavBar from "./Views/NavBar/NavBar.jsx";
import UserProfile from "./components/UserProfile/UserProfile";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import Home from "./Views/Home/Home.jsx";
import Cart from "./Views/Cart/Cart.jsx";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themeConfig";
import Footer from "./Views/Footer/Footer";
import { Route } from 'react-router-dom';
import Authentication from './Views/Authentication/Authentication';
import GoogleAuthSuccess from '../src/components/GoogleAuth/GoogleAuthSuccess/GoogleAuthSuccess';
import GoogleAuthError from '../src/components/GoogleAuth/GoogleAuthError/GoogleAuthError';
import PasswordReset from './Views/PasswordReset/PasswordReset';
import Contact from './Views/Contact/Contact'
import Devs from './components/Devs/Devs'


export default function App() {
  return (
    <ThemeProvider theme = {theme}>
  
      <Route
        path='/'
        render={() => <NavBar/>}
      />

      <Route
        exact path='/'
        render={() => <Home/>}   
      />
      
      <Route
        exact path='/user'
        render={() => <UserProfile/>}
      />

      <Route
        exact path='/admin'
        render={() => <AdminProfile/>}
      />

      <Route
        exact path='/cart'
        render={() => <Cart/>}
      />
        
      <Route
        exact path='/authentication'
        render={() => <Authentication/>}
      />

      <Route
        exact path='/passwordReset'
        render={() => <PasswordReset/>}
      />
      
      <Route
        exact path='/contact'
        render={() => <Contact/>}
      />
      
      <Route
        exact path='/devs'
        render={() => <Devs/>}
      />

      <Route
        path='/'
        render={() => <Footer/>}
      />

      <Route
        path='/authentication/google/success'
        render={() => <GoogleAuthSuccess/>}
      />

      <Route
        path='/authentication/google/error'
        render={() => <GoogleAuthError/>}
      />

    </ThemeProvider>
  )
}