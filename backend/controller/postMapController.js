
import { pool } from "../database/database.js";
import * as postMapModel from "../model/postMapDB.js";

export const getPostsMap = async (req, res) => {
    try {
        const { postStatus } = req.query;
        const rows = await postMapModel.getPostsForMap(pool, {
            postStatus: postStatus || "available",
        });
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getPostsHotspots = async (req, res) => {
    try {
        const { postStatus, decimals } = req.query;
        const rows = await postMapModel.getHotspots(pool, {
            postStatus: postStatus || "available",
            decimals: decimals ? parseInt(decimals, 10) : 2,
        });
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
