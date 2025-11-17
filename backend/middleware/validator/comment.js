import vine from '@vinejs/vine';


export const createCommentSchema = vine.object({
    content: vine.string().trim(), 
    id_post: vine.number().positive(),
    id_costumer: vine.number().positive(), 
    
}); 

export const updateCommentSchema = vine.object({
    content: vine.string().trim().optional(),
    
}); 


export const
    addCommentValidator = vine.compile(createCommentSchema),
    updateCommentValidator = vine.compile(updateCommentSchema);
