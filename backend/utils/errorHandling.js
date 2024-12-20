const throwError = (status, message, cause) => {
  const err = new Error(message, { cause });
  err.code = status;
  throw err;
};

const notFoundError = () => {
  throwError(
    404,
    "Autore non trovato",
    "Hai cercato un autore che non esiste nel database"
  );
};

const genericError = () => {
  throwError(
    500,
    "Si è svampato il server",
    "Boh, che hai fatto?"
  );
};

const crazyError = () => {
  throwError(418, "Crazy Error", "Mamma mia!");
};

const crazyFunction = () => {
  const myNum = Math.random();
  if (myNum > 0.5) {
    return myNum;
  } else {
    crazyError();
  }
};

export {
  throwError,
  genericError,
  notFoundError,
  crazyFunction,
};
