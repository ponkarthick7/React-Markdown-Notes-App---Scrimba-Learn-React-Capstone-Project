import {useState, useEffect} from "react"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import PasswordCheck from "../Components/PasswordCheck";

export default function UsePasswordDisplayToggle(pw){
    const [icon, setIcon] = useState(faEyeSlash);
    const [displayPw, setDisplayPw] = useState(false);
    const [hasLowerCase, setHasLowercase] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasLength, setHasLength] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const toggleDisplayPw = () => setDisplayPw(prevDisplayStatus => !prevDisplayStatus);

    useEffect(() => {
        setIcon(displayPw ? faEye : faEyeSlash);
    }, [displayPw])

    useEffect(() => {
        setHasLowercase(/[a-z]/.test(pw));
        setHasUpperCase(/[A-Z]/.test(pw));
        setHasSpecialChar(/[\W_]/.test(pw));
        setHasNumber(/[0-9]/.test(pw));
        setHasLength(/.{8,}/.test(pw));
        setValidPassword(hasLowerCase && hasUpperCase && hasSpecialChar && hasNumber && hasLength);
    }, [pw, hasLowerCase, hasUpperCase, hasSpecialChar, hasNumber, hasLength])

    const displayVals = {
        "One lowercase character": hasLowerCase,
        "One uppercase character": hasUpperCase,
        "One special character": hasSpecialChar,
        "One number": hasNumber,
        "8 characters minimum": hasLength
    }

    const displayConditions = () => {
        return Object.keys(displayVals).map(text => {
            return (
                <PasswordCheck key = {text} value = {displayVals[text]} text = {text}/>
            )
        })
    }

    return {displayPw, icon, toggleDisplayPw, displayVals, displayConditions, validPassword};
}