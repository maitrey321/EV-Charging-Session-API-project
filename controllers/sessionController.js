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

if(meterReading<0){

return res.status(400).json({

message:"Meter reading cannot be negative"

});}

const session=await Session.findOne({sessionId});

if(!session){

return res.status(404).json({

message:"Session not found"

});}

const lastReading= session.meterReadings[session.meterReadings.length-1];

if(meterReading<=lastReading){

return res.status(400).json({

message:"Reading must increase"

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

message:"Session stopped", session

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

res.status(200).json(session);

}

catch(error){

res.status(500).json({

message:error.message
});
}};
module.exports={startSession,updateReading,stopSession,getSession};