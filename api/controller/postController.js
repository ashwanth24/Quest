import jwt from 'jsonwebtoken'
import db from '../repository/db.js'
//------------------------------------------------------------------------------------------------
//get post
//------------------------------------------------------------------------------------------------

export const getPost=(req,res)=>{
    console.log(req.query.cat)
    const q = req.query.cat
            ?"SELECT * FROM posts WHERE catogory=?"
            :"SELECT *FROM posts"
    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data);
    })
    
}
//------------------------------------------------------------------------------------------------
//get post by id
//------------------------------------------------------------------------------------------------

export const getPostById=(req,res)=>{
const q = "SELECT `username`,p.id,`title`, `decs`, p.img , u.uimg AS userImg,`catogory`,`date` FROM users u Join posts p ON u.id=p.uid WHERE p.id =? "

db.query(q,[req.params.id],(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data[0])
})
}
//------------------------------------------------------------------------------------------------
//delete a post
//------------------------------------------------------------------------------------------------

export const deletePostById=(req,res)=>{
     const token = req.cookies.access_token
     if(!token) return res.status(401).json("not authenicated")

     jwt.verify(token,'jwtKey',(err,userInfo)=>{
        if(err)return res.status(401).json("invalid Token")

        const postId = req.params.id;
        const q = " DELETE FROM posts WHERE `id`=? AND `uid`=?"

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("You cant delete the poost")
            return res.status(200).json("post deleted")
        })
     })

}
export const UpdatePostById=(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("not authenicated")

    jwt.verify(token,'jwtKey',(err,userInfo)=>{
       if(err)return res.status(401).json("invalid Token")

       const postId = req.params.id
       const q = "UPDATE posts SET `title`=? ,`decs`=?, `catogory`=? WHERE `id`=? AND `uid`=?";
       const values = [
           req.body.title,
           req.body.decs,
           req.body.catogory,
       ];
   
       db.query(q, [...values,postId,userInfo.id], (err, data) => {
           if (err){
            console.log(err)
            return res.status(500).json(err);}
           return res.status(200).json("Post updated");
       });

    })
}
//------------------------------------------------------------------------------------------------
//add post
//------------------------------------------------------------------------------------------------


export const addPost = (req, res) => {

    const token = req.cookies.access_token
    if(!token) return res.status(401).json("not authenicated")
    jwt.verify(token,'jwtKey',(err,userInfo)=>{
       if(err)return res.status(401).json("invalid Token")

       const q = "INSERT INTO posts (`title`,`date`, `decs`, `img`, `uid`,`catogory`) VALUES (?)";
       const values = [
           req.body.title,
           req.body.date,
           req.body.decs,
           req.body.img,
           userInfo.id,
           req.body.catogory
       ];
       console.log(req.body.catogory)

   
       db.query(q, [values], (err, data) => {
           if (err){ 
            console.log(err)
            return res.status(500).json(err);}
           return res.status(200).json("Post created");
       });

    })

}


