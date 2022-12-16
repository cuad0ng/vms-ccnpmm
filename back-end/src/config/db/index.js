const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connect MongoDB Successfully");
  } catch (error) {
    console.log("Connect MongoDB Failed");
  }
}

module.exports = { connect };
