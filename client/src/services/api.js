export async function startGame(data) {
  const response = await fetch("/api/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
