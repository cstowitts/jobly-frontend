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

function Nav (){
    console.log("Nav");
    const {user} =  useContext(UserContext);
    console.log("Nav useContext user: ", user);

    return (
        <nav className="Nav">
            <NavLink exact to="/">
                    Jobly
            </NavLink>
           
            {user.isLoggedIn === false &&
                <>
                    <NavLink exact to="/login">
                        Login
                    </NavLink>
                    <NavLink exact to="/register">
                        Register
                    </NavLink>
                </>
            }
            
            {user.isLoggedIn === true &&
                <>
                    <NavLink exact to="/companies">
                        Companies
                    </NavLink>
                    <NavLink exact to="/jobs">
                        Jobs
                    </NavLink>
                    <NavLink exact to="/profile">
                        Profile
                    </NavLink>
                    <NavLink exact to="/logout">
                        Log out {user.user.username}
                    </NavLink>
                </>
            }
        </nav>

    )
}

export default Nav;