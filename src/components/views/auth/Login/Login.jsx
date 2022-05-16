
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';

export const Login = () => {
    const navigate = useNavigate();
  

    const initialValues = {
        userName: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Write at least 4 characters").required('Username is required'),
        password: Yup.string().required("Enter a password"),
    })

    const onSubmit = values => {
        localStorage.setItem('logged', 'yes')
        navigate("/", { replace : true})
    }

    const formik = useFormik({ initialValues, onSubmit, validationSchema })

    return (
        <>
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label>Username:</label>
                        <input 
                            name="userName" 
                            type="text" 
                            value={formik.values.userName} 
                            onChange={formik.handleChange}   
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.userName && formik.touched.userName && <p>{formik.errors.userName}</p>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            name="password" 
                            type="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password  && <p>{formik.errors.password}</p>}
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <Link to="/register">Sign in</Link>
                    </div>
                </form>
            </div>
        </>
    )
}