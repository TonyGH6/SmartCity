import axios from "axios";

export const geocodeAddress = async ({
                                         street,
                                         streetNumber,
                                         postalCode,
                                         city,
                                         country = "Belgique",
                                     }) => {
    const query = `${street} ${streetNumber}, ${postalCode} ${city}, ${country}`;

    const url = "https://nominatim.openstreetmap.org/search";

    try {
        const response = await axios.get(url, {
            params: {
                format: "json",
                limit: 1,
                q: query,
            },
            headers: {
                "User-Agent": "iShare-SmartCity/1.0 (student-project)",
            },
            timeout: 5000,
        });

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
            return null;
        }

        const lat = Number(data[0].lat);
        const lng = Number(data[0].lon);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return null;
        }

        return {
            latitude: lat,
            longitude: lng,
        };
    } catch (err) {
        console.warn("Nominatim geocoding error:", err.message);
        return null;
    }
};

