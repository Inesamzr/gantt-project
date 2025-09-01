import { useState } from "react";
import Dropdown from "../components/Dropdown";
import GanttChart from "../components/GanttChart";
import Toast from "../components/Toast";
import { persons, taskTypes, statuses } from "../data/tasks";
import useTasks from "../hooks/useTasks";

function Dashboard() {
  const [assignedToFilter, setAssignedToFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const { taskList, handleAddOrUpdateTask } = useTasks(showToast);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  }

  const resetFilters = () => {
    setAssignedToFilter([]);
    setStatusFilter([]);
    setTypeFilter([]);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-t from-primary-blue/20 to-background-page">
        {/* Header */}
        <header className="p-4 pl-8">
          <img src="/logo.svg" alt="Clayverest" className="h-10" />
        </header>

        {/* Main */}
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

        {/* Footer */}
        <footer className="relative w-full h-0">
          <img
            src="/Everest_Gris.svg"
            alt="Montagne"
            className="fixed -bottom-40 left-0 w-full object-cover opacity-50 z-0 pointer-events-none"
          />
        </footer>
      </div>

      {/* Toast notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}

export default Dashboard;
