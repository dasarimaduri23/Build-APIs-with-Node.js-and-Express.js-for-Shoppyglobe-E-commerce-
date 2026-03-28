import productsModel from "../models/products.model.js";

// Gets all products from the database
export async function getAllProducts(req, res, next) {

    try {
        const products = await productsModel.find();
        if (products.length===0) {
            return res.status(404).json({ message: "No products found !" });
        }

        res.status(200).send(products);

    } catch (error) {
        next(error);
    }

}


// Gets a product based on id from the database
export async function getProductById(req, res, next) {
    const productId = req.params.id;

    try {
        const product = await productsModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found !" });
        }

        res.status(200).send(product);

    } catch (error) {
        next(error);
    }
}

// Add product to database
export async function addProduct(req, res, next) {
    const { name, price, description, stock, imageSrc } = req.body;

    try {
        const newProduct = await productsModel.create({
            name: name,
            price: price,
            description: description,
            stock: stock,
            imageSrc: imageSrc
        });

        if (!newProduct) {
            return res.status(400).json({ message: "An error occured while creating adding the product to database." });
        }

        res.status(201).send(newProduct);
    } catch (error) {
        next(error);
    }

}

// Update the product based on id
export async function updateProductById(req, res, next) {
    const productId = req.params.id;
    const product = req.body;

    try {
        const updatedProduct = await productsModel.findByIdAndUpdate(
            productId,
            { ...product },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found !" });
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        next(error);
    }
}

// Deleting a product based on id
export async function deleteProductById(req, res, next) {
    const productId = req.params.id;

    try {
        const product = await productsModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found !" });
        }

        res.status(200).send({ message: "Product Deleted Successfully !", data: product });
    } catch (error) {
        next(error);
    }
}