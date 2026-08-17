import { apiRequest } from "./api";



// login function
export  const login =async (data)=>{
      return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
     

};

// signup function
export const signup= async(data)=>{
   return apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data)
    });

    };


// logout function
export const logout = async()=>{
    return apiRequest("/auth/logout", {
        method: "POST",
        body: JSON.stringify({}),

    });

};

//login with otp
export const loginotp = async(data)=>{
    return apiRequest("/auth/loginotp", {
        method: "POST",
        body: JSON.stringify(data)
    });

};

//verify login otp


export const verifyloginotp = async(data)=>{
      return apiRequest("/auth/verifyloginotp", {
        method: "POST",
        body: JSON.stringify(data)
    });



}

//signup with otp
export const signupotp = async(data)=>{
    return apiRequest("/auth/signupotp", {
        method: "POST",
        body: JSON.stringify(data)
    });

};

    //verify signup otp

export const verifysignupotp = async(data)=>{
    return apiRequest("/auth/verifysignupotp", {
        method: "POST",
        body: JSON.stringify(data)
    });

};

       //forgot password otp

export const sendforgotpasswordotp = async(data)=>{
    return apiRequest("/auth/sendforgotpasswordotp", {
        method: "POST",
        body: JSON.stringify(data)
    });

};

      //verify forgot password otp

export const verifyforgotpasswordotp = async(data)=>{
    return apiRequest("/auth/verifyforgotpasswordotp", {
        method: "POST",
        body: JSON.stringify(data)
    });

};
      

export const resetpassword = async(data)=>{
    return apiRequest("/auth/resetpassword", {
        method: "POST",
        body: JSON.stringify(data)
    });
 
};
