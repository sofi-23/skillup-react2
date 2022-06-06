import { SignIn } from "./SignIn";
import { Link } from 'react-router-dom';


export default function Register() {
    return(
        <>
            <SignIn />
            <Link to="/login">Login</Link>
        </>
    )
};
