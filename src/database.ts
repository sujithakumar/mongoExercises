import * as mongodb from "mongodb";
import { Student } from "./student";

const collections: {
    students?: mongodb.Collection<Student>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("studentsDB");
    await createDB(db);

    const studentsCollection = db.collection<Student>("students");
    collections.students = studentsCollection;
}

async function createDB(db: mongodb.Db) {
    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "students",
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("students");
        }
    });
  
}