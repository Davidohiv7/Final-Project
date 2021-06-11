
import React from 'react';
import NavBar from './Views/NavBar/NavBar'
import UserProfile from './components/UserProfile/UserProfile'
import Home from './Views/Home/Home.jsx'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig';
import Footer from "./Views/Footer/Footer";
import { Route } from 'react-router-dom';


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
        path='/'
        render={() => <Footer/>}
      />


    </ThemeProvider>
  )
}

