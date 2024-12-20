const errorMiddleware = (err, req, response, next) => {
  if (err.code == 500 || err.code === undefined) {
    response.status(500).json({
      error: "Si è svampato il server",
      cause: "Boh, che hai fatto?",
    });
  } else {
    response.status(err.code).json({
      error: err.message,
      cause: err.cause,
    });
  }
  console.log({ err });
};

const loggingMiddleware = (req, res, next) => {
  console.log(
    `Request Method: ${req.method}, URL: ${req.url}`
  );
  next();
};

export { errorMiddleware, loggingMiddleware };
