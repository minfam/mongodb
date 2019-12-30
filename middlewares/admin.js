module.exports = (req, res, next) => {
    if (!res.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}