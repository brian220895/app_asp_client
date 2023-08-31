import axios from "axios"
import { 
  registerUserFailed, registerUserStart, registerUserSuccess,
  getUsersStart,getUsersSuccess,getUsersFailed,
  loginUserStart,loginUserSuccess,loginUserFailed,
  logoutUserStart,logoutUserSuccess,logoutUserFailed,
  getDetailUserStart,getDetailUserSuccess,getDetailUserFailed


 } from "./userSlice"
import Cookies from 'universal-cookie';
import jwt_decoded from 'jwt-decode';
const cookies = new Cookies();
let axiosJWT=axios.create()
// const URL='http://localhost:3001'

const refreshToken = async()=>{
  try {
    
    const res=await axios.post(`/users/refresh`,{
      withCredentials: true
    })
    return res.data.accessToken

  } catch (error) {
     console.log(error)
  }
  
}

axiosJWT.interceptors.request.use(async(config)=>{
   let newToken = await refreshToken()
   config.headers['token']=newToken
   
   return config
  }, 
  (err)=>Promise.reject(err)
  )




export const registerUser=async(user,dispatch,navigate)=>{
    dispatch(registerUserStart())
    try {

        // console.log('registerUser',user)
      const res= await axios.post(`/users`,user)
      // console.log('res',res.data.data)
      dispatch(registerUserSuccess(res.data.data))
      // navigate("/home")
    } catch (error) {
      dispatch(registerUserFailed())
    }
 }


 export const getUsers =async(dispatch,navigate)=>{
  const accessToken = cookies.get('token')
  
  // console.log('accessToken22',accessToken)
  dispatch(getUsersStart())
  try {
    const res= await axiosJWT.get(`/users`,{headers:{token:`${accessToken}`}}
    )
   
    dispatch(getUsersSuccess(res.data.data))
  } catch (error) {
    dispatch(getUsersFailed())
  }
}


export const getDetailUser =async(dispatch,navigate)=>{

  
 
  dispatch(getDetailUserStart())
  try {


    if(cookies.get('token')){
      const accessToken = cookies.get('token')
      const codedToken=jwt_decoded(accessToken)
      const userId=codedToken.id
  
      const res = await axiosJWT.get(`/users/getdetail/${userId}`,{headers:{token:`${accessToken}`}})
    //  console.log('asdasdasdasdasdddasdas',res.data)
     dispatch(getDetailUserSuccess(res.data))
    }
      
    // navigate("/home")
  } catch (error) {
    dispatch(getDetailUserFailed())
  }
}

export const loginUser =async(user,dispatch,navigate)=>{
  dispatch(loginUserStart())
  try {

    const res= await axios.post(`/users/login`,user)
    // console.log('res',res.data.data)
    
    dispatch(loginUserSuccess(res.data))
    getUsers(dispatch,navigate)
    getDetailUser(dispatch,navigate)
    // navigate("/home")
  } catch (error) {
    dispatch(loginUserFailed())
  }
}


export const logoutUser =async(dispatch,navigate)=>{
  dispatch(logoutUserStart())
  try {

    await axios.post(`/users/logout`)
    // console.log('res',res.data.data)
    
    dispatch(logoutUserSuccess())

    // navigate("/home")
  } catch (error) {
    dispatch(logoutUserFailed())
  }
}
 