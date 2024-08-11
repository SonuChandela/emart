import { Router } from "express";
import { addAddress, deleteAddressById, getAddressByUserId, updateAddress } from "../controllers/address.controller.js";

const router = Router();

router.route("/add").post(addAddress);
router.route("/get/:userId").get(getAddressByUserId);
router.route("/update/:id").put(updateAddress);
router.route("/delete/:id").delete(deleteAddressById);

export default router