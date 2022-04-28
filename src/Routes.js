import { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom"; 

import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import UserContext from "./userContext";
import Profile from "./Profile";
import Logout from "./Logout";



/** Routes Component
 * 
 * parses URL params to match endpoints and output page components
 * 
 * Props: none
 * State: none
 * 
 * App -> Routes
 */

function Routes ({login, register, update, logout}) {
    console.log("Routes");
    const {user} =  useContext(UserContext);
    console.log("Routes useContext user: ", user);

    return (
        <div className="routes">
            { user.isLoggedIn === false &&
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/login">
                        <Login login={login} />
                    </Route>

                    <Route exact path="/register">
                        <Register register={register} />
                    </Route>

                    <Route exact path="/logout">
                        <Redirect to="/" />
                    </Route>
                    <Redirect to="/login" />
                </Switch>
            }


            { user.isLoggedIn === true &&
                <Switch>
                    <Route exact path="/jobs">
                        <JobList />
                    </Route>
                    <Route exact path="/companies">
                        <CompanyList />
                    </Route>
                    <Route exact path="/companies/:handle">
                        <CompanyDetail />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                         <Profile update={update} />
                    </Route>
                    <Route exact path="/logout">
                        <Logout logout={logout} />
                    </Route>
                    <Redirect to="/companies" />
                </Switch>
            }
        </div>
    );
}


export default Routes;