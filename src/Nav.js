import { NavLink } from "react-router-dom"
import { useContext } from "react";
import UserContext from "./userContext";


/** Nav: Links to Home, Jobs, Companies
 *
 * no error handling, but there will be a redirect (bogus /jkjkkjk will take you back to /home)
 * present across pages/endpoints
 * 
 * Props: none
 * State: none
 * 
 * App -> Nav
 */

function Nav ({logout}){
    console.log("Nav");
    const {user} =  useContext(UserContext);
    console.log("Nav useContext user: ", user);

    return (
            <nav className="Nav container-fluid mb-5 navbar navbar-expand-lg navbar-dark bg-primary d-flex py-0 justify-content-between">
                <NavLink exact to="/" className="navbar-brand">
                    Jobly
                </NavLink>
        
                {user.isLoggedIn === false &&
                    <>
                        <NavLink exact to="/login" className="nav-link text-light">
                            Login
                        </NavLink>
                        <NavLink exact to="/register" className="text-light">
                            Register
                        </NavLink>
                    </>
                }
                
                {user.isLoggedIn === true &&
                    <>
                        <NavLink exact to="/companies" className="text-light">
                            Companies
                        </NavLink>
                        <NavLink exact to="/jobs" className="text-light">
                            Jobs
                        </NavLink>
                        <NavLink exact to="/profile" className="text-light">
                            Profile
                        </NavLink>
                        <NavLink exact to="/" onClick={logout} className="text-light">
                            Log out {user.user.username}
                        </NavLink>
                    </>
                }
            </nav>
    )
}

export default Nav;