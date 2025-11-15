const { json } = require("express");
const Pet = require("../models/Pet");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class PetController {
    static async create(req, res) {
        // if (!req.body) {
        //     return res.status(400).json({ message: "Body da requisição está vazio." });
        // }
       
        const {name, age, weight, color } = req.body;

        const available = true;
        const images = req.files
        if (!images || images.length === 0) {
            return res.status(422).json({ message: "A imagem é obrigatória!" });
        }
        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!age) {
            res.status(422).json({message: "A idade é obrigatória!"});
            return;
        }

        if(!weight) {
            res.status(422).json({message: "O peso é obrigatório!"});
            return;
        }

        if(!color) {
            res.status(422).json({message: "A cor é obrigatória!"});
            return;
        }



        //get pet owner
        const token = getToken(req);
        const user = await getUserByToken(token);
        
        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        });

        //upload images
        images.map((image) => {
            pet.images.push(image.filename);
        });

        //salvando pets
        try{
            const newPet = await pet.save();
            res.status(201).json({message: "Pet cadastrado com sucesso!", data: newPet});
        } catch (error) {
            res.status(500).json({message: "Erro ao cadastrar pet.", error: error.message});
        }
    }
}



