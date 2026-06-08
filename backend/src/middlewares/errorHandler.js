const { AppError } = require("../utils/appError");

function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: "Erro interno do servidor." });
}

module.exports = {
  errorHandler
};
