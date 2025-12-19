import { pool } from "../database/database.js";
import { hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";
import {getAdminByEmail, getUserById, resetPasswordById} from "../model/client.js";
import "dotenv/config";

export const requestReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email requis" });
        }

        const admin = await getAdminByEmail(pool, email);

        // Réponse neutre quoi qu'il arrive (anti user enumeration)
        if (!admin) {
            return res.status(200).json({
                message: "Si un compte administrateur existe avec cet email, un lien de réinitialisation a été généré.",
            });
        }

        // JWT de reset: contient l'id admin (sub) + un type

        const token = jwt.sign(
            { type: "admin_reset" },
            process.env.JWT_SECRET,
            { subject: String(admin.id), expiresIn: "15m" }
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        return res.status(200).json({
            message: "Lien de réinitialisation généré.",
            resetLink,
        });
    } catch (err) {
        console.error("Erreur requestReset:", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token et nouveau mot de passe requis" });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            // e.name peut être "TokenExpiredError" ou "JsonWebTokenError"
            const msg = e.name === "TokenExpiredError" ? "Token expiré" : "Token invalide";
            return res.status(400).json({ message: msg });
        }

        if (payload.type !== "admin_reset") {
            return res.status(400).json({ message: "Token invalide" });
        }

        const adminId = payload.sub; // subject

        // Sécurité: vérifier que cet id existe toujours et que c'est bien un admin
        const admin = await getUserById(pool, adminId);
        if (!admin || admin.isAdmin !== true) {
            // Selon ton mapping, adapte le champ (voir note juste après)
            return res.status(400).json({ message: "Token invalide" });
        }

        const hashedPassword = await hashPassword(newPassword);
        await resetPasswordById(pool, adminId, hashedPassword);

        return res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (err) {
        console.error("Erreur resetPassword:", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};
