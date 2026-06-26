// Fallback to relative path if the environment variable is blank or undefined
const API = import.meta.env.VITE_API_URL || '/api';

export async function generateRoute(payload) {
  // This will call 'http://localhost:8000/api/generate-route/' locally 
  // and '/api/generate-route/' on Vercel seamlessly
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
