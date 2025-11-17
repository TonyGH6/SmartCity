
export const createReservation = async (SQLClient, clientID, {postID}) => {
    const { rows } = await SQLClient.query(
    `INSERT INTO Reservation (post_id, client_id)
     VALUES ($1, $2)
     RETURNING * `,
    [postID, clientID]
    );
  return rows[0];
};

export const readReservation = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM Reservation WHERE id = $1", [id]);
    return rows[0];
};

export const readReservationsByClientID = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM reservation WHERE client_id = $1", [id]);
    return rows;
};

export const readReservationByClientIDAndByPostID = async (SQLClient, {clientID, postID}) => {
    const {rows} = await SQLClient.query("SELECT * FROM Reservation WHERE client_id = $1 AND post_id = $2", [clientID, postID]);
    return rows[0];
};

export const readReservationsByPostID = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query("SELECT * FROM Reservation WHERE post_id = $1", [id]);
    return rows;
};


export const updateReservation = async(SQLClient, {id, reservationDate, reservationStatus}) => {
    let query = "UPDATE reservation SET ";
    const querySet = [];
    const queryValues = [];
    
    if(reservationDate){
        queryValues.push(reservationDate);
        querySet.push(`reservation_date = $${queryValues.length}`);
    }

    if (reservationStatus){
        queryValues.push(reservationStatus);
        querySet.push(`reservation_status = $${queryValues.length}`);
    }


    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(", ")} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error("No field given");
    }
};

export const deleteReservation = async (SQLClient, {id}) => {
    const {rowCount} = await SQLClient.query("DELETE FROM Reservation WHERE id = $1", [id]);
    return rowCount > 0;
};



export const getReservationsByUsername = async (SQLClient, { username, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];


  if (username) {
    conditions.push(`c.username = ($${values.length + 1})`);
    values.push(`${username}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT p.title, c.username, r.reservation_date, r.reservation_status
    FROM Reservation r
    INNER JOIN Client c ON c.id = r.client_id
    INNER JOIN Post p ON p.id = r.post_id
    ${whereClause}
    LIMIT ${Number(limit)} OFFSET ${Number(offset)}
  `;

  const { rows } = await SQLClient.query(query, values);
  return rows;
};
