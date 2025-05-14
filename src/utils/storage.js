const STORAGE_KEY = "observations";

export function getObservations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveObservations(observations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
}

export function getObservationById(id) {
  return getObservations().find((obs) => obs.id === id);
}

export function updateObservation(updatedObs) {
  const all = getObservations().map((obs) =>
    obs.id === updatedObs.id ? updatedObs : obs
  );
  saveObservations(all);
}

export function addObservation(newObs) {
  const all = getObservations();
  all.push(newObs);
  saveObservations(all);
}
