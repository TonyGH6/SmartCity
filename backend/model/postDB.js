import {createPostCategory} from './postCategory.js';

export const createPost = async (SQLClient, clientID, {description, title, numberOfPlaces, photo, street, streetNumber, addressID}) => {

    try {
        const {rows} = await SQLClient.query(
        `INSERT INTO Post (description, title, number_of_places, post_status, photo, street, street_number, address_id, client_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [description, title, numberOfPlaces, 'available', photo, street, streetNumber, addressID, clientID]
        );
        return rows[0];
    } catch (err) {
        throw err;
    }
};



export const updatePost = async(SQLClient, {id, description, title, numberOfPlaces, postStatus, photo, addressID, clientID}) => {
    let query = "UPDATE post SET ";
    const querySet = [];
    const queryValues = [];
    
    if(description){
        queryValues.push(description);
        querySet.push(`description = $${queryValues.length}`);
    }

    if (title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }

    if (numberOfPlaces){
        queryValues.push(numberOfPlaces);
        querySet.push(`number_of_places = $${queryValues.length}`);
    }

    if (postStatus){
        queryValues.push(postStatus);
        querySet.push(`post_status = $${queryValues.length}`);
    }

    if (photo){
        queryValues.push(photo);
        querySet.push(`photo = $${queryValues.length}`);
    }

    if (addressID){
        queryValues.push(addressID);
        querySet.push(`address_id = $${queryValues.length}`);
    }


    if (clientID){
        queryValues.push(clientID);
        querySet.push(`client_id = $${queryValues.length}`);
    }


    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error("No field given");
    }
};

export const deletePost = async (SQLClient, {id}) => {
    const {rowCount} = await SQLClient.query("DELETE FROM Post WHERE id = $1", [id]);
    return rowCount > 0;
};

export const readPost = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM Post WHERE id = $1", [id]);
    return rows[0];
};


export const searchPostByCategory = async (SQLClient,  {nameCategory}) => {
    const query = "SELECT * FROM Post p INNER JOIN Post_category pc ON p.id = pc.id_ad INNER JOIN Category_product cp ON cp.id_category = pc.id_category WHERE cp.name_category=$1";
    const {rows} = await SQLClient.query(query, [nameCategory]);
    return rows;
};



export const getAllCategoriesFromPostID = async (SQLClient, id) => {
    const query = "SELECT cp.id_category, cp.name_category FROM Category_product cp INNER JOIN Post_category pc ON cp.id_category = pc.id_category WHERE pc.id_ad=$1";
    const {rows} = await SQLClient.query(query, [id]);
    return rows[0];
}


export const getPosts = async (SQLClient, { city, postStatus, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];


  if (city) {
    conditions.push(`LOWER(a.city) LIKE LOWER($${values.length + 1})`);
    values.push(`%${city}%`);
  }

  if (postStatus){
    if (postStatus === 'available' || postStatus === 'unavailable'){
        conditions.push(`p.post_status = $${values.length + 1}`);
        values.push(postStatus);
    }
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT p.id, p.title, string_agg(cp.name_category, ', ') AS categories, a.city, p.number_of_places, p.post_status
    FROM Post p
    JOIN Address a ON p.address_id = a.id
    INNER JOIN Post_category pc ON pc.id_ad = p.id
    INNER JOIN Category_product cp ON cp.id_category = pc.id_category
    ${whereClause}
    GROUP BY p.id, a.city, p.number_of_places, p.post_status
    LIMIT ${Number(limit)} OFFSET ${Number(offset)}
  `;

  const { rows } = await SQLClient.query(query, values);
  return rows;
};