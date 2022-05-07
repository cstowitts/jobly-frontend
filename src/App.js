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
 *  [errors, setErrors]
 * 
 * App -> {Nav, Routes}
 */
function App() {
  console.log("App");

  function checkForUser(){
    const user = localStorage.getItem("user");
    console.log("in checkForUser, user: ", user);
    if(user !== null){
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  const initialUserState = {isLoggedIn: false};

  const [currUser, setCurrUser] = useState(initialUserState);
  const [errors, setErrors] = useState([]);

  //check for a logged in user
  useEffect(function(){
    const user = checkForUser();
    if (user){
      setCurrUser({...user, isLoggedIn: true});
    } else {
      setCurrUser({isLoggedIn: false})
    }
  }, []);

  async function login(formData){
    try {
      //take the formData and pass into JoblyApi.loginUser, (returns username)
      const username = await JoblyApi.loginUser(formData);
      //await the response, get username and token
      console.log("username = ", username);

      const user = await JoblyApi.getUser(username);
      console.log("user = ", user);
      //make second req, calling getUser (using username) to get the user data obj

      setCurrUser(currUser => {return{...user, isLoggedIn:true}});
      //update currUser state

      localStorage.setItem("user", JSON.stringify(user));
      //save token and user data in localStorage
      //has to be passed in as a string
    } catch (err) {
      //err is an array of error msgs thrown by the api 
      setErrors(err);
    }
   
  }

  async function register(formData){
    try {
      const username = await JoblyApi.registerUser(formData);
      const user = await JoblyApi.getUser(username);
  
      setCurrUser(currUser => {return{...user, isLoggedIn:true}});
    
      localStorage.setItem("user", JSON.stringify(user));
      //has to be passed in as a string
    } catch (err) {
      setErrors(err);
    }
    
  }

  async function update(formData){
    const username = formData.username;
    delete formData.username;
    const user = await JoblyApi.updateUser(formData, username);
    setCurrUser(currUser => {return{...user, isLoggedIn: true}});
  }

  function logoutUser(){
    JoblyApi.deleteUserToken();
    localStorage.clear();
    setCurrUser(initialUserState);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{user: currUser}}>
            <Nav logout={logoutUser}/>
            <Routes login={login} errors={errors} register={register} update={update}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
