import { SignIn } from "./SignIn";
import { Link } from 'react-router-dom';


export default function Register() {
    return(
        <>
            <h2>Register</h2>
            <SignIn />
            <Link to="/login">Login</Link>
        </>
    )
};
