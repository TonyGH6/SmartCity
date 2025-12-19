import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../services/api";
import "../styles/login.css";

export default function ResetPassword() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!token) return setError("Token manquant.");
        if (newPassword !== confirm) return setError("Les mots de passe ne correspondent pas.");

        try {
            const res = await Axios.post("/admin/password-reset", { token, newPassword });
            setMessage(res.data?.message || "Mot de passe réinitialisé.");
        } catch (err) {
            setError(err.response?.data?.message || "Erreur serveur");
        }
    }

    return (
        <div className="formParent">
            <div className="form">
                <form onSubmit={handleSubmit} noValidate>
                    <h3 className="text-center mb-3">Réinitialiser le mot de passe</h3>

                    {message && <div className="alert alert-success py-1 text-center">{message}</div>}
                    {error && <div className="alert alert-danger py-1 text-center">{error}</div>}

                    <div className="input-group mb-3 custom-input-group-wrapper">
                        <input
                            type="password"
                            className="form-control rectangle"
                            placeholder="NOUVEAU MOT DE PASSE"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group mb-3 custom-input-group-wrapper">
                        <input
                            type="password"
                            className="form-control rectangle"
                            placeholder="CONFIRMER LE MOT DE PASSE"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="loginBtn w-100 btn mb-2">
                        Valider
                    </button>

                    <div className="formResetMotDePasse text-center mt-2">
                        <Link to="/login" className="retour-button">Retour</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
