const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "production") {
        return res.status(500).json({
            message: "something went wrong!",
            status: "error"
        });
    }
    else { // orther mode
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            err: err.stack
        });
    }
};

export default errorHandler;