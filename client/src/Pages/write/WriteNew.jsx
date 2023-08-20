import React, { useState } from 'react'
import './write.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import moment from 'moment'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
function WriteNew() {
  const state = useLocation().state;
  const navigate = useNavigate()
  
  const [value,setValue] = useState(state?.decs||'')
  const [title,setTitle] = useState(state?.title||'');
  const [desc,setDecs] = useState(state?.decs||'');
  const [img,setImg] = useState(null);
  const [cat,setCat] = useState(state?.catogory||'');
  const [file,setFile]=useState(null);

  const upload = async()=>{
     try {
      const formData = new FormData;
      formData.append("file",file)
      const res = await axios.post("/upload",formData)
      console.log(res.data)
      return res.data
     } catch (error) {
      console.log(error)
     }
  }

  const handleClick=async(e)=>{
    console.log(cat)
    e.preventDefault();
    const imgUrl =await upload()
    try {
      console.log("tr")
      state
      ?await axios.put(`/posts/${state.id}`,{
        title,
        decs:value,
        catogory:cat,
        img:file?imgUrl:''})

      :await axios.post(`/posts/create`,{
        title,
        decs:value,
        cat,
        date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") ,
        img:file? imgUrl:''});

        navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  console.log(value)
  return (
    <div className='WriteNew'>
      <div className="w-content"> 
        <input value={title} type="text" className="w-input" onChange={e=>setTitle(e.target.value)} placeholder='Title'/>
        <div className="editorContiner">
          <ReactQuill className='rq' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="w-menu">
        <div className="w-item">
          <h1 className="w-publish">Publish</h1>
          <span>
            <b>visbility</b>public
          </span>
          <input style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} type="file" id='file' className="w-input-file" />
          <label htmlFor="file" className="w-ip-label">Upload</label>
          <div className="buttons-w">
            <button className="w-draft">save as draft</button>
            <button onClick={handleClick} className="w-update">update</button>
          </div>
        </div>
        <div className="w-item">
          <h1 className="w-cat">Catogory</h1>
          <div className="w-cato">
          <input type="radio" checked={cat==='art'} id='art' name='cat' value='art' className="w-cat-input"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Art</label></div>

          <div className="w-cato">
          <input type="radio" checked={cat==='science'} id='science' name='cat' value='science' className="w-cat-input" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="science">Science</label></div>

          <div className="w-cato">
          <input type="radio" checked={cat==='tecnology'} id='tecnology' name='cat' value='tecnology' className="w-cat-input" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="tecnology">Tecnology</label></div>

          <div className="w-cato">
          <input type="radio" checked={cat==='design'} id='design' name='cat' value='design' className="w-cat-input" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="design">Design</label></div>

          <div className="w-cato">
          <input type="radio" checked={cat==='food'} id='food' name='cat' value='food' className="w-cat-input" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="food">Food</label></div>
        </div>
      </div>
    </div>
  )
}

export default WriteNew
