
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    }

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    const onSubmit = values => {
        localStorage.setItem('logged', 'yes')
        navigate("/", { replace : true})
    }

    const formik = useFormik({initialValues, onSubmit, validate})

    return (
        <>
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label>Email:</label>
                        <input 
                            name="email" 
                            type="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange}   
                        />
                        {formik.errors.email && <p>{formik.errors.email}</p>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            name="password" 
                            type="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                        />
                        {formik.errors.password && <p>{formik.errors.password}</p>}
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}