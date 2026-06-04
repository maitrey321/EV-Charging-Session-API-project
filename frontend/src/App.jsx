import { useState } from "react";

function App() {
  //HTTP status codes
  const [startStatus, setStartStatus] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [stopStatus, setStopStatus] = useState(null);
  const [getStatus, setGetStatus] = useState(null);
  // get data 
  const [startData, setStartData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [stopData, setStopData] = useState(null);
  //  start session 
  const [sessionId, setSessionId] = useState("");
  const [meterReading, setMeterReading] = useState("");
  // get session
  const [searchSessionId, setSearchSessionId] = useState("");
  const [sessionDetails, setSessionDetails] = useState(null);
  // update session
  const [updateSessionId, setUpdateSessionId] = useState("");
  const [newReading, setNewReading] = useState("");
  // Stop session
  const [stopSessionId, setStopSessionId] = useState("");

  // =========start session ===========
  const startSessions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/session/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sessionId, meterReading: Number(meterReading)
          })
        });
      console.log("Status Code:", response.status);
      console.log("Is Success:", response.ok);
      const data = await response.json();
      setStartStatus(response.status);
      setStartData(data);
      setSessionId("");
      setMeterReading("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============Update session============
  const updateReading = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/session/update",
        {
          method: "PUT", headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sessionId: updateSessionId, meterReading: Number(newReading)
          })
        });
      console.log("Status Code:", response.status);
      console.log("Is Success:", response.ok);
      const data = await response.json();
      setUpdateStatus(response.status);
      setUpdateData(data);
      setUpdateSessionId("");
      setNewReading("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //==========Stop session===============
  const stopSession = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/session/stop",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sessionId: stopSessionId
          })
        });
      console.log("Status Code:", response.status);
      console.log("Is Success:", response.ok);
      const data = await response.json();
      setStopStatus(response.status);
      setStopData(data);
      setStopSessionId("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==============View session============= 
  const getSessionDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/session/${searchSessionId}`
      );
      console.log("Status Code:", response.status);
      console.log("Is Success:", response.ok);
      const data = await response.json();
      setGetStatus(response.status);
      console.log(data);
      setSessionDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>EV Charging Session Management</h1>

      {/*======== start session======== */}
      <div className="section">
        <h2>Start Session</h2>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)} />

        <br /><br />

        <input
          type="number"
          placeholder="Enter Meter Reading"
          value={meterReading}
          onChange={(e) => setMeterReading(e.target.value)} />

        <br /><br />

        <button onClick={startSessions}> Start Session </button>
        {startData && (
          <div className="result-box">
            <h3>Status Code: {startStatus}</h3>
            <h3>{startData.message}</h3>
            <p>Session ID: {startData.session.sessionId}</p>
            <p> Meter Reading: {startData.session.meterReadings.join(", ")} </p>
            <p> Start Time: {startData.session.startTimestamp} </p>
          </div>
        )}
      </div>

      <hr />

      {/*=======Update session======== */}
      <div className="section">
        <h2>Update Reading</h2>
        <input
          type="text"
          placeholder="Session ID"
          value={updateSessionId}
          onChange={(e) => setUpdateSessionId(e.target.value)} />

        <br /><br />

        <input
          type="number"
          placeholder="New Meter Reading"
          value={newReading}
          onChange={(e) => setNewReading(e.target.value)} />

        <br /><br />

        <button onClick={updateReading}> Update Reading  </button>
        {updateData && (
          <div className="result-box">
            <h3>Status Code: {updateStatus}</h3>
            <h3>{updateData.message}</h3>
            <p>Session ID: {updateSessionId}</p>
            <p>Current Reading:  {updateData.currentReading}  </p>
            <p>  All Readings:  {updateData.allReadings.join(", ")} </p>
          </div>
        )}
      </div>

      <hr />

      {/* =========stop session========= */}
      <div className="section">
        <h2>Stop Session</h2>
        <input
          type="text"
          placeholder="Session ID"
          value={stopSessionId}
          onChange={(e) => setStopSessionId(e.target.value)} />

        <br /><br />

        <button onClick={stopSession}>
          Stop Session
        </button>
        {stopData && (
          <div className="result-box">
            <h3>Status Code: {stopStatus}</h3>
            <h3>{stopData.message}</h3>
            <p>  Session ID:   {stopData.sessionId} </p>
            <p>  Start Time:  {stopData.startTime}</p>
            <p> Stop Time: {stopData.stopTime}</p>
            <p>  Total Readings: {stopData.totalReadings}</p>
          </div>
           )}
         </div>

      <hr />

      {/* ========view session========== */}
      <div className="section">
      <h2>View Session Details</h2>
      <input
        type="text"
        placeholder="Session ID"
        value={searchSessionId}
        onChange={(e) => setSearchSessionId(e.target.value)} />

      <br /><br />

      <button onClick={getSessionDetails}>
        Get Details
      </button>
      {sessionDetails && sessionDetails.session && (
        <div className="result-box">
          <h3>Status Code: {getStatus}</h3>
          <h3>{sessionDetails.message}</h3>
          <p> Session ID:  {sessionDetails.session.sessionId} </p>
          <p> Meter Readings: {sessionDetails.session.meterReadings.join(", ")}  </p>
          <p> Start Time:  {sessionDetails.session.startTimestamp} </p>
          <p> Stop Time: {sessionDetails.session.stopTimestamp || "Not Stopped Yet"}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;