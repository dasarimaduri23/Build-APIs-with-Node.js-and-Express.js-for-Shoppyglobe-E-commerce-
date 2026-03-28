function errorRoutes(err, req, res, next) {
    if (err.name === "MongoNetworkError") {
        return res.status(503).json({ message: "Network Error" });
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Validation Error", details: err.errors });
    } else if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid Id provided. Id must be in ObjectId format.", field: err.path });
    }

    res.status(500).json({ message: "Internal Server Error !", error: err });

    next();
}

export default errorRoutes;