

export const createPostCategory = async (SQLClient, {IDCategory, IDPost}) => {
    const { rows } = await SQLClient.query(
    `INSERT INTO Post_Category (id_category, id_ad)
     VALUES ($1, $2)
     RETURNING * `,
    [IDCategory, IDPost]
  );
  
  return rows[0];
};