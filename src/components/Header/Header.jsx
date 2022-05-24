import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/", {replace: true});
    }

    const { tasks } = useSelector(state => state.tasksReducer);
    
    return (
        <>
            <header>
                <span>GoScrum</span>
                <div>Tareas creadas: {tasks ? tasks.length : "0" } </div>
                <div className="wraper_right_header">
                   
                    <div onClick={handleLogout}>X</div> 
                    <div>{localStorage.getItem("userName")}</div>
                </div>
            </header>
        </>
    )
};
