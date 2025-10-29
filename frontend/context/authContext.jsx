import { useState } from "react";
import { LoginUser, LogoutUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";
import { createContext } from "react";





export const AuthContext=createContext();

export const AuthProvider=({children})=>{

const [accessToken,setAccessToken]=useState(null);
const [user,setUser]=useState(null);
const [initializing,setInitializing]=useState(true);
const navigate=useNavigate();

const loginHandler=async({username,password})=>{
    try {
        if(!username || !password)
            throw new Error("Please enter username and password");
        const response=await LoginUser({username,password});
        if(response.success)
        {
            console.log("login success");
            console.log(response);
            setAccessToken(response.accessToken);
            localStorage.setItem("accessToken",response.accessToken);
            navigate("/")
        }
        else
            throw new Error(response.message);
        
    } catch (error) {
        alert(error.message);
    }
}

const logoutHandler=async()=>{
    try {
        const response=await LogoutUser();
        if(response.success)
        {
            setAccessToken(null);
            localStorage.removeItem("accessToken");
            navigate("/login");
        }
        else
            throw new Error(response.message);
        
    } catch (error) {
        alert(error.message);
    }
}


useEffect(()=>{
const token=localStorage.getItem("accessToken");
if(token)
{
    setAccessToken(token);
    api.defaults.headers.common["Authorization"]=`Bearer ${token}`;
}
setInitializing(false);
    
},[accessToken])

return <AuthContext.Provider value={{accessToken,setAccessToken,user,setUser,loginHandler,logoutHandler,initializing}}>{children}</AuthContext.Provider>

}

