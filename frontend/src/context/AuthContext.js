import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null);
    let [loading, setLoading] = useState(null);

    const navigate = useNavigate();

    const baseURL = 'http://127.0.0.1:8000';

    let loginUser = async (e) => {
        e.preventDefault();

        let response = await fetch(`${baseURL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": e.target.email.value,
                "password": e.target.password.value
            })
        })

        let data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            alert('Wrong mailaddress or password! Try again or contact your administration!');
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    let contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        };
        setLoading(false);
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            { loading ? null: children }
        </AuthContext.Provider>
    )
};