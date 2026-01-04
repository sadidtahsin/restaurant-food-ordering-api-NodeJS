const menuService = require("../services/menu.service");
const ApiResponse = require("../utils/apiResponse");

const home = async (req,res,next) =>{
     try{
        const menuItem = await menuService.home();
        console.log("s "+menuItem);
        res.status(200).json(new ApiResponse(200,menuItem));
    }catch(err){
        next(err);
    }
}

const createMenuItem = async (req, res, next) => {
    try{
        const menuItem = menuService.createMenuItem(req.body);
        res.status(201).json(new ApiResponse(201,menuItem,"Menu item created successfully"));
    }catch(err){
        next(err);
    }
};

const getAllMenuItems = async (req, res, next)=>{
    try{
        const {category, isAvailable, isVegetarian} = req.query
        const allItems =  await menuService.getAllMenuItems({category, isAvailable, isVegetarian});
        res.status(200).json(new ApiResponse(200, allItems));
    }catch(err){
        next(err);
    }
};

const getMenuItemById = async (req, res, next) => {
    try{
        const item = await menuService.getMenuItemById(req.params.id)
        res.status(200).json(new ApiResponse(200,item));
    }catch(err){
        next(err);
    }
};

const updateMenuItem = async (req, res, next) => {
    try{
        const item = await menuService.updateMenuItem(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200,item));

    }catch(err){
        next(err);
    }
};

const deleteMenuItem = async (req, res, next) => {
    try{
        const item = await menuService.deleteMenuItem(req.params.id);
        res.status(200).json(new ApiResponse(200, item, 'Menu item deleted successfully'));

    }catch(err){
        next(err);
    }
};

// const toggleAvalibility = async (req, res, next) => {
//     try{
//         const item = await menuService.toggleAvalibility(req.params.id);
//         res.status(200).json(new ApiResponse(200, item, 'Menu item deleted successfully'));

//     }catch(err){
//         next(err);
//     }
// };

module.exports= {
    home, 
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    deleteMenuItem,
    updateMenuItem,
    // toggleAvalibility 
}