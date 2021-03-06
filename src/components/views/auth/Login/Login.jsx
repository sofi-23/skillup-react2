
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { swal } from '../../../../utils/Alert';

export const Login = () => {
    const navigate = useNavigate();
  
    const { REACT_APP_API_ENDPOINT } = process.env;

    const initialValues = {
        userName: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Write at least 4 characters").required('Username is required'),
        password: Yup.string().required("Enter a password"),
    })

    const onSubmit = () => {
        const { userName, password } = formik.values;
        fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
        })
        })
        .then(res => res.json())
        .then(data => { 
            if (data.status_code === 200) {
                localStorage.setItem("token", data?.result?.token)
                localStorage.setItem("userName", data?.result?.user.userName)
                navigate("/",{
                replace: true
                })
            }else {
                swal()
            }
            
            
        })
        }

    const formik = useFormik({ initialValues, onSubmit, validationSchema })

    return (
        <>
        <div className="pageContainer">
            <div className="container">
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div>
                        <h1 className="title">Login</h1>
                    </div>
                    <div>
                        <label className="label">Username:</label>
                        <input 
                            className="input"
                            name="userName" 
                            type="text" 
                            value={formik.values.userName} 
                            onChange={formik.handleChange}   
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.userName && formik.touched.userName && <p>{formik.errors.userName}</p>}
                    </div>
                    <div>
                        <label className="label">Password:</label>
                        <input 
                            className="input"
                            name="password" 
                            type="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password  && <p>{formik.errors.password}</p>}
                    </div>
                    <div>
                        <button className="button" type="submit">Login</button>
                    </div>
                    <div>
                        <Link to="/register" className="link">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}