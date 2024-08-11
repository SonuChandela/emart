import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateSlug } from "../utils/GenrateUrlSlug.js";


// create new category 
const createCategory = asyncHandler(async (req, res) => {
    const { parentCatId, name, urlSlug, description } = req.body;

    if (!name) {
        throw new ApiError(403, 'Name is require filed')
    }

    const categoryExisted = await Category.findOne({ name });


    if (categoryExisted) {
        throw new ApiError(403, 'Category already exist in dataBase.')
    }

    let slug = generateSlug(urlSlug || name);

    let slugExists = await Category.findOne({ urlSlug: slug });
    let i = 1;

    while (slugExists) {
        slug = `${slug}-${i}`;
        slugExists = await Category.findOne({ urlSlug: slug });
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


// update category by id
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
        throw new ApiError(400, `Cannot delete category. Category id:- ${id} used as parent category.`)
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return next(new ApiError(404, 'Category not found'));
    }

    return res.status(201).json(
        new ApiResponse(200, category, "Category deleted successfully")
    )

})


// get childrens all Childrens
const getChildrens = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const childrens = await Category.aggregate(
        [
            {
                $match: { ancestors: { $in: [objectId] } }
            },
            {
                $project: {
                    name: 1,
                    urlSlug: 1,
                    ancestors: 1
                }
            }
        ]
    );

    if (!childrens) {
        throw new ApiError(500, 'Unable to get childrens data. Please use a valid category Id.')
    }

    if (childrens.length <= 0) {
        throw new ApiError(400, `No chlidren linked with category Id:- ${id}`)
    }

    return res.status(201).json(
        new ApiResponse(200, childrens, "Childrens fetched successfully")
    )
})

// get all ancestors 
const getAncestors = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    if (!id) {
        throw new ApiError(400, "Category Id is required filed.")
    }

    const ancestors = await Category.aggregate([
        {
            $match: { _id: objectId }
        },
        {
            $unwind: "$ancestors"
        },
        {
            $lookup: {
                from: "categories",
                localField: "ancestors",
                foreignField: "_id",
                as: "ancestorDetails",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            urlSlug: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$ancestorDetails"
        },
        {
            $group: {
                _id: "$_id",
                ancestorDetails: { $push: "$ancestorDetails" }
            }
        },
        {
            $project: {
                _id: 0,
                ancestorDetails: 1
            }
        }
    ]);


    return res.status(201).json(
        new ApiResponse(200, ancestors, "Ancestors detail fetched successfully")
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