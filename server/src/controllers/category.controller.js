import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// generateSlug method 

const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/'+/g, '')
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
};


// create new category 

const createCategory = asyncHandler(async (req, res) => {
    const { parentCatId, name, urlSlug, description } = req.body;

    if (!name || !parentCatId) {
        throw new ApiError(403, 'NAME and URL SLUG are require filed')
    }

    const categoryExisted = await Category.findOne({ name, parentCatId });


    if (categoryExisted) {
        throw new ApiError(403, 'Category already exist in dataBase.')
    }

    let slug = generateSlug(urlSlug || name);

    let slugExists = await Category.findOne({ urlSlug: slug, parentCatId });
    let i = 1;

    while (slugExists) {
        slug = `${slug}-${i}`;
        slugExists = await Category.findOne({ urlSlug: slug, parentCatId });
        i++
    }

    let ancestors = null;

    if (parentCatId) {
        const parentCategory = await Category.findById(parentCatId);
        if (!parentCategory) {
            throw new ApiError(404, 'Parent category not found');
        }
        ancestors = parentCategory.ancestors ? [...parentCategory.ancestors, parentCatId] : [parentCatId];
    }

    const category = await Category.create({
        parentCatId,
        name,
        urlSlug: slug,
        description,
        ancestors
    });

    if (!category) {
        throw new ApiError(500, "Something went wrong please try again later.")
    }



    return res.status(201).json(
        new ApiResponse(200, category, "Category registered Successfully")
    )
})


// get categories from database

const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find();

    if (!categories) {
        throw new ApiError(500, "Something went wrong please try again later.")
    }

    return res.status(201).json(
        new ApiResponse(200, categories, "Categories List fetch Successfully")
    )
})


// update category 

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, parentCatId, description, urlSlug } = req.body;

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    let slug = urlSlug;
    if (urlSlug || name) {

        slug = generateSlug(urlSlug || name);

        let slugExists = await Category.findOne({ urlSlug: slug, parentCatId });
        let i = 1;

        while (slugExists) {
            slug = `${slug}-${i}`;
            slugExists = await Category.findOne({ urlSlug: slug, parentCatId });
            i++
        }

    }

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, 'Category not found');
    }

    let ancestors = category.ancestors;
    if (parentCatId) {
        if (parentCatId !== category.parentCatId) {
            const parentCategory = await Category.findById(parentCatId);
            if (!parentCategory) {
                throw new ApiError(400, "Parent category not found.");
            }
            ancestors = parentCategory.ancestors ? [...parentCategory.ancestors, parentCatId] : [parentCatId];
        }
    }

    const updatedFields = { name, parentCatId, description, urlSlug: slug, ancestors };

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true,
    });

    if (!updatedCategory) {
        throw new ApiError(404, 'Category not found');
    }

    return res.status(200).json(
        new ApiResponse(200, updatedCategory, "Category updated successfully")
    )
})

// delete category by id 

const deleteById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    const categoryAsParent = await Category.find({ parentCatId: id });

    if (categoryAsParent.length > 0) {
        throw new ApiError(400, `Cannot delete category with child categories. Category id:- ${id} used as parent category.`)
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return next(new ApiError(404, 'Category not found'));
    }

    return res.status(201).json(
        new ApiResponse(200, category, "Category deleted successfully")
    )

})


// get childrens

const getChildrens = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new ApiError(404, "Used category Id is not a vaild id.")
    }

    const objectId = new mongoose.Types.ObjectId(id);
    // const childrens = await Category.find({ parentCatId: id }).select();
    const childrens = await Category.aggregate(
        [
            {
                $match: { parentCatId: objectId }
            },
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ]
    );

    console.log(childrens)
    if (childrens.length <= 0) {
        throw new ApiError(400, `No chlidren linked with category Id:- ${id}`)
    }

    return res.status(201).json(
        new ApiResponse(200, childrens, "Childrens fetched successfully")
    )
})

// get ancestors


const getAncestors = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    const categoryExist = await Category.findById(id);

    if (!categoryExist) {
        throw new ApiError(404, "Used category Id is not a vaild id.")
    }

    const ancestorsList = categoryExist.ancestors;
    // Collect all ancestor details
    const ancestorDetails = [];

    for (let ancestorId of ancestorsList) {
        const ancestors = await Category.aggregate([
            {
                $match: { _id: ancestorId }
            },
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0
                }
            }
        ]);


        if (ancestors.length > 0) {
            ancestorDetails.push(ancestors[0]);
        }
    }

    return res.status(201).json(
        new ApiResponse(200, ancestorDetails, "Childrens fetched successfully")
    )

})

export {
    createCategory,
    getCategories,
    updateCategory,
    deleteById,
    getChildrens,
    getAncestors
}