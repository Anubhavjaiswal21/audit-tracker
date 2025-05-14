import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ObservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("observations") || "[]");
    const found = stored.find((obs) => obs.id === Number(id));
    if (found) {
      setObservation(found);
    } else {
      navigate("/observations");
    }
  }, [id, navigate]);

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    const updatedObs = { ...observation, status: updatedStatus };

    const all = JSON.parse(localStorage.getItem("observations") || "[]");
    const updatedList = all.map((obs) => (obs.id === updatedObs.id ? updatedObs : obs));
    localStorage.setItem("observations", JSON.stringify(updatedList));

    setObservation(updatedObs);
  };

  if (!observation) return null;

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">{observation.title}</h2>
      <p><strong>Description:</strong> {observation.description}</p>
      <p><strong>Severity:</strong> {observation.severity}</p>
      <p><strong>Assigned To:</strong> {observation.assignedTo}</p>

      <div>
        <label className="font-semibold">Status:</label>
        <select
          value={observation.status}
          onChange={handleStatusChange}
          className="ml-2 border px-3 py-1 rounded"
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>

      {observation.file && (
        <div className="mt-4">
          <p className="font-semibold">Attached File:</p>
          {observation.file.startsWith("data:application/pdf") ? (
            <a href={observation.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Open PDF
            </a>
          ) : (
            <img src={observation.file} alt="Uploaded Preview" className="mt-2 max-w-sm rounded shadow" />
          )}
        </div>
      )}

      <button
        onClick={() => navigate("/observations")}
        className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back to List
      </button>
    </div>
  );
}
