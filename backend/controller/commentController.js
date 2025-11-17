import {pool} from "../database/database.js";
import * as commentModel from "../model/comment.js";



export const createComment = async (req, res) => {
    try{
        const commentCreated = await commentModel.createComment(pool, req.body);
         if(commentCreated){
            res.status(201).send(commentCreated);
        }else{
            res.status(404).send("Failed to create comment"); 
        }   
    }catch (e){
        res.sendStatus(500);
    }
}

export const updateComment= async(req, res) => {
    try {
        await commentModel.updateComment(pool, req.body);
        res.sendStatus(204)
    }catch(err){
        console.log(err); 
        res.sendStatus(500);
    }
}

export const deleteComment = async(req, res) =>{
    try{
        const commentDeleted= await commentModel.deleteComment(pool, req.body);
        if(!commentDeleted){
            res.status(404).send(`Comment with ID ${commentDeleted.id} not found`);
        }else{
             res.status(200).send(`Comment ${commentDeleted.id} deleted successfully`);
        }
    }catch (err){
        console.log(err); 
        res.sendStatus(500);
    }
}

export const getComments = async (req, res) => {
  try {
   
    const { commentDate, page, limit } = req.query;

    const comments = await commentModel.getComments(pool, {
      commentDate, 
      page: parseInt(page) || 1, 
      limit: parseInt(limit) || 10 
    });

    res.status(200).json(comments);
    
  } catch (err) {
    console.error('Erreur récupération des commentaires :', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires.' });
  }
};

