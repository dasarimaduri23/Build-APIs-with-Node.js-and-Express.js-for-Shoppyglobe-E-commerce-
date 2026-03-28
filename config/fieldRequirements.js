const fieldRequirements = {
    "products/": ["name", "price", "description", "stock", "imageSrc"],
    "products/:id": ["name", "price", "description", "stock", "imageSrc"],
    "users/register": ["firstname", "lastname", "email", "password"],
    "users/login": ["email", "password"],
    "cart/": ["userId", "productId", "quantity"],
    "cart/items/:id": ["quantity"],
};

export default fieldRequirements;