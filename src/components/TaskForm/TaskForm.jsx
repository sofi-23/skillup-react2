import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../store/actions/tasksActions';


export default function TaskForm() {
    const dispatch = useDispatch();
    
    const { tasks } = useSelector(state => state.tasksReducer);

    const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: '',
    }

    //USE REDUX!!
    const onSubmit = () => {
     dispatch(addTask(values))
    }
        
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3, "Write at least 3 characters").required('Title is required'),
        status: Yup.string().required("Choose a status"),
        importance: Yup.string().required("Choose an importance"),
        description: Yup.string().required('Description is required'),

    })

    const formik = useFormik({initialValues, onSubmit, validationSchema})

    const {errors, touched, values } = formik;
    
    return (
        <> 
        <section>
            <h2>Create task</h2>
            <form onSubmit={formik.handleSubmit}>
                
                <div>
                    <div>
                        <input 
                        className={errors.title && touched.title ? "error" : ""} 
                        name="title" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={values.title} />
                    </div>
                    {errors.title && touched.title   && <span>{errors.title}</span>}
                    <div>
                        <select  
                        className={errors.status && touched.status ? "error" : ""}  
                        name="status" 
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}
                        value={values.status}>
                            <option value="">Select a status</option>
                            <option value="NEW">New</option>
                            <option value="IN PROGRESS">In progress</option>
                            <option value="FINISHED">Finished</option>
                        </select>
                    </div>
                    {errors.status && touched.status  && <span>{errors.status}</span>}
                    <div>
                        <select  
                        className={errors.importance &&  touched.importance ? "error" : ""}  
                        name="importance" 
                        onChange={formik.handleChange}  
                        onBlur={formik.handleBlur}
                        value={values.importance}>
                            <option value="">Select an importance</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    {errors.importance  && touched.importance   && <span>{errors.importance}</span>}
                    <div>
                        <textarea 
                        name="description" 
                        placeholder="Add description" 
                        onChange={formik.handleChange} 
                        className={errors.description && touched.description ? "error" : ""}
                        onBlur={formik.handleBlur}
                        value={values.description}/>
                        
                    </div>
                    
                    {errors.description  && touched.description   && <span>{errors.description}</span>}
                </div>
                <button type="submit">Create</button>
            </form>
            <ToastContainer />
        </section>
        </>
        )
};
