import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, deletePost, getPost } from '../redux/postSlice';
import { useRef } from 'react';
import Update from './Update';


function HomePage() {

    const dispatch = useDispatch()

    const { posts} = useSelector((state) => state.dataPost)
    useEffect(() => {
        dispatch(getPost())
    }, [dispatch])

    const [title, setTitle] = useState()
    const [image, setImage] = useState()

    const titleRef = useRef(null);
    const fileReferences = useRef(null);

  

    function convertBase64(e) {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
    
            setImage(reader.result)
        }
    }


    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createPost({
            title: title,
            attachment: image

        }))
        titleRef.current.value = '';
        fileReferences.current.value = '';

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
         

            <form onSubmit={handleCreate}>
                <label htmlFor="fname">Title:</label><br />
                <input type="text" id="fname" ref={titleRef} name="fname" defaultValue={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <input accept='imag/*' type='file' ref={fileReferences}
                    onChange={convertBase64} />
                <button>Create</button>
            </form>

            <ul>
                <h1>List Items</h1>
                {posts?.map((post) => (

                    <li key={post._id}>

                        <div >Title:{post.title}</div>

                        <img src={post.attachment} width={100} alt='sas' />

                        {/* <button onClick={() => [setIdPost(post._id), setEditForm(!editForm)]}>Update</button> */}
                        <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>

                        {/* <Link  to={`update/${post._id}`}>Update</Link> */}



                        <div>
                            <Update post={post}/>
                        </div>

                    </li>
                ))}

            </ul>

        </div>
    )
}

export default HomePage
