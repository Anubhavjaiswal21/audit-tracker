import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockUsers from "../data/mockUsers";
import fileToBase64 from "../utils/fileToBase64";

export default function ObservationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "Medium",
    assignedTo: "",
    file: null,
    filePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setForm((prev) => ({
        ...prev,
        file: base64,
        filePreview: file.name,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("observations") || "[]");

    const newObservation = {
      id: Date.now(),
      ...form,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("observations", JSON.stringify([...existing, newObservation]));
    navigate("/observations");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold">Create Observation</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        rows={4}
        required
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label>Severity</label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="flex-1">
          <label>Assign To</label>
          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select User --</option>
            {mockUsers.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Upload File (optional)</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="block mt-1"
        />
        {form.filePreview && (
          <p className="text-sm text-green-600 mt-1">Attached: {form.filePreview}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
