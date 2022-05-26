import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div className="Header">
            <h1>Navbar</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="author">Authors</Link></li>
                    <li><Link to="book">Books</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;