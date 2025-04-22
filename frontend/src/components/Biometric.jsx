// EncryptComponent.jsx
import React, { useState } from "react";
import { encryptFingerprint, decryptFingerprint } from "../utils/api";

function Biometric() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [decrypted, setDecrypted] = useState("");

  const handleEncrypt = async () => {
    try {
      const res = await encryptFingerprint(file, text);
      setResult(res);
    } catch (err) {
      console.log(err);
      alert("Encryption failed");
    }
  };

  const handleDecrypt = async () => {
    try {
      const res = await decryptFingerprint(result.encrypted_data, result.key);
      setDecrypted(res.decrypted_data);
    } catch (err) {
      console.log(err);
      alert("Decryption failed");
    }
  };

  return (
    <div>
      <h2>Encrypt Data</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt</button>

      {result && (
        <div>
          <p>
            <strong>Encrypted:</strong> {result.encrypted_data}
          </p>
          <p>
            <strong>Key:</strong> {result.key}
          </p>
          <button onClick={handleDecrypt}>Decrypt</button>
        </div>
      )}

      {decrypted && (
        <p>
          <strong>Decrypted:</strong> {decrypted}
        </p>
      )}
    </div>
  );
}

export default Biometric;
