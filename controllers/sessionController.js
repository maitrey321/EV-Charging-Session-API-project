const Session = require("../models/sessions");

// Start Session
const startSession = async(req,res)=>{
try{

const {sessionId,meterReading}=req.body;
if(!sessionId){

return res.status(400).json({

message:"Session ID is required"

});}

if(meterReading<0){

return res.status(400).json({

message:"Meter reading cannot be negative"

});}

if(meterReading == null){

return res.status(400).json({

message:"Meter reading required"

});}
const existingSession = await Session.findOne({sessionId});

if(existingSession){

return res.status(400).json({

message:"Session already exists",

sessionId:sessionId,

hint:"Use a different Session ID"

});}

const session= await Session.create({sessionId,meterReadings:[meterReading]});

res.status(201).json({

message:"Session Started",

session

});}

catch(error){

res.status(500).json({

message:error.message
});
}};

// Update Reading
const updateReading=async(req,res)=>{

try{

const {sessionId,meterReading}=req.body;

if(!sessionId){

return res.status(400).json({

message:"Session ID is required"

});}
if(meterReading == null){

return res.status(400).json({

message:"Meter reading required",

requiredField:"meterReading"

});}
if(meterReading<0){

return res.status(400).json({

message:"Meter reading cannot be negative"

});}

const session=await Session.findOne({sessionId});

if(!session){

return res.status(404).json({

message:"Session not found",

requestedSessionId:sessionId,

hint:"Please check session ID or start a new session",

status:"failed"

});}

const lastReading= session.meterReadings[session.meterReadings.length-1];

if(meterReading <= lastReading){

return res.status(400).json({

message:"Reading must increase",

currentReading:lastReading,

enteredReading:meterReading,

hint:`Reading should be greater than ${lastReading}`

});}

session.meterReadings.push(meterReading);
await session.save();

res.status(200).json({

message:"Reading Updated",
currentReading : meterReading,
allReadings:session.meterReadings
});}

catch(error){

res.status(500).json({

message:error.message

});
}};

// Stop Session
const stopSession=async(req,res)=>{

try{

const {sessionId}=req.body;
if(!sessionId){
    
if(session.stopTimestamp){

return res.status(400).json({

message:"Session already stopped",

sessionId:sessionId

});}
return res.status(400).json({

message:"Session ID is required"

});}
const session=await Session.findOne({sessionId});

if(!session){

return res.status(404).json({

message:"Session not found"

});}

session.stopTimestamp=Date.now();
await session.save();

res.status(200).json({

message:"Session stopped successfully",

sessionId:session.sessionId,

startTime:session.startTimestamp,

stopTime:session.stopTimestamp,

totalReadings:session.meterReadings.length

});}

catch(error){

res.status(500).json({

message:error.message

});
}};

// old sessions
const getSession = async(req,res)=>{
try{

const session = await Session.findOne({sessionId:req.params.id});

if(!session){

return res.status(404).json({

message:"Session not found"

});}

res.status(200).json({

message:"Session data found",

session

});
}

catch(error){

res.status(500).json({

message:error.message
});
}};
module.exports={startSession,updateReading,stopSession,getSession};