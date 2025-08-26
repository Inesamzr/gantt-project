import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#DEE5EC] overflow-x-hidden">
      {/* Header avec logo */}
      <header className="p-4 pl-8">
        <img src="/logo.svg" alt="Clayverest" className="h-10" />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 px-8 py-4"></main>

      {/* Pied de page avec montagne */}
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
