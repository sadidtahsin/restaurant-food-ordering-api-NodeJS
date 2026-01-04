const router = require("express").Router();
const {home, createMenuItem, getAllMenuItems, getMenuItemById, deleteMenuItem, updateMenuItem, /*toggleAvalibility*/} = require("../controllers/menu.controller");

// router.get("/",home);
router.post("/",createMenuItem);
router.get("/",getAllMenuItems);
router.get("/:id",getMenuItemById);
router.put("/:id",updateMenuItem);
router.delete("/:id",deleteMenuItem);
// router.patch("/update-availibiity/:id",toggleAvalibility);




module.exports = router;