import mongoose from "mongoose";

const databaseUri = process.env.MONGODB_URI;

const databaseConnect = async () => {
  try {
    await mongoose.connect(databaseUri);
    console.log(
      "Connessione al database effettuata con successo"
    );
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnect;
