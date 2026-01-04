const { json } = require("express");
const MenuItem = require("../models/menuItem.model");
const ApiError = require("../utils/apiError");

class MenuService {

    async home(){
        return {"msg": "menu"};
    }
    // Menu service methods here
    async createMenuItem(menuData) {
        const menuItem = await MenuItem.create(menuData);
        return menuItem;

    }

    async getAllMenuItems(filters = {}) {
        const {category, isAvailable, isVegetarian} = filters;
        const query = {};

        if (category) query.category = category;
        if (isAvailable !== undefined) query.isAvailable = isAvailable;
        if (isVegetarian != undefined) query.isVegetarian = isVegetarian;
        return await MenuItem.find(query);
    }

    async getMenuItemById(menuItemId) {
        const item = await MenuItem.findById(menuItemId);

        if(!item) {
            throw new ApiError(404, 'Menu item not found');
        }

        return item;
    }

    async updateMenuItem(id, updateData){
        const item = await MenuItem.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators:true
        });

        if(!item){
            throw new ApiError(404, 'Menu item not found')
        }
        return item;
    }

    async deleteMenuItem(id){
        const item = await MenuItem.findByIdAndDelete(id);

        if(!item){
            throw new ApiError(404, 'Menu item not found')
        }
        return item;
    }

    // async updateMenuItemAvalibility(id){
    //     const item = await MenuItem.findById(id);

    //     if(!item){
    //         throw new ApiError(404, 'Menu item not found')
    //     }

    //     item.isAvailable?  !item.isAvailable;
    //     await item.save();
    //     return item;
    // }


}
module.exports = new MenuService();