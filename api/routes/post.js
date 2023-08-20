import express from 'express';
import{addPost, deletePostById, getPost, getPostById,UpdatePostById} from '../controller/postController.js'
const router = express.Router()

router.post("/create",addPost)
router.get("/",getPost)

router.get("/:id",getPostById)
router.delete("/:id",deletePostById)
router.put("/:id",UpdatePostById)




export default router;