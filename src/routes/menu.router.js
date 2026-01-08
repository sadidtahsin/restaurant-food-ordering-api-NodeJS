const router = require("express").Router();
const {home, createMenuItem, getAllMenuItems, getMenuItemById, deleteMenuItem, updateMenuItem} = require("../controllers/menu.controller");
const { verify } = require("../middlewares/auth.middleware");
const { authorizeRoles }  = require("../middlewares/role.middleware");

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);


// Admin routes
router.post('/', verify, authorizeRoles('admin'), createMenuItem);
router.put('/:id', verify, authorizeRoles('admin'), updateMenuItem);
router.delete('/:id', verify, authorizeRoles('admin'), deleteMenuItem);


module.exports = router;