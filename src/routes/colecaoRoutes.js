import express from "express";
import { getAllColecao, getColecoesById, createColecao, deleteColecao, updateColecao, updateColecoes } from "../controllers/colecaoController.js";

const router = express.Router();

router.get("/", getAllColecao);
router. get("/:id", getColecoesById);
router.post("/", createColecao);
router.delete("/:id", deleteColecao);
router.put("/:id", updateColecoes);

export default router;