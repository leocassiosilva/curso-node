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

    static async getAll(req, res) {
        const pets = await Pet.find().sort("-createdAt");
        res.status(200).json({ pets: pets });
    }

    static async getUserPets(req, res) {
        //get user from token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");
        res.status(200).json({ pets: pets });
    }

    static async getAllUserAdoptions(req, res) {
        //get user from token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");
        res.status(200).json({ pets: pets });
    }

    static async getPetById(req, res) {
        const id = req.params.id;
        const pet = await Pet.findById(id);

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"});
            return;
        }
        res.status(200).json({ pet: pet });
    }

    static async removePetById(req, res) {
        const id = req.params.id;
        
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: "ID inválido!"});
            return;
        }
        
            
        //get user from token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pet = await Pet.findOne({_id: id});


        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"});
            return;
        }
        
        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: "Houve um problema ao processar sua solicitação, tente novamente mais tarde."});
            return;
        }
     

    }
}


