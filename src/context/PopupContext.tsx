import { createContext, useState } from "react";

export const PopupContext = createContext();

const PopupContextProvider = (props) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <PopupContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
            {props.children}
        </PopupContext.Provider>
    )
}

export default PopupContextProvider;