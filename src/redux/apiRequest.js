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

const URL='https://brian-server.cyclic.app'







const refreshToken = async()=>{
  try {

    if(cookies.get('token')){
      const refreshToken = cookies.get('refreshToken')

      const res = await axios.post(`${URL}/users/refresh`,{headers:{refreshToken:`${refreshToken}`}},{
        withCredentials: true
      })

      console.log('retgggggg',res.data.accessToken)
 
      cookies.set('token', res.data.accessToken, {  
          // httpOnly: true,
           sameSite: 'strict'});
      
      console.log('retggggggsdasd',res.data.refreshToken)
      cookies.set('refreshToken', res.data.refreshToken, {  
      // httpOnly: true,
        sameSite: 'strict'});

      return res.data.accessToken
    }
    
    // const res=await axios.post(`${URL}/users/refresh`,{
    //   withCredentials: true
    // })
   

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
      const res= await axios.post(`${URL}/users`,user,{
        withCredentials: true
      })
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

    // const res= await axios.get(`${URL}/users`,{
    //   withCredentials: true
    // })
    const res= await axios.get(`${URL}/users`,{headers:{token:`${accessToken}`}},{
      withCredentials: true
    })
   
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
  
      const res = await axios.get(`${URL}/users/getdetail/${userId}`,{headers:{token:`${accessToken}`}},{
        withCredentials: true
      })
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

    const res= await axiosJWT.post(`${URL}/users/login`,user,{
      withCredentials: true
    })
    // console.log('res',res.data.data)
    
    dispatch(loginUserSuccess(res.data))
    getUsers(dispatch,navigate)
    getDetailUser(dispatch,navigate)
    // navigate("/home")
    console.log('login API1', res)
  } catch (error) {
    dispatch(loginUserFailed())
  }
}


// export const loginUsertest =async(dispatch,navigate)=>{
//   dispatch(getDetailUserStart())
//   try {


    
//      await axios.post(`https://brian-server.cyclic.app/setcookie`,{
//         withCredentials: true
//       })
  
//     //  dispatch(getDetailUserSuccess(res.data))

      
//     // navigate("/home")
//   } catch (error) {
//     dispatch(getDetailUserFailed())
//   }
// }




export const logoutUser =async(dispatch,navigate)=>{
  dispatch(logoutUserStart())
  try {

    await axios.post(`${URL}/users/logout`,{
      withCredentials: true
    })
    // console.log('res',res.data.data)
    
    dispatch(logoutUserSuccess())

    // navigate("/home")
  } catch (error) {
    dispatch(logoutUserFailed())
  }
}
 