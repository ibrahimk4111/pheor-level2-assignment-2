import app from "./app";
import { config } from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose
      .connect(config.db_url as string)
      .then(() => console.log("mongoose connected"));
    app.listen(config.port, () => {
      console.log(`server is in http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
