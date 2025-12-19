import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../services/api";
import "../styles/login.css";
import user_icon from "../assets/login/user.svg";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [resetLink, setResetLink] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await Axios.post("/admin/password-reset-request", { email });
            setMessage(res.data?.message || "Si un compte admin existe, un lien a été généré.");

            if (res.data?.resetLink) {
                setResetLink(res.data.resetLink);
            }


        } catch (err) {
            setError(err.response?.data?.message || "Erreur serveur");
        }
    }

    return (
        <div className="formParent">
            <div className="form">
                <form onSubmit={handleSubmit} noValidate>
                    <h3 className="text-center mb-3">Mot de passe oublié</h3>

                    {message && <div className="alert alert-success py-1 text-center">{message}</div>}

                    {error && <div className="alert alert-danger py-1 text-center">{error}</div>}

                    <div className="email input-group mb-3 custom-input-group-wrapper">
                        <span className="input-group-text userIcon-wrapper" id="email-addon">
                            <img className="userIcon" alt="Icône utilisateur" src={user_icon} />
                        </span>
                        <input
                            type="email"
                            className="form-control rectangle formParentEmail"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                            inputMode="email"
                        />
                    </div>

                    <button type="submit" className="loginBtn w-100 btn mb-2">
                        Envoyer
                    </button>

                    <div className="formResetMotDePasse text-center mt-2">
                        <Link to="/login" className="retour-button">Retour</Link>
                    </div>

                    {resetLink && (
                        <>
                            <div className="formParentMotDePasse text-center mt-2">
                                <a href={resetLink} className="forgot-link">
                                    Réinitialiser mon mot de passe
                                </a>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
