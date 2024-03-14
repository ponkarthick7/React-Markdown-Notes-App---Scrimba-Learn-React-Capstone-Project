const ELEMENT_GAP = 15;
const ELEMENT_DISPLAY = "flex";

export const FormStyles = {
    maxWidth: "600px",
    width: "100%",
    border: "1px solid #000",
    borderRadius: "7px",
    padding: "30px", 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}

export const ActionStyles = {
    display: ELEMENT_DISPLAY,
    gap: ELEMENT_GAP,
    alignItems: "center",
    marginTop: ELEMENT_GAP
}

export const AuthenticationButtonContainerStyles = {
    display: ELEMENT_DISPLAY,
    gap: ELEMENT_GAP,
    justifyContent: "center",
    marginTop: "100px"
}

export const InputGroupStyles = {
    display: ELEMENT_DISPLAY,
    flexDirection: "column",
    gap: "10px"
}