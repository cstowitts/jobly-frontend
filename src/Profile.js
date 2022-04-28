import {useState, useContext} from "react";
import UserContext from "./userContext";

function Profile({currUser, update}) {
    
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
        const copy = formData;
        delete copy.username;
        update(copy);
        setFormData(initialFormData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input disabled type="text" name="username" id="username" onChange={handleChange} value={user.user.username} />
            <label htmlFor="firstName">First Name</label>
            <input type="firstName" name="firstName" id="firstName" onChange={handleChange} value={formData.firstName} />
            <label htmlFor="lastName">Last Name</label>
            <input type="lastName" name="lastName" id="lastName" onChange={handleChange} value={formData.lastName} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} />
            <button type="submit">Update Profile</button>
        </form>
    )
}

export default Profile;