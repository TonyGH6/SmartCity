import React from "react";

const Posts = () => {
  return (
    <div className="details-panel">
      <h2>Posts</h2>
      <p>Liste des posts (contenu de test).</p>
      <div style={{ display: "grid", gap: 8 }}>
        <div className="stat-card" style={{ minHeight: 80 }}>
          <strong>Post 1</strong>
          <p>Résumé du post 1</p>
        </div>
        <div className="stat-card" style={{ minHeight: 80 }}>
          <strong>Post 2</strong>
          <p>Résumé du post 2</p>
        </div>
      </div>
    </div>
  );
};

export default Posts;

