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
        <div className="Nav container mb-5">
            <nav className="navbar fixed-top navbar-dark bg-primary row d-flex justify-content-around">
                <NavLink exact to="/" className="navbar-brand">
                    Jobly
                </NavLink>
            
                {user.isLoggedIn === false &&
                    <>
                        <NavLink exact to="/login" className="nav-link">
                            Login
                        </NavLink>
                        <NavLink exact to="/register">
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
        </div>
    )
}

export default Nav;