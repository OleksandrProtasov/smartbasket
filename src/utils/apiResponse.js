const sendError = (res, status, message, details) => {
  const payload = {
    success: false,
    error: {
      message,
    },
  };

  if (details) {
    payload.error.details = details;
  }

  return res.status(status).json(payload);
};

const sendSuccess = (res, data, meta) => {
  const payload = {
    success: true,
    data,
  };

  if (meta) {
    payload.meta = meta;
  }

  return res.json(payload);
};

module.exports = {
  sendError,
  sendSuccess,
};
