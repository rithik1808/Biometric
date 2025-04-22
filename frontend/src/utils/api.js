import axios from "axios";

const API_URL = "https://biometric-0lyo.onrender.com";

export async function encryptFingerprint(file, text) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("text", text);

  const response = await axios.post(`${API_URL}/encrypt`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log(response.data);
  return response.data;
}

export async function decryptFingerprint(encryptedData, key) {
  const response = await axios.post(`${API_URL}/decrypt`, {
    encrypted_data: encryptedData,
    key,
  });

  console.log(response.data);
  return response.data;
}
