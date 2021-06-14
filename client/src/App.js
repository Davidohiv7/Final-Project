
import React from 'react';
import NavBar from './Views/NavBar/NavBar'
import UserProfile from './components/UserProfile/UserProfile'
import AdminProfile from './components/AdminProfile/AdminProfile'
import Home from './Views/Home/Home.jsx'
import Cart from './Views/Cart/Cart.jsx'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig';
import Footer from "./Views/Footer/Footer";
import { Route } from 'react-router-dom';
import Authentication from './Views/Authentication/Authentication'


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
        path='/'
        render={() => <Footer/>}
      />

<<<<<<< HEAD

=======
>>>>>>> f9756a75e636b14fdc1b01769386c1a3b06a0f7c
    </ThemeProvider>
  )
}

