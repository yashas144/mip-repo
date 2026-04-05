const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

export async function sendChatMessage(message) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    // ignore JSON parse issue
  }

  if (!response.ok) {
    throw new Error(data?.detail || "Failed to fetch recommendations");
  }

  return data;
}