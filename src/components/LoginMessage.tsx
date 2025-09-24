// Esercizio 1 – Messaggio di login
// Componente che riceve isLoggedIn e mostra un messaggio usando l'operatore ternario.

type LoginMessageProps = {
  isLoggedIn: boolean;
};

export function LoginMessage({ isLoggedIn }: LoginMessageProps) {
  return <p>{isLoggedIn ? "Bentornato utente!" : "Effettua il login"}</p>;
}
