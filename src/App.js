import React, {useEffect, useContext, useReducer, createContext} from 'react';
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/Screens/Home'
import Signin from './components/Screens/Signin'
import Signup from './components/Screens/Signup'
import Profile from './components/Screens/Profile'
import CreatePost from './components/Screens/CreatePost'
import UserProfile from './components/Screens/UserProfile'
import ForgetPassword from './components/Screens/ForgetPassword'
import ResetPassword from './components/Screens/ResetPassword'
import Activation from './components/Screens/Activation'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if(user) {
      dispatch({type: "USER", payload: user})
    }else {
      if(!history.location.pathname.startsWith("/reset") && !history.location.pathname.startsWith("/activate"))
        history.push("/signin")
    }
  },[])

  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/reset">
        <ForgetPassword />
      </Route>
      <Route path="/reset/:token">
        <ResetPassword />
      </Route>
      <Route path="/activate/:token">
        <Activation />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer( reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
