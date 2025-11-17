import vine from '@vinejs/vine';


export const createCategoryProductSchema = vine.object({
    categoryName: vine.string().trim(), 
}); 

export const updateCategoryProductSchema = vine.object({
    categoryName: vine.string().trim(),
    
}); 


export const
    createCategoryProductValidator = vine.compile(createCategoryProductSchema),
    updateCategoryProductValidator = vine.compile(updateCategoryProductSchema);