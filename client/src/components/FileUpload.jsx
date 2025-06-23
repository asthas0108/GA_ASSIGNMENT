// === src/components/FileUpload.js ===
import { useState } from "react";
import axios from "axios";

export default function FileUpload({ dealId, token }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`http://localhost:5000/api/files/${dealId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}