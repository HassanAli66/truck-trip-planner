const API = import.meta.env.VITE_API_URL;

export async function generateRoute(payload) {
  const response = await fetch(`${API}/generate-route/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to generate route");
  }

  return response.json();
}
