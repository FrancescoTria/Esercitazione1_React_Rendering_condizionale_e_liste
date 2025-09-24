import { useMemo, useState } from "react";
import { LoginMessage } from "./components/LoginMessage";
import { ProductList } from "./components/ProductList";

// Tipi utili
type Streamer = { id: number; nome: string; categoria: string };
type NavItem = { id: string; label: string; href: string };
type Prodotto = { id: number; nome: string; categoria: string; prezzo: number };

export default function App() {
  // --------------------------
  // Esercizio 1 – Messaggio di login
  // --------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --------------------------
  // Esercizio 2 – Lista di streamer
  // --------------------------
  const inizialeStreamers: Streamer[] = [
    { id: 1, nome: "Valkyrae", categoria: "Gaming" },
    { id: 2, nome: "xQc", categoria: "Varietà" },
    { id: 3, nome: "MoonMoon", categoria: "Gaming" },
  ];
  const [streamers, setStreamers] = useState<Streamer[]>(inizialeStreamers);

  // --------------------------
  // Esercizio 4 – Navbar attiva
  // --------------------------
  const voci: NavItem[] = [
    { id: "home", label: "Home", href: "#home" },
    { id: "scopri", label: "Scopri", href: "#scopri" },
    { id: "profilo", label: "Profilo", href: "#profilo" },
  ];
  const [activeId, setActiveId] = useState<string>(voci[0].id);

  // --------------------------
  // Esercizio 5 – Filtri su lista prodotti
  // --------------------------
  const prodotti: Prodotto[] = [
    { id: 1, nome: 'Laptop 14"', categoria: "Informatica", prezzo: 799.99 },
    { id: 2, nome: "Cuffie BT", categoria: "Audio", prezzo: 59.9 },
    { id: 3, nome: "Mouse", categoria: "Informatica", prezzo: 19.99 },
    { id: 4, nome: "Soundbar", categoria: "Audio", prezzo: 129.0 },
    { id: 5, nome: "Frullatore", categoria: "Casa", prezzo: 39.5 },
  ];
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("tutte");
  const categorie = useMemo(
    () => Array.from(new Set(prodotti.map((p) => p.categoria))),
    [prodotti]
  );
  const prodottiFiltrati = useMemo(
    () =>
      categoriaFiltro === "tutte"
        ? prodotti
        : prodotti.filter((p) => p.categoria === categoriaFiltro),
    [categoriaFiltro, prodotti]
  );

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 16,
        lineHeight: 1.4,
      }}
    >
      <h1>Corso React – Giorno 4</h1>

      {/* =========================
          Esercizio 1 – Messaggio di login
         ========================= */}
      <section style={{ marginTop: 24 }}>
        <h2>Esercizio 1 – Messaggio di login</h2>
        <LoginMessage isLoggedIn={isLoggedIn} />
        <div style={{ marginTop: 8 }}>
          {/* Il toggle non è richiesto dall’esercizio, ma aiuta a verificare il comportamento */}
          <button onClick={() => setIsLoggedIn((v) => !v)}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </section>

      {/* =========================
          Esercizio 2 – Lista di streamer
         ========================= */}
      <section style={{ marginTop: 24 }}>
        <h2>Esercizio 2 – Lista di streamer</h2>

        {streamers.length === 0 ? (
          <p>Nessuno streamer disponibile</p>
        ) : (
          <ul>
            {streamers.map((s) => (
              <li key={s.id}>
                {s.nome} — <i>{s.categoria}</i>
              </li>
            ))}
          </ul>
        )}

        {/* Tasti comodi per test: non richiesti dalla consegna */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setStreamers([])}>Svuota lista</button>
          <button onClick={() => setStreamers(inizialeStreamers)}>
            Ripristina
          </button>
        </div>
      </section>

      {/* =========================
          Esercizio 3 – Stato di caricamento
         ========================= */}
      <section style={{ marginTop: 24 }}>
        <h2>Esercizio 3 – Stato di caricamento</h2>
        <ProductList />
      </section>

      {/* =========================
          Esercizio 4 – Navbar attiva
         ========================= */}
      <section style={{ marginTop: 24 }}>
        <h2>Esercizio 4 – Navbar attiva</h2>
        <nav>
          <ul className="navbar">
            {voci.map((v) => (
              <li key={v.id}>
                <a
                  href={v.href}
                  className={activeId === v.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveId(v.id);
                  }}
                >
                  {v.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p style={{ marginTop: 8 }}>
          Voce attiva: <b>{activeId}</b>
        </p>
      </section>

      {/* =========================
          Esercizio 5 – Filtri su lista prodotti
         ========================= */}
      <section style={{ marginTop: 24 }}>
        <h2>Esercizio 5 – Filtri su lista prodotti</h2>
        <label htmlFor="categoria">Categoria:</label>{" "}
        <select
          id="categoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="tutte">Tutte</option>
          {categorie.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <ul style={{ marginTop: 8 }}>
          {prodottiFiltrati.map((p) => (
            <li key={p.id}>
              {p.nome} — <i>{p.categoria}</i> — €{p.prezzo.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
