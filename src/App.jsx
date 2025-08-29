import "./App.css";
import GanttChart from "./components/GanttChart";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-t from-primary-blue/20 to-background-page">
      <header className="p-4 pl-8">
        <img src="/logo.svg" alt="Clayverest" className="h-10" />
      </header>

      <main className="relative z-10 flex-1 px-8 py-4">
        <GanttChart />
      </main>

      <footer className="relative w-full h-0">
        <img
          src="/Everest_Gris.svg"
          alt="Montagne"
          className="fixed -bottom-40 left-0 w-full object-cover opacity-50 z-0 pointer-events-none"
        />
      </footer>
    </div>
  );
}

export default App;
