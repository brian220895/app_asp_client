import React, { useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updatePost } from '../redux/postSlice';
import FileBase64 from 'react-file-base64';

function UpdatePost({post}) {
    const dispatch = useDispatch()
    const [formUpdate] = Form.useForm();
    const [stateDataUpdate, setStateDataUpdate]=useState({
        _id:post._id,
        title:post.title,
        attachment:post.attachment
    })
    
    // console.log(stateDataUpdate)
    const handleOnChangeAvatarUpdate = async(FileBase64)=>{
        const file=FileBase64[0]
        const image_base64=await getFileBase64Update(file)
       
       setStateDataUpdate({
         ...stateDataUpdate,
         attachment:image_base64
  
     })
    
  }
  
  function getFileBase64Update(file) {
   const file_base64=file.base64
   return file_base64
  
  }






    const [openUpdate, setOpenUpdate] = useState(false)

    const showModalUpdate = () => {
      setOpenUpdate(true);
     
    };
  
    const hideModalUpdate = () => {
      setOpenUpdate(false);
      setStateDataUpdate({
        title:'',
        attachment:''
    })
    formUpdate.resetFields()
      

    };

    const onFinishUpdate = () => {
        console.log(stateDataUpdate);

        dispatch(updatePost(stateDataUpdate))
        message.success("Updated successfully",[2], hideModalUpdate())
      };
    
   
//  const handleOnChangeUpdate = (e)=>{
//     setStateDataUpdate({
//         ...stateDataUpdate,
//         [e.target.name]:e.target.value

//     })
//  }

  return (
    <>
        <button type="primary" onClick={showModalUpdate}>
        Update
      </button>
          <Modal
        title="Modal Update"
        open={openUpdate}
        onOk={hideModalUpdate}
        onCancel={hideModalUpdate}
        okText="Dong y"
        cancelText="Tu choi"
        footer={null}
      >
    <Form
     
     form={formUpdate}
      name="control-hooks"
      onFinish={onFinishUpdate}
      style={{ maxWidth: 600 }}
    >

      <Form.Item name="TitleUpdate" label="TitleUpdate" rules={[{ message:'Please type title' }]}>
        <Input htmlType="text" name="title" defaultValue={stateDataUpdate?.title}  onChange={(e)=>setStateDataUpdate({...stateDataUpdate,title:e.target.value})}/>
      </Form.Item>
      <Form.Item name="ImageUpdate" label="ImageUpdate">
        <FileBase64 type='file' multiple={true} onDone={(FileBase64)=>handleOnChangeAvatarUpdate(FileBase64)} />

        {stateDataUpdate?.attachment && (
           <img src={stateDataUpdate?.attachment} width={100} alt='sas' />
        )}
      </Form.Item>
     
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>

      </Form.Item>
    </Form>

    </Modal>
    </>
  )
}

export default UpdatePost
