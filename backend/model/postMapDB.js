
export const getPostsForMap = async (SQLClient, { postStatus = "available" }) => {
    const { rows } = await SQLClient.query(
        `
    SELECT id, title, latitude, longitude
    FROM Post
    WHERE post_status = $1
      AND latitude IS NOT NULL
      AND longitude IS NOT NULL
    ORDER BY id DESC
    `,
        [postStatus]
    );
    return rows;
};

export const getHotspots = async (SQLClient, { postStatus = "available", decimals = 2 }) => {
    const dec = Number(decimals);
    const safeDec = Number.isInteger(dec) ? Math.min(Math.max(dec, 1), 5) : 2;

    const { rows } = await SQLClient.query(
        `
    SELECT
      ROUND(latitude::numeric, $2)::float8  AS lat,
      ROUND(longitude::numeric, $2)::float8 AS lng,
      COUNT(*)::int AS count
    FROM Post
    WHERE post_status = $1
      AND latitude IS NOT NULL
      AND longitude IS NOT NULL
    GROUP BY 1,2
    ORDER BY count DESC
    `,
        [postStatus, safeDec]
    );

    return rows;
};
