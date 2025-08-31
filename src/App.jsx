import { useState } from "react";
import "./App.css";
import GanttChart from "./components/GanttChart";
import Dropdown from "./components/Dropdown";
import Toast from "./components/Toast";
import { useEffect } from "react";
import { persons, taskTypes, statuses, tasks } from "./data/tasks";

function App() {
  const [assignedToFilter, setAssignedToFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const resetFilters = () => {
    setAssignedToFilter([]);
    setStatusFilter([]);
    setTypeFilter([]);
  };

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTaskList(JSON.parse(stored));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTaskList(tasks);
    }
  }, []);

  const handleAddOrUpdateTask = (newTask) => {
    if (newTask.action === "delete") {
      setTaskList((prev) => {
        const updated = prev.filter((t) => t.id !== newTask.id);
        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
    } else if (newTask.action === "replaceAll") {
      // cas où on a passé la liste entière déjà mise à jour
      setTaskList(newTask.tasks);
      localStorage.setItem("tasks", JSON.stringify(newTask.tasks));
    } else {
      setTaskList((prev) => {
        const exists = prev.some((t) => t.id === newTask.id);
        let updated;
        if (exists) {
          updated = prev.map((t) =>
            t.id === newTask.id ? { ...t, ...newTask } : t
          );
        } else {
          updated = [...prev, newTask];
        }
        updated = updated.sort((a, b) => new Date(a.start) - new Date(b.start));
        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-t from-primary-blue/20 to-background-page">
        <header className="p-4 pl-8">
          <img src="/logo.svg" alt="Clayverest" className="h-10" />
        </header>

        <main className="relative z-10 flex-1 px-8 py-4">
          <div className="flex gap-4 mb-6 justify-end">
            <button
              onClick={resetFilters}
              className="px-3 py-1 rounded-md bg-primary-turquoise shadow text-white hover:bg-primary-orange font-semibold"
            >
              Réinitialiser
            </button>

            <Dropdown
              label="Filtrer par personne"
              options={persons}
              value={assignedToFilter}
              onChange={setAssignedToFilter}
            />

            <Dropdown
              label="Filtrer par statut"
              options={statuses}
              value={statusFilter}
              onChange={setStatusFilter}
            />

            <Dropdown
              label="Filtrer par type"
              options={taskTypes}
              value={typeFilter}
              onChange={setTypeFilter}
            />
          </div>

          <GanttChart
            tasks={taskList}
            assignedToFilter={assignedToFilter}
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            onAddTask={handleAddOrUpdateTask}
          />
        </main>

        <footer className="relative w-full h-0">
          <img
            src="/Everest_Gris.svg"
            alt="Montagne"
            className="fixed -bottom-40 left-0 w-full object-cover opacity-50 z-0 pointer-events-none"
          />
        </footer>
      </div>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}

export default App;
