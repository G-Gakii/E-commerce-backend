import { Router } from "express";
import {
  addUser,
  EditUserdData,
  getUser,
  getUsers,
  RemoveUSER,
} from "../controller/user.controller";

const router = Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", EditUserdData);
router.delete("/:id", RemoveUSER);

export default router;
