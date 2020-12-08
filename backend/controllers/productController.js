import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'


//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) =>{

    //pages constans
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
    const categoryName = req.query.category || ''
    const range = req.query.range


    Category.find({name:{$regex: categoryName, $options: 'i'}}).then(async category => {
        //check for keyword
        
            let keyword = req.query.keyword ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i'
                },
                
            } : {}
            if(category){
                keyword = {...keyword, category:category}
            }
            if(range){
                keyword = {...keyword, price:{$lte:range}}
            }
        
        
    
            //get number of products
            const count = await Product.countDocuments({...keyword})
        
        
            const products = await Product.find({...keyword})
                .populate('category','_id name','Category')
                .limit(pageSize)
                .skip(pageSize * (page - 1))
            res.json({products, page, pages: Math.ceil(count / pageSize)})

    })


   

    
})

//@desc     Fetch related products
//@route    GET /api/products/related/:category
//@access   Public
const getRelatedProducts = asyncHandler(async (req, res) =>{

    //category
    const productId = req.query.product

    const product = await Product.findById(productId).populate('category','_id name','Category')

    if(product){
            Category.find({_id:product.category.id}).then(async category => {
                const products = await Product.find({_id:{$ne:product._id},category:category})
                    .populate('category','_id name','Category')
                    .limit(4)
                res.json(products)
                 
            })
    }

    


   

    
})



//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category','_id name','Category')
    
    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/admin
const deleteProduct = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id)
    
    if(product){
        await product.remove()
        res.json({message: 'Product removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc     Create a product
//@route    POST /api/products
//@access   Private/admin
const createProduct = asyncHandler(async (req, res) =>{
    
    const category = await Category.findOne()
    
    if(category)
    {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: category,
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
        })
        const createdProduct =  await product.save()
        res.status(201).json(createdProduct)
    }


})

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/admin
const updateProduct = asyncHandler(async (req, res) =>{
    
    const { name, price, description, image, brand, category, countInStock } = req.body

    const categoryToInsert = await Category.findById(category)
    const product = await Product.findById(req.params.id)

    if(product && categoryToInsert){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = categoryToInsert
        product.countInStock = countInStock


        const updatedProduct =  await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})

//@desc     Create new review
//@route    POST /api/products/:id/reviews
//@access   Private
const createProductReview = asyncHandler(async (req, res) =>{
    
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        //check if user already reviewed product
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed!')
        }

        //create review structure
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        //add review
        product.reviews.push(review)
        //add new number of reviews
        product.numReviews = product.reviews.length
        //calculate new rating
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        //update
        await product.save()
        res.status(201).json({message: 'Review added!'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})


//@desc     Get top rated products
//@route    GET /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async (req, res) =>{
    
    const products  = await Product.find({})
        .populate('category','_id name','Category')
        .sort({ rating: -1 })
        .limit(3)
    res.json(products)

})



export {
    getProducts,
    getRelatedProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}