import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });
export const getEmployees = async () => {
   try {
     const response = await axios.get(
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
     const response = await axios.post(
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
     const response = await axios.delete(
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