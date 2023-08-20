import React, { useEffect, useState } from 'react'
import './menu.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
function Menu_c({cat}) {
  const [post,setPost] = useState([]);
  useEffect(()=>{
    const getpost =async()=>{
        try {
          const res = axios.get(`/posts/?cat=${cat}`)
          setPost((await res).data)
        } catch (err) {
          console.log(err)
        }
    }
    getpost();
  },[cat])
  const navigate = useNavigate()
  const handleClick=(e)=>{
    navigate(`/single/${e}`)
    window.location.reload()
  }
    // const t = [
    //     {
    //       id:1,
    //       title:"Amidst the ",
    //       decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
    //       img:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //       id:2,
    //       title:"Amidst the ",
    //       decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
    //       img:"	https://thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg"
    //     },
    //     {
    //         id:3,
    //         title:"Amidst the ",
    //         decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
    //         img:"`  `"
    //       },
    //       {
    //         id:4,
    //         title:"Amidst the ",
    //         decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
    //         img:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //       },
  
    //   ]
    
  return (
    <div className='menu'>
        <h1 className="m-otherpost">Other Posts You May like</h1>
        {
            post.map((i)=>(
                <div className="m-post" key={i.id}>
                    <img src={`../uploads/${i.img}`} alt="" className="m-img" />
                    <div className="m-p-info">
                    <h2 className="m-p-h2">{i.title}</h2>
                    <button onClick={()=>handleClick(i.id)} className='m-button'>Read More</button>

                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Menu_c