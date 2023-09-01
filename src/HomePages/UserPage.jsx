import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd';
// import FileBase64 from 'react-file-base64';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {registerUser,getUsers,loginUser,logoutUser,getDetailUser, loginUsertest} from '../redux/apiRequest'
// import Cookies from 'universal-cookie';
// import jwt_decoded from 'jwt-decode';
function UserPage() {
  // const cookies = new Cookies();
 
  //   const codedToken=jwt_decoded(cookies.get('token'))
    //  console.log('tokkkkkkkkkkkkkkkkkkkk',codedToken.id)

  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [stateUser, setStateUser]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
   
    const [open, setOpen] = useState(false)

    const showModal = () => {
      setOpen(true);
   
    };
  
    const hideModal = () => {
      setOpen(false);
      setStateUser({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    form.resetFields()
      

    };

    const onFinishRegister = async() => {
        console.log('stateUser',stateUser);

        await registerUser(stateUser,dispatch,navigate)
          
          message.success('Created successfully', [4], hideModal())
        

      };

      const handleOnChange = (e)=>{
        setStateUser({
            ...stateUser,
            [e.target.name]:e.target.value
    
        })
     }




     const [stateUserLogin, setStateUserLogin]=useState({
      username:'',
      password:''
  })
 
  const [openLogin, setOpenLogin] = useState(false)

  const showModalLogin = () => {
    setOpenLogin(true);
 
  };

  const hideModalLogin = () => {
    setOpenLogin(false);
    setStateUserLogin({
      username:'',
      password:''
  })
  form.resetFields()
    

  };


  const onFinishLogin = async() => {
      console.log('stateUserLogin',stateUserLogin);

      await loginUsertest(dispatch,navigate)

      // await loginUser(stateUserLogin,dispatch,navigate)
        message.success('Login successfully', [4], hideModalLogin())
  

    };

    const handleOnChangeLogin = (e)=>{
      setStateUserLogin({
          ...stateUserLogin,
          [e.target.name]:e.target.value
   
      })
   }


   
//     const handleOnChangeAvatar = async(FileBase64)=>{
//       const file=FileBase64[0]
//       const image_base64=await getFileBase64(file)
//      setStateUser({
//        ...stateUser,
//        attachment:image_base64

//    })
  
// }

// function getFileBase64(file) {
//  const file_base64=file.base64
//  return file_base64

// }





//  const handleDeletePost= async(idPost)=>{
//   // console.log(idPost)
//   const completedDeletePost = await dispatch(deletePost(idPost))
//   if(completedDeletePost){
    
//     message.success('Deleted successfully', [4])
    
//   }
//  }
const handleLogout=()=>{
  logoutUser(dispatch,navigate)
}
        
const { users,detailUser} = useSelector((state) => state.listUser)    
useEffect(() => {
  getUsers(dispatch,navigate)
  getDetailUser(dispatch,navigate)
  
}, [dispatch,navigate])


useEffect(() => {
  getDetailUser(dispatch,navigate)
  
}, [dispatch,navigate])

 
  return (
    <div>



       {detailUser?  (<div>
        
        <h1>Dang nhap: {detailUser.username} </h1>
        <Button type="primary" onClick={()=>handleLogout()}>
        Log out
      </Button>


        
       </div>):(<div>
      

      <Button type="primary" onClick={showModal}>
        Register
      </Button>

      <Button type="primary" onClick={showModalLogin}>
        Log in
      </Button>

       </div>)}


    
     

      <Modal
        title="Register an account to log in Homepage "
        open={open}
        // onOk={hideModal}
        onCancel={hideModal}
        okText="Dong y"
        cancelText="Tu choi"
        footer={null}
      >

          
<Form
     
     form={form}
      name="control-hooks"
      onFinish={onFinishRegister}
      style={{ maxWidth: 600 }}
    >

      <Form.Item name="Username" label="Username" rules={[{ required: true, message:'Please type username' }]}>
        <Input htmlType="text" name="username" value={stateUser?.username} onChange={handleOnChange}/>
      </Form.Item>
      <Form.Item name="Email" label="Email" rules={[{ required: true, message:'Please type email' }]}>
        <Input htmlType="text" name="email" value={stateUser?.email} onChange={handleOnChange}/>
      </Form.Item>
      <Form.Item name="Password" label="Password" rules={[{ required: true, message:'Please type title' }]}>
        <Input htmlType="text" name="password" value={stateUser?.password} onChange={handleOnChange}/>
      </Form.Item>
      <Form.Item name="ConfirmPassword" label="ConfirmPassword" rules={[{ required: true, message:'Please type title' }]}>
        <Input htmlType="text" name="confirmPassword" value={stateUser?.confirmPassword} onChange={handleOnChange}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>

      </Form.Item>
    </Form>





      </Modal>


      
      <Modal
        title="Log in Homepage "
        open={openLogin}
        // onOk={hideModal}
        onCancel={hideModalLogin}
        okText="Dong y"
        cancelText="Tu choi"
        footer={null}
      >

          
<Form
     
     form={form}
      name="control-hooks"
      onFinish={onFinishLogin}
      style={{ maxWidth: 600 }}
    >

      <Form.Item name="Username" label="Username" rules={[{ required: true, message:'Please type username' }]}>
        <Input htmlType="text" name="username" value={stateUserLogin?.username} onChange={handleOnChangeLogin}/>
      </Form.Item>
      <Form.Item name="Password" label="Password" rules={[{ required: true, message:'Please type title' }]}>
        <Input htmlType="text" name="password" value={stateUserLogin?.password} onChange={handleOnChangeLogin}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
        Login
        </Button>

      </Form.Item>
    </Form>





      </Modal>
     

     <ul>
                <h1>List Users</h1>
                {users?.map((user_v2) => (

                    <li key={user_v2._id}>

                        <div >User:{user_v2.username}</div>

                        {/* <img src={post.attachment} width={100} alt='sas' />  */}

                        {/* <button onClick={() => [setIdPost(post._id), setEditForm(!editForm)]}>Update</button> */}
                        {/* <button onClick={() => dispatch(deletePost(post._id))}>Delete</button> */}


                         {/* <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                        <UpdatePost post={post}/>  */}

          

             

                      
                            
                      
 
                    </li>
                ))}

            </ul>




    </div>
  )
}

export default UserPage
