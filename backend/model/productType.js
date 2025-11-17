import {Query} from "pg";


export const readCategoryProductFromID = async (SQLClient, id)=>{
    let query="SELECT * FROM Category_product WHERE id_category = $1"; 
    const {rows}=await SQLClient.query(query, [id]);
    return rows;
}

export const createTypeProduct = async(SQLClient, {nameCategory}) => {
 const {rows}=await SQLClient.query("INSERT INTO Category_product(name_category) VALUES ($1) RETURNING *",
     [nameCategory]
 );
 return rows[0];
}

export const updateTypeProduct=async(SQLClient, {idCategory, nameCategory}) => {

    if(!nameCategory){
        throw new Error("No field given (Category name)");
    }
    let query="UPDATE Category_product SET name_category =$2 WHERE id_category=$1 ";
    return await SQLClient.query(query, [idCategory, nameCategory]);

}


export const deleteTypeProduct=async(SQLClient, {idCategory})=> {
   if(!idCategory){
       throw new Error("Category ID is required for deletion");
   }
   let query="DELETE FROM Category_product WHERE id_category=$1";
   const {rows} =await SQLClient.query(query, [idCategory]);
   return rows > 0;
}



export const getCategories = async (SQLClient, { nameCategory, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];

  if (nameCategory) {
    values.push(`%${nameCategory}%`);
    conditions.push(`LOWER(name_category) LIKE LOWER($${values.length})`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT 
      id_category, 
      name_category 
    FROM Category_product
    ${whereClause}
    ORDER BY name_category ASC
    LIMIT ${Number(limit)} OFFSET ${Number(offset)}
  `;

  const { rows } = await SQLClient.query(query, values);
  return rows;
};

