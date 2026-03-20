const API_BASE = import.meta.env.VITE_API_URL || ''

export async function chat(prompt) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  return res.json()
}
