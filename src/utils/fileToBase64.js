import { useState } from "react";

export default function FileUploader({ onUpload, initialFile }) {
  const [preview, setPreview] = useState(initialFile || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onUpload(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Uploaded Preview"
          className="mt-2 max-h-48 rounded border"
        />
      )}
    </div>
  );
}
