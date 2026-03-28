Welcome to the backend of Shoppy Globe, an e-commerce platform designed to provide seamless shopping experiences. This backend handles user registration and login, product management and cart operations.



Features:

User Authentication: Secure user registration and login with password hashing.

Product Management: CRUD operations for products.

Cart Management: Add, update, and delete items from the cart.

Middleware: Centralized error handling, checking fields availability and authentication using JWT.

Database: MongoDB for data storage.

Getting Started

Prerequisites
Ensure you have the following installed:

Node.js (v14 or later)
MongoDB (local or hosted instance)
Installation
Clone the repository:

git clone 
cd NODEJS PROJECT
Install dependencies:

npm install
Create a .env file in the root directory and add the following variables:

PORT=3000
DATABASE_NAME=<db_name>
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_secret_key>
Start the server:

npm start
The server will run on http://localhost:3000.

API Endpoints

Users

Method	Endpoint	    Description
POST	/users/register	Register a new user
POST	/users/login	Login a user

Products
Method	Endpoint	        Description
GET	    /products	        Get all products
GET	    /products/:id	    Get a product by ID
POST	/products	        Add a new product
PUT	    /products/:id	    Update a product by ID
DELETE	/products/:id	    Delete a product by ID

Cart

Method	Endpoint	        Description
GET	       /cart/:id	    Get all cart items for a user
GET	       /cart/items/:id	Get a cart items for a user
POST	   /cart	        Add an item to the cart
PUT	       /cart/items/:id	Update an item in the cart
DELETE	   /cart/:id	    Remove an item from the cart
DELETE ALL /cart/all/:id	Remove all items from the cart for a user


Dependencies
Express: Web framework
Mongoose: MongoDB ODM
Bcrypt: Password hashing
jsonwebtoken: Token-based authentication
Dotenv: Environment variable management