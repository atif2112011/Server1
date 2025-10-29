import { useEffect } from "react";
import { getUserProfile } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Loader from "./Loader";

export const ProtectedPage=({children})=>{

    const {accessToken,setAccessToken,user,setUser,initializing,logoutHandler}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        
        const fetchUserProfile=async()=>{
            const response =await getUserProfile();
            if(response.success)
            {
                setUser(response.data);
                console.log("user",response.data);

            }
            else
            {
                console.log("Error fetching user profile",response.message);
                navigate("/login");
            }

        }
        if(!initializing)
        fetchUserProfile();
    },[initializing])

    return user?<div className="w-full h-full flex flex-col">
        <header className="w-full p-4 bg-gray-100 flex justify-end items-center">
            {user &&<button className="px-4 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={()=>logoutHandler()} >Logout</button>}
        </header>
    {children}
    </div>:<Loader/>;
}