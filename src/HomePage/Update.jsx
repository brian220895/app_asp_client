import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPost, updatePost } from '../redux/postSlice';

function Update({post}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPost())
    }, [ dispatch])
    const [updateTitle, setUpdateTitle] = useState(post.title)
    const [UpdateImage, setUpdateImage] = useState(post.attachment)


    const updateRef = useRef(null);
    const upfileReferences = useRef(null);


    function updateconvertBase64(e) {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setUpdateImage(reader.result)
            // e.target.value = null;
        }

        // if(e.target.files[0].size===0){
        //     //    e.target.value = null;
        // }else{
            // reader.onload = () => {
            //     setUpdateImage(reader.result)
            //     // e.target.value = null;
            // }
        // }
        
    }



    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log(updateTitle)
        // console.log(UpdateImage)
        dispatch(updatePost({
            _id:post._id,
            title: updateTitle,
            attachment: UpdateImage

        }))

        dispatch(getPost())
        dispatch(getPost())
        
     


    }
    
   
        // if(isLoading){
        //     return (
        //         <>
        //         <h1>Loading...</h1>
        //         </>
        //     )
        // }

  

      


  return (
    <div>
                <form onSubmit={handleUpdate}>
                <label htmlFor="fname">Title:</label><br />
                <input type="text"  ref={updateRef} name="fname" defaultValue={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} /><br />
                <input accept='imag/*' type='file' ref={upfileReferences}
                    onChange={updateconvertBase64} />
                 <img src={UpdateImage ?? post.attachment}  width={100} alt='sas' />
                <button >Update</button>
               </form>


                  {/* <form onSubmit={handleUpdate}
>
                              
                                <h1>Update Information</h1>
                                <label htmlFor="fname">Update title:</label><br />
                                <input type="text" id="fname" name="fname" ref={updateRef} defaultValue={post.title} onChange={(e) => setUpdateTitle(post.title)} /><br />
                             

                         <input accept='imag/*' type='file' ref={upfileReferences} onChange={updateconvertBase64} />

                                <img src={post.attachment }  width={100} alt='sas' />
                                <button>Update now</button>

                            </form> */}
      
    </div>
  )
}

export default Update
