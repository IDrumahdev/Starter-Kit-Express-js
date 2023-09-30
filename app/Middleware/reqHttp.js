const reqHttp404 = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on the server`
    });
}

export default reqHttp404;