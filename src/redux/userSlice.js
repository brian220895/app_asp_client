import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const userSlice = createSlice({
  name: 'userReducer',
  initialState:{
  
      users:null,
      detailUser:null,
      isFetching:false,
      success:false,
      error:false,
  
     

  },
  reducers: {
    registerUserStart:(state)=>{
      state.isFetching=true
      state.success=false
      state.error=false
  },
  registerUserSuccess:(state,action)=>{
      state.users.push(action.payload)
      state.detailuser=action.payload
      state.isFetching=false
      state.success=true
      state.error=false
  },
  registerUserFailed:(state)=>{
    state.isFetching=false
    state.success=false
    state.error=true
  },
  getUsersStart:(state)=>{
    state.isFetching=true
    state.success=false
    state.error=false
},
 getUsersSuccess:(state,action)=>{
    state.users=action.payload
    state.isFetching=false
    state.success=true
    state.error=false
},
getUsersFailed:(state)=>{
  state.isFetching=false
  state.success=false
  state.error=true
},
loginUserStart:(state)=>{
  state.isFetching=true
  state.success=false
  state.error=false
},
loginUserSuccess:(state,action)=>{
  state.isFetching=false
  state.success=true
  console.log('gggggg',action.payload.accessToken)
  cookies.set('accessToken', action.payload.accessToken, { path: '/' });
  // console.log('gggggg',cookies.get('accessToken')); // Pacman
},
loginUserFailed:(state)=>{
state.isFetching=false
state.success=false
state.error=true
},
logoutUserStart:(state)=>{
  state.isFetching=false
  state.success=false
  state.error=false
},
logoutUserSuccess:(state)=>{
  state.users=null
  state.detailUser=null
  state.isFetching=false
  state.success=false
  state.error=false

  // console.log(action)
},
logoutUserFailed:(state)=>{
  state.isFetching=false
  state.success=false
  state.error=true
},

getDetailUserStart:(state)=>{
  state.isFetching=true
  state.success=false
  state.error=false
},
getDetailUserSuccess:(state,action)=>{
  state.detailUser=action.payload
  state.isFetching=false
  state.success=true
  state.error=false
  // console.log('fffffffffffffffffffffffff',action.payload)
},
getDetailUserFailed:(state)=>{
state.isFetching=false
state.success=false
state.error=true
},


     

  }
})

// Action creators are generated for each case reducer function
export const { 
  registerUserStart,registerUserSuccess,registerUserFailed,
  getUsersStart,getUsersSuccess,getUsersFailed,
  loginUserStart,loginUserSuccess,loginUserFailed,
  logoutUserStart,logoutUserSuccess,logoutUserFailed,
  getDetailUserStart,getDetailUserSuccess,getDetailUserFailed

} = userSlice.actions

export default userSlice.reducer