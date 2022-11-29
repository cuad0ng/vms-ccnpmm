const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://cuadong01012001:$o_Nic332177@vms-ccnpmm.y1udpu1.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connect MongoDB Successfully");
  } catch (error) {
    console.log("Connect MongoDB Failed");
  }
}

module.exports = { connect };
