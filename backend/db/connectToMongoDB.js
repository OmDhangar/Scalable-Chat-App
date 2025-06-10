import mongoose from "mongoose";
import dotenv from"dotenv";

dotenv.config();

const connectToMongoDB = async () => {
	const MongoDB = process.env.MONGO_DB_URI ;
	
	try {
		await mongoose.connect(`${MongoDB}/ChatApp`);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
