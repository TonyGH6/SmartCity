import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useEffect, useState } from "react";

const HeatLayer = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (!points.length) return;

        const heat = L.heatLayer(points, {
            radius: 25,
            blur: 18,
            maxZoom: 17,
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [map, points]);

    return null;
};

export default function PostsHeatMap() {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:3002/posts/hotspots?decimals=2", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(p => [p.lat, p.lng, p.count]);
                setPoints(formatted);
            })
            .catch(console.error);
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <MapContainer
                center={[49.684, 5.812]}
                zoom={12}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <HeatLayer points={points} />
            </MapContainer>
        </div>
    );
}
