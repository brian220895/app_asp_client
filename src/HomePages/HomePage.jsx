import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPost,createPost } from '../redux/postSlice';
import UpdatePost from './UpdatePost';
function HomePage() {
  

  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const { posts} = useSelector((state) => state.listPost)
  useEffect(() => {
      dispatch(getPost())
  }, [dispatch])


    const [statePost, setStatePost]=useState({
        title:'',
        attachment:''
    })

   
    const handleOnChangeAvatar = async(FileBase64)=>{
      const file=FileBase64[0]
      const image_base64=await getFileBase64(file)
     setStatePost({
       ...statePost,
       attachment:image_base64

   })
  
}

function getFileBase64(file) {
 const file_base64=file.base64
 return file_base64

}


    const [open, setOpen] = useState(false)

    const showModal = () => {
      setOpen(true);
   
    };
  
    const hideModal = () => {
      setOpen(false);
      setStatePost({
        title:'',
        attachment:''
    })
    form.resetFields()
      

    };

    const onFinish = async() => {
        // console.log(stateData);

        // dispatch(createPost(stateData))

        const completedCreatePost = await dispatch(createPost(statePost))
        if(completedCreatePost){
          
          message.success('Created successfully', [4], hideModal())
          
        }

      };

      const handleOnChange = (e)=>{
        setStatePost({
            ...statePost,
            [e.target.name]:e.target.value
    
        })
     }



 const handleDeletePost= async(idPost)=>{
  // console.log(idPost)
  const completedDeletePost = await dispatch(deletePost(idPost))
  if(completedDeletePost){
    
    message.success('Deleted successfully', [4])
    
  }
 }
        
        


 
  return (
    <div>
      
      <Button type="primary" onClick={showModal}>
        Create
      </Button>
      <Modal
        title="Modal"
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
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >

      <Form.Item name="Title" label="Title" rules={[{ required: true, message:'Please type title' }]}>
        <Input htmlType="text" name="title" value={statePost?.title} onChange={handleOnChange}/>
      </Form.Item>
      <Form.Item name="Image" label="Image">
        <FileBase64 type='file' multiple={true} onDone={(FileBase64)=>handleOnChangeAvatar(FileBase64)} />
        {statePost?.attachment && (
           <img src={statePost?.attachment} width={100} alt='sas' />
        )}
       
      </Form.Item>
     
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
    </Form>





      </Modal>

     <ul>
                <h1>List Items</h1>
                {posts?.map((post) => (

                    <li key={post._id}>

                        <div >Title:{post.title}</div>

                        <img src={post.attachment} width={100} alt='sas' /> 

                        {/* <button onClick={() => [setIdPost(post._id), setEditForm(!editForm)]}>Update</button> */}
                        {/* <button onClick={() => dispatch(deletePost(post._id))}>Delete</button> */}


                         <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                        <UpdatePost post={post}/> 

          

             

                      
                            
                      

                    </li>
                ))}

            </ul>




    </div>
  )
}

export default HomePage
