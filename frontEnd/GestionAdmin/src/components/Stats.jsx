import React, { useState, useEffect } from "react";
// Assurez-vous que le chemin d'accès à Axios est correct
import Axios from "../services/api"; 

// Importation des icônes (inchangé)
import annoncesIcon from "../assets/dashboard/megaphone.png"; 
import reservationsIcon from "../assets/dashboard/today.png";
import usersIcon from "../assets/dashboard/usersActif.png"; 
import retraitsIcon from "../assets/dashboard/truck.png"; 



const Stats = () => {
  const [stats, setStats] = useState({
    totalAnnonces: 0,
    totalReservations: 0,
    utilisateursActifs: 0,
    totalRetraits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await Axios.get('/stats');
        setStats(response.data); 
        
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques:", err);
        setError("Impossible de charger les données. Vérifiez le serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Chargement des statistiques...</p>;
  }
  if (error) {
    return <p style={{ color: 'red', padding: '1.5rem' }}>{error}</p>;
  }

  return (
    <section className="stats-section">
      <div className="stats-grid">
        
        {/* Stat 1: Annonces */}
        <div className="stat-card">
          <img src={annoncesIcon} alt="Icône Annonces" className="stat-icon" />
          <h5>Nombre d’annonces</h5>
          <p className="stat-value">{stats.totalAnnonces}</p>
        </div>

        {/* Stat 2: Réservations */}
        <div className="stat-card">
          <img src={reservationsIcon} alt="Icône Réservations" className="stat-icon" />
          <h5>Réservations effectuées</h5>
          <p className="stat-value">{stats.totalReservations}</p>
        </div>

        {/* Stat 3: Utilisateurs actifs */}
        <div className="stat-card">
          <img src={usersIcon} alt="Icône Utilisateurs" className="stat-icon" />
          <h5>Utilisateurs</h5>
          <p className="stat-value">{stats.utilisateursActifs}</p>
        </div>

        {/* Stat 4: Nombre de retraits */}
        <div className="stat-card">
          <img src={retraitsIcon} alt="Icône Retraits" className="stat-icon" />
          <h5>Nombre de retraits</h5>
          <p className="stat-value">{stats.totalRetraits}</p>
        </div>
        
      </div>
    </section>
  );
};

export default Stats;