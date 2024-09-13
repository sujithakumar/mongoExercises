import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";

// Load environment variables from the .env file, where the connectionString is configured
dotenv.config();

const { connectionString } = process.env;

if (!connectionString) {
    console.error("No connectionString environment variable has been defined in .env");
    process.exit(1);
} else {
    connectToDatabase(connectionString).then(() => {
        const app = express();
        app.use(cors());

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server started!!!`);
        });
    }).catch((error) => console.error(error));
}

