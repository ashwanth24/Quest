import axios from 'axios';
import {createContext, useEffect, useState} from 'react'
import { json } from 'react-router-dom';

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const[ currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem("user"))|| null);

    const login = async(inputs)=>{
        const res = await axios.post("/auth/login",inputs);
        setCurrentUser(res.data)
    }
    const logout = async(inputs)=>{
        try {
            const res = await axios.post("/auth/logout");
            setCurrentUser(null)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify (currentUser));
    },[currentUser]);
    

    return(
        <AuthContext.Provider value={{login,logout,currentUser}}> {children}</AuthContext.Provider>
    );

}
