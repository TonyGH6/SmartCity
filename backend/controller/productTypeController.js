import {pool} from "../database/database.js";
import * as typeProductModel from "../model/productType.js";

export const getCategories = async (req, res) => {
  try {
   
    const { nameCategory, page, limit } = req.query;

    const categories = await typeProductModel.getCategories(pool, {
      nameCategory, 
      page: parseInt(page) || 1, 
      limit: parseInt(limit) || 10 
    });

    res.status(200).json(categories);
  } catch (err) {
    console.error('Erreur récupération des catégories :', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des catégories.' });
  }
};

export const createTypeProduct = async (req, res) => {
    try {
        const { nameCategory } = req.body;
        
        if (!nameCategory) {
             return res.status(400).send("Le nom de la catégorie est requis.");
        }

        const categoryData = { nameCategory }; 

        const existingType = await typeProductModel.getCategories(pool, categoryData);
        
        if (existingType && existingType.rows && existingType.rows.length > 0) {
            return res.status(409).send("Type already exists");
        }

        const productCreated = await typeProductModel.createTypeProduct(pool, categoryData);
        
        if (productCreated) {
            return res.status(201).send(productCreated);
        } 
        
        return res.status(500).send("Échec de la création de la catégorie.");

    } catch(err) {
        console.error("Erreur création catégorie :", err);
        res.status(500).send(err.message || "Erreur interne du serveur");
    }
};

export const updateTypeProduct = async (req, res) => {
    try {
        await typeProductModel.updateTypeProduct(pool, req.body);
        res.sendStatus(204);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}


export const deleteTypeProduct = async (req, res) => {
    try{
        await typeProductModel.deleteTypeProduct(pool, req.body);
        res.sendStatus(204);

    }catch{
        console.log(err);
        res.sendStatus(500);
    }
}

