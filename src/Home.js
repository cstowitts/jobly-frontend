import UserContext from "./userContext";
import {useContext} from "react";
import {Card, CardBody, CardTitle} from "reactstrap";

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
        <section className="Home col-md-8 mx-auto">
            <Card>
                <CardBody className="text-center">
                    <CardTitle>
                        <h1 className="fw-bold">Jobly</h1>
                        <p>All the jobs in one, convenient place.</p> 
                        {user.isLoggedIn === true &&
                            <h2 className="alert alert-info">
                                Welcome Back, {user.user.firstName}!
                            </h2>
                        }
                    </CardTitle>
                </CardBody>
            </Card>
        </section>
    )
}

//TODO: remember with UserContext the currUser obj is stored in the context obj as the value of the key "user"

export default Home;