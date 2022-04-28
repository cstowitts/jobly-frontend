import {useState} from "react";

function Login({login}) {
    console.log("in the login component! login = ", login);

    const initialFormData = {username:"", password:""};
    const [formData, setFormData] = useState(initialFormData);


    //REVIEW: THIS CONTROLLED COMPONENT PATTERN MAN!!

    function handleChange (evt){
        const {name, value} = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    function handleSubmit (evt){
       evt.preventDefault();
       login(formData);
       setFormData(initialFormData);
    }
    //remember to prevent default!! and reset form values

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={handleChange} value={formData.username} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;