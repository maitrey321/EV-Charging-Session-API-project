const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    sessionId:{
        type:String,
        required:true,
        unique:true
    },
    startTimestamp:{
        type:Date,
        default:Date.now
    },
    stopTimestamp:{
        type:Date
    },
    meterReadings:{
        type:[Number]
    },
});

module.exports = mongoose.model("Session",sessionSchema);