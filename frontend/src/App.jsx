import { useState } from "react";

function App() {
  const API_URL = "https://ev-charging-api-vl4q.onrender.com";
  //HTTP status codes
  const [startStatus, setStartStatus] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [stopStatus, setStopStatus] = useState(null);
  const [getStatus, setGetStatus] = useState(null);
  //Error 
  const [startError, setStartError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [stopError, setStopError] = useState("");
  const [getError, setGetError] = useState("");
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
        `${API_URL}/api/session/start`,
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
      if (!response.ok) {
        setStartError(data.message);
        setStartData(null);
        setUpdateData(null);
        setStopData(null);
        setSessionDetails(null);
        return;
      }
      setStartError("");
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
        `${API_URL}/api/session/update`,
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
      if (!response.ok) {
        setUpdateError(data.message);
        setStartData(null);
        setUpdateData(null);
        setStopData(null);
        setSessionDetails(null);
        return;
      }
      setUpdateError("");
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
        `${API_URL}/api/session/stop`,
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
      if (!response.ok) {
        setStopError(data.message);
        setStartData(null);
        setUpdateData(null);
        setStopData(null);
        setSessionDetails(null);
        return;
      }
      setStopError("");
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
        `${API_URL}/api/session/${searchSessionId}`
      );
      console.log("Status Code:", response.status);
      console.log("Is Success:", response.ok);
      const data = await response.json();
      if (!response.ok) {
        setGetError(data.message);
        setStartData(null);
        setUpdateData(null);
        setStopData(null);
        setSessionDetails(null);
        return;
      }
      setGetError("");
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
        {/* Error message box */}
        {startError && (
          <div className="error-box">
            {startError}
          </div>
        )}
        {startData && (
          <div className="result-box">
            <h3>Status Code: {startStatus}</h3>
            <h3>{startData.message}</h3>
            <p>Session ID: {startData.session.sessionId}</p>
            <p> Meter Reading: {startData.session.meterReadings.join(", ")} </p>
            <p> Start Date:{new Date(startData.session.startTimestamp).toLocaleDateString()}</p>
            <p> Start Time: {new Date(startData.session.startTimestamp).toLocaleTimeString()}</p>
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
        {/* Error message box */}
        {updateError && (
          <div className="error-box">
            {updateError}
          </div>
        )}
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

        <button onClick={stopSession}>  Stop Session </button>
        {/* Error message box */}
        {stopError && (
          <div className="error-box">
            {stopError}
          </div>
        )}
        {stopData && (
          <div className="result-box">
            <h3>Status Code: {stopStatus}</h3>
            <h3>{stopData.message}</h3>
            <p>  Session ID:   {stopData.sessionId} </p>
            <p>Start Date:{new Date(stopData.startTime).toLocaleDateString()}</p>
            <p> Start Time:{new Date(stopData.startTime).toLocaleTimeString()}</p>
            <p>Stop Date:{new Date(stopData.stopTime).toLocaleDateString()}</p>
            <p> Stop Time: {new Date(stopData.stopTime).toLocaleTimeString()} </p>
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

        <button onClick={getSessionDetails}>  Get Details </button>
        {/* Error message box */}
        {getError && (
          <div className="error-box">
            {getError}
          </div>
        )}
        {sessionDetails && sessionDetails.session && (
          <div className="result-box">
            <h3>Status Code: {getStatus}</h3>
            <h3>{sessionDetails.message}</h3>
            <p> Session ID:  {sessionDetails.session.sessionId} </p>
            <p> Meter Readings: {sessionDetails.session.meterReadings.join(", ")}  </p>
            <p>Start Date: {new Date(sessionDetails.session.startTimestamp).toLocaleDateString()} </p>
            <p>Start Time: {new Date(sessionDetails.session.startTimestamp).toLocaleTimeString()} </p>
            <p> Stop Date:{sessionDetails.session.stopTimestamp ? new Date(sessionDetails.session.stopTimestamp).toLocaleDateString() : "NoStopped Yet"}</p>
            <p> Stop Time: {sessionDetails.session.stopTimestamp ? new Date(sessionDetails.session.stopTimestamp).toLocaleTimeString() : "NoStopped Yet"}</p>
          </div>
        )}
      </div></div>
  );
}

export default App;