import { useState } from "react";
import styled from "styled-components";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

const Verify = styled.div`
  background-color: ${({ theme }) => theme.colors?.background?.primary || "#fff"};
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;

  label {
    color: ${({ theme }) => theme.colors?.text?.tertiary || "#555"};
    font-weight: 600;
  }

  input {
    height: 48px;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors?.text?.primary || "#000"};
  }

  button {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 6px;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

const VerificationPage = () => {
  const [serial, setSerial] = useState("");
  const [showQRReader, setShowQRReader] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    if (serial.trim() === "") {
      alert("Please enter a serial number or scan the QR code.");
      return;
    }
    navigate(`/verification/${serial.trim()}`);
  };

  const handleQRScan = (result) => {
  console.log("Scanned result:", result);
  if (result && !hasScanned) {
    const scannedText = result?.text || result?.data || "";
    console.log("Scanned text:", scannedText);
    if (scannedText) {
      setHasScanned(true);
      setSerial(scannedText.trim());
      navigate(`/verification/${scannedText.trim()}`);
    }
  }
};


  const handleQRError = (err) => {
    console.error("QR Scan Error:", err);
    alert("QR Scan failed. Please try again.");
  };

  return (
    <Verify>
      <h3 style={{ fontFamily: "Google Sans, sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#3b82f6" }}>
        Certificate Verification
      </h3>

      <label htmlFor="serial">Enter Serial Number</label>
      <input
        id="serial"
        type="text"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        placeholder="e.g., GDG-IT23A06"
      />

      <button onClick={handleVerify}>Verify Now</button>

      {/* <button
      
        onClick={() => {
          setHasScanned(false); 
          setShowQRReader(!showQRReader);
        }}
        
      >
        {showQRReader ? "Close QR Scanner" : "Scan QR Code"}
      </button> */}
      <button
    disabled
    onClick={() => {
      setHasScanned(false);
      setShowQRReader(!showQRReader);
    }}
    style={{
      backgroundColor: "#ccc",
      color: "#666",
      border: "1px solid #aaa",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "not-allowed",
      fontWeight: "bold",
      opacity: 0.6,
      position: "relative",
    }}
  >
    {showQRReader ? "Close QR Scanner" : "Scan QR Code"}
  </button>

      {showQRReader && (
        <div style={{ marginTop: "1rem", width: "100%", maxWidth: "350px" }}>
          <QrScanner
            delay={300}
            onError={handleQRError}
            onScan={handleQRScan}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </Verify>
  );
};

export default VerificationPage;
