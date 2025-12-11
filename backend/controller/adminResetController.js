import { pool } from "../database/database.js";
import { randomBytes } from "node:crypto";
import { hashPassword } from "../utils/password.js";
import "dotenv/config";
import * as userModel from "../model/client.js";

export const requestReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email requis" });
        }

        const admin = await userModel.getAdminByEmail(pool, email);

        if (!admin) {
            return res.status(200).json({
                message:
                    "Si un compte administrateur existe avec cet email, un lien de réinitialisation a été généré.",
            });
        }

        const token = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // +1h

        await userModel.setResetToken(pool, admin.id, token, expiresAt);

        const resetLink = `https://ton-frontend/reset-password?token=${token}`;

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
            return res
                .status(400)
                .json({ message: "Token et nouveau mot de passe requis" });
        }

        const admin = await userModel.getUserByResetToken(pool, token);

        if (!admin) {
            return res.status(400).json({ message: "Token invalide" });
        }

        const now = new Date();
        const expires = admin.resetTokenExpires;

        if (!expires || now > expires) {
            return res.status(400).json({ message: "Token expiré" });
        }

        const hashedPassword = await hashPassword(newPassword);

        await userModel.resetPasswordById(pool, admin.id, hashedPassword);

        return res
            .status(200)
            .json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (err) {
        console.error("Erreur resetPassword:", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};