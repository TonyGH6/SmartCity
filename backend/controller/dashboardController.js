import {pool} from "../database/database.js";
import * as dashboardModel from "../model/dashboardModel.js";
 



export const getAllStats = async (req, res) => {
    try {
        const [
            totalAnnonces, 
            totalReservations, 
            totalRetraits, 
            utilisateursActifs 
        ] = await Promise.all([
            dashboardModel.getTotalPosts(pool),
            dashboardModel.getTotalReservations(pool),
            dashboardModel.getTotalConfirmedReservations(pool),
            dashboardModel.getTotalUsers(pool),
        ]);

        res.status(200).json({
            totalAnnonces: totalAnnonces,
            totalReservations: totalReservations,
            totalRetraits: totalRetraits, 
            utilisateursActifs: utilisateursActifs,
        });

    } catch (err) {
        console.error("Erreur serveur lors de la récupération des statistiques complètes:", err);
        res.status(500).json({ message: "Erreur serveur lors de l'agrégation des statistiques." });
    }
};