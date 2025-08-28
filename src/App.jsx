import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-t from-primary-blue/20 to-background-page">
      <header className="p-4 pl-8">
        <img src="/logo.svg" alt="Clayverest" className="h-10" />
      </header>

      <main className="flex-1 px-8 py-4"></main>

      <footer className="relative w-full">
        <img
          src="/Everest_Gris.svg"
          alt="Montagne"
          className="absolute bottom-0 left-0 w-full object-cover opacity-50"
        />
      </footer>
    </div>
  );
}

export default App;
