const router = require("express").Router();
const PetController = require("../controllers/PetController");
// middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints relacionados a pets
 */

/**
 * @swagger
 * /pets/create:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               color:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 */
router.post("/create", verifyToken, imageUpload.array("images"), PetController.create);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Lista todos os pets disponíveis
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets
 */
router.get("/", PetController.getAll);

/**
 * @swagger
 * /pets/mypets:
 *   get:
 *     summary: Lista todos os pets do usuário logado
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos pets do usuário
 */
router.get("/mypets", verifyToken, PetController.getUserPets);

/**
 * @swagger
 * /pets/myadoptions:
 *   get:
 *     summary: Lista as adoções feitas pelo usuário logado
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets adotados
 */
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtém detalhes de um pet específico
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Detalhes do pet
 *       404:
 *         description: Pet não encontrado
 */
router.get("/:id", PetController.getPetById);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Deleta um pet pelo ID (token obrigatório)
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet deletado com sucesso
 *       404:
 *         description: Pet não encontrado
 */
router.delete("/:id", verifyToken, PetController.removePetById);


/**
 * * @swagger
 * /pets/{id}:
 *  patch:
 *    summary: Atualiza os dados de um pet pelo ID (token obrigatório)
 *   tags: [Pets]
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *    - in: path
 *     name: id
 *    required: true
 *    schema:
 *     type: string
 *    description: ID do pet
 * 
 *  requestBody:
 *    required: false
 * 
 *  content:
 *    multipart/form-data:
 *     schema:
 *      type: object
 *     properties:
 *      name:
 *      type: string
 *     age:
 *  
 *  
 *  
 *    type: number
 *  weight:
 *  
 *   type: number
 * color:
 *   type: string
 * available:
 *  type: boolean
 *  images:
 *   type: array
 *  items:
 *    type: string
 *  
 *   format: binary
 *  
 *   responses:
 *    200:
 *    description: Pet atualizado com sucesso
 *   404:
 *    description: Pet não encontrado
 *  
 */
router.patch("/:id", verifyToken, imageUpload.array("images"), PetController.updatePetById);
module.exports = router;
