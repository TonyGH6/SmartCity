import {readFileSync} from "node:fs";
import {pool} from "../../database/database.js";
import {importPostalData} from "../../model/addressDB.js"



const requests = readFileSync(
    './Scripts/SQL/initDB.sql',
    {encoding: "utf-8"}
);


try {
    await pool.query(requests, []);
    await importPostalData(pool);
    console.log("done");
} catch (e) {
    console.error(e);
}