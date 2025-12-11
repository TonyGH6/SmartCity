import argon2 from "argon2";
import "dotenv/config";

export const hashPassword = async (plainPassword) => {
    if (!plainPassword) return null;

    const pepper = process.env.PEPPER || "";
    const passwordWithPepper = plainPassword + pepper;

    return argon2.hash(passwordWithPepper);
};
