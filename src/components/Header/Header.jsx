import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
                <div className="wraper_img_header"><img src={require('../../media/GoScrumLogo.png')} alt="GoScrum"/></div>
                <div className="wraper_center_header">
                    <span>Tareas creadas: {tasks ? tasks.length : "0" } </span>
                <div className="wraper_right_header">
                    <Link to="/donate" className="link" >Donate</Link>
                    <div onClick={handleLogout}>X</div> 
                    <div>{localStorage.getItem("userName")}</div>
                </div> 
                </div>
            </header>
        </>
    )
};
