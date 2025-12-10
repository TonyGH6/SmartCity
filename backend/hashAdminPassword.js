// hashAdminPassword.js
import 'dotenv/config';
import argon2 from 'argon2';

const PEPPER = process.env.PEPPER; // tu l'as déjà dans ton env

async function run() {
    const plainPassword = 'Admin123!'; // le mot de passe que tu veux utiliser pour l’admin

    try {
        const hash = await argon2.hash(plainPassword + PEPPER);
        console.log('Hash généré pour Admin123! :');
        console.log(hash);
    } catch (err) {
        console.error('Erreur de hash:', err);
    }
}

run();
