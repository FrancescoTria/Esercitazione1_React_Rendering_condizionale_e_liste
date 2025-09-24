// Esercizio 3 – Stato di caricamento
// Componente ProductList con stati: loading, error, success.

import { useState } from "react";

type Prodotto = { id: number; nome: string };

type Status = "loading" | "error" | "success";

export function ProductList() {
  // Esercizio 3 – gestione stati
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  // Dati di esempio da mostrare nello stato "success"
  const prodotti: Prodotto[] = [
    { id: 1, nome: "Mouse" },
    { id: 2, nome: "Tastiera" },
    { id: 3, nome: "Monitor" },
  ];

  function simula(st: Status) {
    setError(st === "error" ? "Qualcosa è andato storto." : null);
    setStatus(st);
  }

  return (
    <section>
      <h3>ProductList</h3>

      {/* Controlli per simulare gli stati (utili durante il corso) */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={() => simula("loading")}>loading</button>
        <button onClick={() => simula("error")}>error</button>
        <button onClick={() => simula("success")}>success</button>
      </div>

      {status === "loading" && <p>Caricamento...</p>}
      {status === "error" && <p>{error}</p>}
      {status === "success" && (
        <ul>
          {prodotti.map((p) => (
            <li key={p.id}>{p.nome}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
