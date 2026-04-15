const { sendError } = require('../utils/apiResponse');

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return sendError(res, 403, 'Доступ запрещен. Требуются права администратора');
    }
};

module.exports = admin; 