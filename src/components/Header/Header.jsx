import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("logged");
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
