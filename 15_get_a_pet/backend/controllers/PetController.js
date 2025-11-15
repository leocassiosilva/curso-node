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
        
        //verificar se o pet pertence ao usuário
        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: "Houve um problema ao processar sua solicitação, tente novamente mais tarde."});
            return;
        }
        
        await Pet.findByIdAndRemove(id);
        res.status(200).json({message: "Pet removido com sucesso!"});

    }

    static async updatePetById(req, res) {
        const id = req.params.id;
        const {name, age, weight, color, available} = req.body;
        const images = req.files;

        const updatedData = {};

        //check if pet exists
        const pet = await Pet.findOne({_id: id});

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"});
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        //verificar se o pet pertence ao usuário
        if(pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({message: "Houve um problema ao processar sua solicitação, tente novamente mais tarde."});
            return;
        }

        //validations
        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }else {
            updatedData.name = name;
        }
        
        if(!age) {
            res.status(422).json({message: "A idade é obrigatória!"});
            return;
        }else {
            updatedData.age = age;
        }

        if(!weight) {
            res.status(422).json({message: "O peso é obrigatório!"});
            return;
        }else {
            updatedData.weight = weight;
        }
        
        if(!color) {
            res.status(422).json({message: "A cor é obrigatória!"});
            return;
        }else {
            updatedData.color = color;
        }

        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatória!" });
            return;
        }else{
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename);
            });
        }

        await Pet.findByIdAndUpdate(id, updatedData);
        res.status(200).json({message: "Pet atualizado com sucesso!"});
    }

    static async schedulePetById(req, res) {
        const id = req.params.id;

        //check if pet exists
        // const pet = await Pet.findOne({_id: id});
        const pet = await Pet.findById(id);
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"});
            return;
        }
        const token = getToken(req);
        const user = await getUserByToken(token);

        //verificar se o usuário é o dono do pet
        if(pet.user._id.equals(user._id)) {
            res.status(422).json({message: "Você não pode agendar uma visita para o seu próprio pet!"});
            return;
        }

        //check if user has already scheduled a visit
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)) {
                res.status(422).json({message: "Você já agendou uma visita para este pet!"});
                return;
            }
        }

        //add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image,
        };
        await Pet.findByIdAndUpdate(id, pet);
        res.status(200).json({message: `Visita agendada com sucesso! Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`});
        
    }
}


