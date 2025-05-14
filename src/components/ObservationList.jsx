import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ObservationList() {
  const [observations, setObservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("observations") || "[]");
    setObservations(
      stored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, []);

  const filtered = observations.filter((obs) => {
    return (
      (!filterStatus || obs.status === filterStatus) &&
      (!filterSeverity || obs.severity === filterSeverity)
    );
  });

  // ✅ Chart Data
  const statusCounts = ["Open", "In Progress", "Closed"].map((status) => ({
    status,
    count: observations.filter((obs) => obs.status === status).length,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Observations</h2>
        <Link
          to="/observations/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Observation
        </Link>
      </div>

      {/* ✅ Bar Chart */}
      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Status Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>

        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Severities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((obs) => (
                <tr key={obs.id} className="border-t">
                  <td className="p-3">{obs.title}</td>
                  <td className="p-3">{obs.severity}</td>
                  <td className="p-3">{obs.status}</td>
                  <td className="p-3">{obs.assignedTo}</td>
                  <td className="p-3">
                    <Link
                      to={`/observations/${obs.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No observations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
