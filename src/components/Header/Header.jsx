import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", {replace: true});
    }
    
    return (
        <>
            <header>
                <span>GoScrum</span>
                <div onClick={handleLogout}>X</div>
            </header>
        </>
    )
};
