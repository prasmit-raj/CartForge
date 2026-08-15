const API_URL = "http://localhost:5000/api";


export  const login =async (data)=>{
     const response= await fetch(`${API_URL}/auth/login`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data),
     })
     
const result= await response.json();
if(!response.ok){
    throw new Error(result.message || "Failed to login");
}
return result;
}

export const signup= async(data)=>{
    const response =await fetch( `${API_URL}/auth/signup`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data),
        })

        const result= await response.json();
        if(!response.ok){
            throw new Error(result.message || "Failed to signup");
        }
        return result;
    }



export const logout = async()=>{
    const response =await fetch (`${API_URL}/auth/logout`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({})
    })
    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to logout");
    }
    return result;
}

export const loginotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/loginotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to send login OTP");
    }
    return result;
}

export const verifyloginotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/verifyloginotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to verify login OTP");
    }
    return result;
}

export const signupotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/signupotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to send signup OTP");
    }
    return result;
}

export const verifysignupotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/verifysignupotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to verify signup OTP");
    }
    return result;
}

export const sendforgotpasswordotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/sendforgotpasswordotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to send forgot password OTP");
    }
    return result;
}

export const verifyforgotpasswordotp = async(data)=>{
    const response =await fetch(`${API_URL}/auth/verifyforgotpasswordotp`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to verify forgot password OTP");
    }
    return result;
}

export const resetpassword = async(data)=>{
    const response =await fetch(`${API_URL}/auth/resetpassword`,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    const result=await response.json();
    if(!response.ok){
        throw new Error(result.message || "Failed to reset password");
    }
    return result;
}