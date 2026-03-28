import fieldRequirements from "../config/fieldRequirements.js";

// Middleware to validate whether all fields are present or not
function fieldsMissingValidation(req, res, next) {
    // Creating complete path after the domain name like http:localhost:3000/cart/items/123 - so path will be /cart/items/123
    const path = req.baseUrl + req.path;
    // According to the path we are getting the specific fields for this path from fieldRequirements.js (it contains fieldRequirements obj)
    const requiredFields = getRequiredFields(path);
    // Fields recieved in the body
    const recievedFields = req.body || {};

    // If the req is other than put or post then we move ahead in the middleware chain or if there are no required fields then we move ahead
    if (!["POST", "PUT"].includes(req.method) || !requiredFields) {
        return next();
    }

    // Finding fields that are missing from the recievedFields
    const missingFields = requiredFields.filter(field => !recievedFields[field]);

    // If req is POST and if fields missing is more than one which mean while creating any data any imp field is missing
    if (req.method === "POST" && missingFields.length > 0) {
        return res.status(400).json({ message: `Required fields (${missingFields.join(", ")}) are missing !` });
    }
    // If req is PUT and if all the fields are missing which means we want to update any data but no data is provided
    if (req.method === "PUT" && missingFields.length === requiredFields.length) {
        return res.status(400).json({ message: `Required fields (${missingFields.join(", ")}) are missing ! Atleast one field is required.` });
    }

    next();
}


// Function to get the respective fields for the path like if path is /products/add-product which means we require following fields ["name", "price", "description, "stock", "imageSrc"] 
function getRequiredFields(path) {
    for (const [routePath, fields] of Object.entries(fieldRequirements)) {
        // Checking one by one which path from fieldRequirements is matching the path
        if (checkRoutePathIsMatchingToPath(routePath, path)) {
            return fields;
        }
    }

    return null;
}


// Function to check whether the routePath passed is matching to path in url
function checkRoutePathIsMatchingToPath(routePath, path) {
    // Breaking the both the strings fieldRequirements obj's prop and path in an array based on split 
    const routePathSegments = routePath.split("/").filter(segment => Boolean(segment));
    const pathSegments = path.split("/").filter(segment => Boolean(segment));

    // If the length of both arrays are different meaning the path has mismatching
    // eg : routePath : "/cart/items/1234" -> ["cart", "items", "1234"]
    //      path :      "/cart/items/1234" -> ["cart", "items", "1234"]
    // In the above case length is equal so path can be same
    if (routePathSegments.length !== pathSegments.length) {
        return false;
    }

    // If length is equal then we loop over to routePath so that we can check if all the array items are same or not
    for (let i = 0; i < routePathSegments.length; i++) {
        // if the array item starts with ":" which means its a dynamic id so skip it
        if (routePathSegments[i].startsWith(":")) {
            continue;
        }

        // If the current item is not starting with ":" then we check whether both arrays items are equal or not
        if (routePathSegments[i] !== pathSegments[i]) {
            return false;
        }
    }

    return true;
}

export default fieldsMissingValidation;