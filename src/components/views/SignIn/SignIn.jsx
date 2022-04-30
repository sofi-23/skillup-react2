
import { useFormik } from 'formik';

export const SignIn = () => {
    
    const initialValues = {
        user: '',
        password: '',
        email: ''
    }


    const onSubmit = values => {
        localStorage.setItem('logged', 'yes')
    }

    const formik = useFormik({initialValues, onSubmit})

    return (
        <>
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <h1>Sign in</h1>
                    <div>
                        <label>Username:</label>
                        <input 
                            name="username" 
                            type="text" 
                            value={formik.values.user} 
                            onChange={formik.handleChange}   
                        />
                        {formik.errors.user && <p>{formik.errors.user}</p>}
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
                        <input type="hidden" name="teamID" value="1" />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select 
                            name="role" 
                            type="select" 
                            value={formik.values.role} 
                            onChange={formik.handleChange}   
                        >
                            <option value="teamMember">Team Member</option>
                            <option value="teamLeader">Team Leader</option>
                        </select>
                        {formik.errors.role && <p>{formik.errors.role}</p>}
                    </div>
                    <div>
                        <label>Continent:</label>
                        <select 
                            name="continent" 
                            type="select" 
                            value={formik.values.continent} 
                            onChange={formik.handleChange}   
                        >
                            <option value="america">America</option>
                            <option value="europe">Europe</option>
                            <option value="other">Other</option>
                            {formik.errors.continent && <p>{formik.errors.continent}</p>}
                        </select>
                    </div>
                    <div>
                        <label>Region:</label>
                        <select 
                            name="region" 
                            type="select" 
                            value={formik.values.region} 
                            onChange={formik.handleChange}   
                        >
                            <option value="latam">LATAM</option>
                            <option value="brazil">Brazil</option>
                            <option value="northAmerica">North America</option>
                            <option value="other">Other</option>
                            {formik.errors.region && <p>{formik.errors.region}</p>}
                        </select>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}