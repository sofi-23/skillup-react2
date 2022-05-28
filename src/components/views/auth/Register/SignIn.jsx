
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//VARIABLES DE ENTORNO:
const { REACT_APP_API_ENDPOINT } =  process.env ;

export const SignIn = () => {
    const navigate = useNavigate()

    const initialValues = {
        userName: '',
        password: '',
        email: '', 
        teamID: '',
        role: '',
        continent: '',
        region: '',
        switch: false,
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().min(4, "Write at least 4 characters").required('Username is required'),
        password: Yup.string().required("Enter a password"),
        email: Yup.string().email("Enter a valid email").required("Enter an email"),
        teamID: Yup.string().required("Enter a team id"), // make it only required when switch is true.
        role: Yup.string().required("Enter a role"),
        continent: Yup.string().required("Enter a continent"),
        region: Yup.string().required("Enter a region"),
    })



    const [data, setData] =  useState()

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
        .then(res => res.json())
        .then(res => setData(res.result))
        .catch(err => console.log(err.message))
    }, []);

    const onSubmit = () => {
        console.log("onSubmit executed")
        const teamID = formik.values.teamID === '' ? uuidv4() : formik.values.teamID
        console.log(formik.values.region)
        fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    userName: formik.values.userName,
                    password: formik.values.password,
                    email: formik.values.email,
                    teamID: teamID,
                    role: formik.values.role,
                    continent: formik.values.continent,
                    region: formik.values.region,
                },
        })
        })
        .then(res => res.json())
        .then(data => navigate("/registered/" + data?.result?.user?.teamID,
            {
            replace: true
            }))
        }
  
    const formik = useFormik({ initialValues, onSubmit, validationSchema })


    const handleChangeContinent = (value) => {
        formik.setFieldValue('continent', value)
        if (value !==  'America') {
            formik.setFieldValue('region', 'Otro')
        }
    }

    return (
        <>
            <div className="container">
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div>
                        <h1 className="title">Sign in</h1>
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
                        {formik.errors.password && formik.touched.password &&  <p>{formik.errors.password}</p>}
                    </div>
                    <div>
                        <label className="label">Email:</label>
                        <input 
                            className="input"
                            name="email" 
                            type="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}   
                        />
                        {formik.errors.email &&  formik.touched.email && <p>{formik.errors.email}</p>}
                    </div>
                    <div>
                    <FormControlLabel 
                        control={
                            <Switch
                                value={formik.values.switch}
                                onChange={()=>formik.setFieldValue('switch', !formik.values.switch)}
                                name="switch"
                                color="secondary"
                            />
                        }
                        label="I'm already on a team"
                    /> 
                    </div>
                    {formik.values.switch && 
                        <div>
                            <label className="label">Team id:</label>
                            <input className="input" type="text" name="teamID" value={formik.values.teamID} onChange={formik.handleChange}  onBlur={formik.handleBlur}    />
                        </div>
                        }
                   
                    <div>
                        <label className="label">Role:</label>
                        <select 
                            className="input"
                            name="role" 
                            type="select" 
                            value={formik.values.role} 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}    
                        >
                            <option value="">Select a role</option>
                            {data?.Rol?.map(role => { 
                                return (
                                    <option key={role} value={role}> {role} </option>
                                    )
                            })}
                        </select>
                        {formik.errors.role &&  formik.touched.role && <p>{formik.errors.role}</p>}
                    </div>
                    <div>
                        <label className="label">Continent:</label>
                        <select 
                            className="input"
                            name="continent" 
                            type="select" 
                            value={formik.values.continent} 
                            onChange={event => handleChangeContinent(event.currentTarget.value)}   
                            onBlur={formik.handleBlur} 
                        >   
                            <option value="">Select continent</option>
                            {data?.continente?.map(continent => { 
                                return (
                                    <option key={continent} value={continent}> {continent} </option>
                                    )
                            })}
                            
                        </select>
                        {formik.errors.continent &&  formik.touched.continent && <p>{formik.errors.continent}</p>}
                    </div>
                    <div>
                       
                            {formik.values.continent === "America" && 
                            <>
                                <label className="label">Region:</label>
                                    <select 
                                        className="input"
                                        name="region" 
                                        type="select" 
                                        value={formik.values.region} 
                                        onChange={formik.handleChange}  
                                        onBlur={formik.handleBlur}  
                                    >  
                                    <option value="">Select a region</option>
                                    {data?.region?.map(region => { 
                                    return (
                                        <option key={region} value={region}> {region} </option>
                                        )
                                    })}
                                
                                </select> 
                                {formik.errors.region && formik.touched.region &&  <p>{formik.errors.region}</p>}
                            </>
                            }
                    </div>
                    <div>
                        <button type="submit" >Sign in</button>
                    </div>
                    <div>
                        <Link to="/login" className="label">Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}