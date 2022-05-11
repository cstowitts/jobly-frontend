import {useState, useContext} from "react";
import UserContext from "./userContext";

function Profile({update, errors}) {
    
    const {user} =  useContext(UserContext);
    const initialFormData = {
        username:user.user.username,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email
    };

    const [formData, setFormData] = useState(initialFormData);

    function handleChange (evt){
        const {name, value} = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }
   

    function handleSubmit (evt){
        evt.preventDefault();
        // const copy = formData;
        // delete copy.username;
        //og thought was to prevent changing the username if a user
        //changed the disabled attr on the frontend--deleted the onClick
        //for the username input instead duh
        //the thought behind making a copy of formData was we were concerned with mutating our formData state (not actually a thing)
        update(formData);
        setFormData(formData);
    }

    return (
        <div className="Profile card container p-2">
            <form onSubmit={handleSubmit} className="card-body">
                <h1 className="text-center mb-5 alert-secondary py-3">
                    {user.user.firstName}'s Profile
                </h1>

                <div className="form-group mb-2 row">
                    <label htmlFor="username" className="col-form-label col-sm-2">Username</label>
                   
                    <div className="col-sm-6">
                        <input disabled type="text" name="username" id="username" value={user.user.username} className="form-control"/>
                    </div>
                </div>

                <div className="form-group mb-2 row">
                    <label htmlFor="firstName" className="col-form-label col-sm-2">First Name</label>

                    <div className="col-sm-6">
                        <input type="firstName" name="firstName" id="firstName" onChange={handleChange} value={formData.firstName} className="form-control"/>
                    </div>
                </div>
                    
                <div className="form-group mb-2 row">
                    <label htmlFor="lastName" className="col-form-label col-sm-2">Last Name</label>

                    <div className="col-sm-6">
                        <input type="lastName" name="lastName" id="lastName" onChange={handleChange} value={formData.lastName} className="form-control"/>
                    </div>
                </div>

                <div className="form-group mb-2 row">
                    <label htmlFor="email" className="col-form-label col-sm-2">Email</label>

                    <div className="col-sm-6">
                        <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="form-control"/>
                    </div>
                </div>

                <button type="submit" className="text-center mt-5 btn btn-primary">Update Profile</button>
            </form>

            { errors.length > 0 &&
                <div className="Profile-errors">
                    { errors.map((e, idx) => <p key={idx}>{e}</p>) }
                </div>
            }

            { errors.length === 0 &&
                <div className="Profile-errors" />
            }
        </div>
    )
}

export default Profile;