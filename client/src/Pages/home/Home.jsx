import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import './home.css'
function Home() {
  const [post,setPost] = useState([]);
  const cat = useLocation();
  useEffect(()=>{
    const fetchPost= async()=>{
          try {
            const res = await axios.get(`/posts`);
            setPost(res.data);
      
          } catch (error) {
            console.log(error)
          }          
    };
    fetchPost();
  },[])
  console.log(post)

  // const t = [
  //   {
  //     id:1,
  //     title:"Amidst the ",
  //     decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
  //     img:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  //   {
  //     id:2,
  //     title:"Amidst the ",
  //     decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
  //     img:"	https://thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg"
  //   },
  //   {
  //     id:3,
  //     title:"Amidst the ",
  //     decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
  //     img:"	https://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-38.jpg"
  //   },
  //   {
  //     id:4,
  //     title:"Amidst the ",
  //     decs:"Amidst the moonlit night, a whispering breeze caressed the leaves, painting a symphony of shadows. Stars sparkled like diamonds strewn across an indigo canvas. The world slept, but the universe reveled in its secrets, weaving tales of mystery beneath the ethereal glow.",
  //     img:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   },
  // ]

  const getText = (html)=>{
    const doc =  new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  return (
    <div className='Home'>
      <div className="h-posts">
        {
          post.map((i)=>(
            <div className="post" key={i.id}>
              <div className="img-container">
                <img src={`../uploads/${i.img}`} alt="" className="h-img" />
            </div>
                <div className="h-content">
                <Link className='link' to={`/single/${i.id}`}><h1 className="h-p-title">{i.title}</h1></Link>
                <span className="h-decs">{getText(i.decs)}</span>
                <button className="button">Read More</button>

                </div>
                
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
