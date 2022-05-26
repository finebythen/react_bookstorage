import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {

    const { logoutUser } = useContext(AuthContext);

    return(
        <div className="Header">
            <h2>Navbar</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="author">Authors</Link></li>
                    <li><Link to="book">Books</Link></li>
                    <li><p className="logout-p" onClick={ logoutUser }>Logout</p></li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;