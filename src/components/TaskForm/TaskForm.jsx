import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

export default function TaskForm() {

    const initialValues = {
        title: '',
        status: '',
        priority: '',
        description: '',
    }

    const onSubmit = ()  => {
        alert()
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(6, "Write at least 6 characters").required('Title is required'),
        status: Yup.string().required("Choose a status"),
        priority: Yup.string().required("Choose a priority")

    })

    const formik = useFormik({initialValues, onSubmit, validationSchema})

    const {errors, touched } = formik;
    
    return (
        <> 
        <section>
            <h2>Create task</h2>
            <form onSubmit={formik.handleSubmit}>
                
                <div>
                    <div>
                        <input className={errors.title ? "error" : ""} name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    {errors.title && touched.title   && <span>{errors.title}</span>}
                    <div>
                        <select  className={errors.title ? "error" : ""}  name="status" onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                            <option value="">Select a status</option>
                            <option value="new">New</option>
                            <option value="inProcess">In process</option>
                            <option value="finished">Finished</option>
                        </select>
                    </div>
                    {errors.status && touched.status  && <span>{errors.status}</span>}
                    <div>
                        <select  className={errors.title ? "error" : ""}  name="priority" onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                            <option value="">Select a priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    {errors.priority  && touched.priority   && <span>{errors.priority}</span>}
                    <div>
                        <textarea name="description" placeholder="Add description" onChange={formik.handleChange} />
                    </div>
                </div>
                <button type="submit">Create</button>
            </form>
        </section>
        </>
        )
};
