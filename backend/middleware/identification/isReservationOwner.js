import { readReservation } from "../../model/reservationDB.js"; 
import { getUserById } from "../../model/client.js";
import { pool } from "../../database/database.js";

export const isReservationOwner = async (req, res, next) => {
    try {
        const reservationClientID = await readReservation(pool, {id:(parseInt(req.params.id) || req.body.id)});
        if (!reservationClientID) {
            return res.status(404).send("Reservation not found");
        }
        if (reservationClientID && req.user.id === reservationClientID.client_id ){
            next();
        } else {
            next(new Error("Must be reservation owner to access info"));
        }
    } catch (err){
        next(new Error("Must be reservation owner to access info"));
    }
}