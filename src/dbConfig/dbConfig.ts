const mongoose = require("mongoose");

const connect = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected succesfully");
    });
  } catch (error) {
    console.error(error);
  }
};

export default connect;
