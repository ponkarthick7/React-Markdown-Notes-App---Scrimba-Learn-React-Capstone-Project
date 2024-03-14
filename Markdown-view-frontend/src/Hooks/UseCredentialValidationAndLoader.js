import {useState} from "react"
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import RingLoader from "react-spinners/RingLoader";

export default function UseCredentialValidationAndLoader(){
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [displayForm, setDisplayForm] = useState(true);
    const navigate = useNavigate();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const defaultLoaderStyling = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999
    }

    const defaultLoaderProps = {
        size: 50,
        color: "#36d7b7",
        loading: isLoading,
        speedMultiplier: 0.5,
    };

    const triggerLoadingAnimation = () => {
        setIsLoading(true);
        setDisplayForm(false);
    }

    const determineRoute = () => {
        if (window.location.pathname === "/signup"){
            triggerLoadingAnimation();
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }
        else if (window.location.pathname === "/login"){
            triggerLoadingAnimation();
            setTimeout(() => {
                navigate("/notes-app");
            }, 2000)
        }
    }

    const renderLoadingAnimation = () => {
        switch (window.location.pathname) {
            case "/signup" : return <div style = {defaultLoaderStyling}><SyncLoader {...defaultLoaderProps}/></div>;
            case "/login" : return <div style = {defaultLoaderStyling}><RingLoader {...defaultLoaderProps}/></div>; 
        }
    }

    const validateEmail = (email) => {
        if (!(emailRegex.test(email))){
            setError("This email is invalid. Please enter a valid one and try again");
            return;
        }
    }
    return {error, setError, validateEmail, determineRoute, renderLoadingAnimation, displayForm};
}