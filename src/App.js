import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import Routes from "./Routes";
import UserContext from "./userContext";
import JoblyApi from "./api";

/** App component
 * Renders <Nav /> and <Routes />
 * 
 * Props: 
 *  none
 * State: 
 *  [currUser, setCurrUser]
 *  [token, setToken]
 * 
 * App -> {Nav, Routes}
 */
function App() {
  console.log("App");

  function checkForUser(){
    return (JSON.parse(localStorage.getItem("user")) || null);
  }

  const initialUserState = {isLoggedIn: false};

  const [currUser, setCurrUser] = useState(initialUserState);

  //check for a logged in user
  useEffect(function(){
    const user = checkForUser();
    if (user){
      setCurrUser(user.user);
    } else {
      setCurrUser({isLoggedIn: false})
    }
  }, []);

  async function login(formData){
    //take the formData and pass into JoblyApi.loginUser, (returns username)
    const username = await JoblyApi.loginUser(formData);
    //await the response, get username and token
    console.log("username = ", username);

    const user = await JoblyApi.getUser(username);
    console.log("user = ", user);
    //make second req, calling getUser (using username) to get the user data obj

    setCurrUser(currUser => {return{...user, isLoggedIn:true}});
    //update currUser state

    localStorage.setItem("user", user);
    //save token and user data in localStorage
  }

  async function register(formData){
    const username = await JoblyApi.registerUser(formData);
    const user = await JoblyApi.getUser(username);

    setCurrUser(currUser => {return{...user, isLoggedIn:true}});
  
    localStorage.setItem("user", user);
  }

  async function update(formData){
    const username = formData.username;
    delete formData.username;
    const user = await JoblyApi.updateUser(formData, username);
    setCurrUser(currUser => {return{...user, isLoggedIn: true}});
  }

  function logoutUser(){
    JoblyApi.deleteUserToken();
    setCurrUser(initialUserState);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{user: currUser}}>
            <Nav />
            <Routes login={login} register={register} update={update} logout={logoutUser}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
