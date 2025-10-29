import api from "../api"


export const LoginUser=async({username,password})=>{
 try {
    const response=await api.post("api/auth/login",{username,password});
    if(response.data.success){
        return {success:true,
            accessToken:response.data.accessToken,};
    }
    else
        throw new Error(response.data.message);
    
 } catch (error) {
    return {success:false,message:error.message};
 }


}

export const LogoutUser=async()=>{
    try {
        const response=await api.post("api/auth/logout");
        if(response.data.success){
            return {success:true};
        }
        else
            throw new Error(response.data.message);
        
     } catch (error) {
        return {success:false,message:error.message};
     }
}

export const getUserProfile=async()=>{
    try {
        const response=await api.get("api/auth/profile");
        if(response.data.success){
            return {success:true,data:response.data.data};
        }
        else
            throw new Error(response.data.message);
        
    } catch (error) {
        return {success:false,message:error.message};
    }
}