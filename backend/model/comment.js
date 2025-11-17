

export const deleteComment = async (SQLClient, {id})=>{
    let query="DELETE FROM Comment WHERE id=$1";
    const {rows} = await SQLClient.query(query, [id]);
    return rows > 0;
}

export const createComment = async (SQLClient, {content, idPost, idCostumer}) => {
    let query = "INSERT INTO Comment(content, id_post, id_costumer) VALUES ($1, $2, $3) RETURNING id";
    const {rows} = await SQLClient.query(query, [content, idPost, idCostumer]);
    return rows[0];
}

export const updateComment = async (SQLClient, {id, content}) => {
    if(!content){
        throw new Error("Miss a field given(content)");
    }
    if(!id){
        throw new Error("Miss a field given (id)"); 
    }
    let query="UPDATE Comment SET content=$2 WHERE id=$1";
    return await SQLClient.query(query, [id, content]);
}

export const getComments = async (SQLClient, { commentDate, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];

  if (commentDate) {
    values.push(`%${commentDate}%`);
    conditions.push(`TO_CHAR(c.date, 'YYYY-MM-DD') LIKE $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT
      c.content,
      c.date,
      p.title AS post_title,
      cl.username AS username
    FROM Comment c
    JOIN Post p ON c.id_post = p.id
    JOIN Client cl ON c.id_costumer = cl.id
    ${whereClause}
    ORDER BY c.date DESC, c.id DESC
    LIMIT ${Number(limit)} OFFSET ${Number(offset)}
  `;

  const { rows } = await SQLClient.query(query, values);
  return rows;
};