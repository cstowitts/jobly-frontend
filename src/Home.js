import UserContext from "./userContext";
import {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

/** Home Component: renders Jobly homepage
 * 
 * Props: none
 * State: none
 * 
 * Routes -> Home
 */

//REVIEW: is there a cleaner way to call user context so we don't have to do user.
function Home() {
    const {user} =  useContext(UserContext);
    console.log(user);
    return (
        <section className="Home card col-md-8 mx-auto">
            <div className="card-body text-center">
                <h1 className="card-title fw-bold">Jobly</h1>
                <FontAwesomeIcon icon={faUsers} className="fs-1 my-2 jobly-logo"/>
                <p>All the jobs in one, convenient place.</p> 
                {user.isLoggedIn === true &&
                    <h2 className="alert alert-info">
                        Welcome Back, {user.user.firstName}!
                    </h2>
                }
            </div>
        </section>
    )
}

//TODO: remember with UserContext the currUser obj is stored in the context obj as the value of the key "user"

export default Home;