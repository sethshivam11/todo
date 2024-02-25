import React, { Dispatch, SetStateAction } from "react"

interface UserContext {
    user: UserInterface,
    isLoggedIn: boolean,
    loginModal: boolean,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setLoginModal: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<UserInterface>>,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    fetchUser: Function,
    updateDetails: Function,
    updatePassword: Function,
    updateAvatar: Function,
    userLogin: Function,
    userRegister: Function,
    removeAvatar: Function
}

export interface UserInterface {
    fullName: string,
    email: string,
    password: string,
    avatar: string,
}


export const UserContext = React.createContext<UserContext>({
    user: {
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    },
    loading: false,
    isLoggedIn: false,
    loginModal: false,
    setLoading: () => {},
    setLoginModal: () => { },
    setIsLoggedIn: () => { },
    fetchUser: () => { },
    updateDetails: () => { },
    updatePassword: () => { },
    updateAvatar: () => { },
    userLogin: () => { },
    userRegister: () => { },
    setUser: () => { },
    removeAvatar: () => { }
})