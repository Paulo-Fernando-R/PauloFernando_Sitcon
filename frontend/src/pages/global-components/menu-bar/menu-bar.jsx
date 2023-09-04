import { useNavigate } from "react-router-dom";
import "./styles/menu-bar-styles.css";

export default function MenuBar() {
    const navigate = useNavigate();
    return (
        <header id="menu-bar">
            <button onClick={() => navigate("/")}>Solicitações clínicas</button>
            <button onClick={() => navigate("/solicitation-list")}>Listagem de solicitações</button>
        </header>
    );
}
