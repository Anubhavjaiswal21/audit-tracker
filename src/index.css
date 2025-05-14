import { Routes, Route, Navigate } from "react-router-dom";
import ObservationList from "./components/ObservationList";
import ObservationForm from "./components/ObservationForm";
import ObservationDetails from "./components/ObservationDetails";

export default function App() {
  return (
    <div className="min-h-screen p-4 bg-slate-700">
      <h1 className="text-2xl font-bold mb-4 text-center">Mini Audit Tracker</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/observations" />} />
        <Route path="/observations" element={<ObservationList />} />
        <Route path="/observations/new" element={<ObservationForm />} />
        <Route path="/observations/:id" element={<ObservationDetails />} />
      </Routes>
    </div>
  );
}
