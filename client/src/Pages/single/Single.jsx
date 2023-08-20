import React, { useContext, useEffect, useState } from 'react'
import './single.css'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu_c from '../../Components/menu/Menu_c'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
function Single() {
  const [post,setPost] = useState();
  const loc = useLocation();
  const {currentUser} = useContext(AuthContext) 
  const postId = loc.pathname.split("/")[2] 
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchPost= async()=>{
          try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
      
          } catch (error) {
            console.log(error)
          }
          
    };
    fetchPost();
  },[])

   console.log(post)
   const handleDelete=async()=>{
      try {
        const res = await axios.delete(`/posts/${postId}`);
        alert(res)
        navigate('/')
      } catch (error) {
        console.log(error)
      }
   }

   const getText = (html)=>{
    const doc =  new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      {post&&
        <>
                  <div className="s-content">
          <img src={`../uploads/${post.img}`} alt="" className="s-img" />
          <div className="s-user">
            <div className="s-user-u">
            <img src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="s-u-img" />
            <div className="s-u-info">
              <span className="s-u-name">{post.username}</span>
              <p className="s-ago">2 days ago</p>
            </div>
            { currentUser.username === post.username &&
                        <div className="edit">
                        <Link className='link s-l-edit' state={post} to={`/write?edit=2`}> <AiOutlineEdit className='s-edit'/></Link>
                        <button onClick={handleDelete} className='s-l-edit b' ><AiOutlineDelete/></button >
                      </div>


            }
            </div>
            <div className="s-blog-content">
            <h1 className='s-b-c-h1'>{getText(post.title)}</h1>
          <p className="s-b-c-p">{getText(post.decs)}</p>
            </div>
          </div>
        </div>
        <div className="s-menu"><Menu_c cat={post.catogory}/> </div>
        </>
      }

    </div>
  )
}

export default Single