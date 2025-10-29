import axios from "axios";
import api from "../api";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });
export const getEmployees = async () => {
   try {
     const response = await api.get(
        "api/employees"
    );
    if(response.data.success){
        return {
            success: true,
            data: response.data.data
        };
    }
    else
        throw new Error(response.data.message);
    
   } catch (error) {
        return {
            success: false,
            message: error.message
        };
   }
};


export const addEmployee = async (data) => {
   try {
     const response = await api.post(
        "api/employees",
        data
    );
    
    if(response.data.success){
        return {
            success: true,
            data: response.data.data
        };
    }
    else
        throw new Error(response.data.message);
    
   } catch (error) {
        return {
            success: false,
            message: error.message
        };
   }
};

export const deleteEmployee = async (id) => {
   try {
     const response = await api.delete(
        `api/employees/${id}`
    );
    
    if(response.data.success){
        return {
            success: true,
        };
    }
    else
        throw new Error(response.data.message);
    
   } catch (error) {
        return {
            success: false,
            message: error.message
        };
   }
};