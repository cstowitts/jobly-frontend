import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import Routes from "./Routes";
import UserContext from "./userContext";
import JoblyApi from "./api";

/** App component
 * Renders <Nav /> and <Routes />
 * 
 * Props: none
 * State: [currUser, setCurrUser]
 * 
 * App -> {Nav, Routes}
 */
function App() {
  console.log("App");

  const initialUserState = {isLoggedIn: false};

  const [currUser, setCurrUser] = useState(initialUserState);

  async function login(formData){
    //take the formData and pass into JoblyApi.loginUser, (returns username)
    const username = await JoblyApi.loginUser(formData);
    console.log("username = ", username);
    //await the response, get username
    const user = await JoblyApi.getUser(username);
    console.log("user = ", user);

    //make second req, calling getUser (using username) to get the user data obj
    setCurrUser(currUser => {return{...currUser, ...user, isLoggedIn:true}});
    //update currUser state
  }

  async function register(formData){
    const username = await JoblyApi.registerUser(formData);
    const user = await JoblyApi.getUser(username);
    setCurrUser(currUser => {return{...currUser, ...user, isLoggedIn:true}});
  }

  async function update(formData){
    const user = await JoblyApi.updateUser(formData);
    setCurrUser(currUser => {return{...currUser, ...user, isLoggedIn: true}});
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
