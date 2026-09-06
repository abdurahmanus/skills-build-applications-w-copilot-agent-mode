const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const hasConfiguredApi = Boolean(codespaceName)
export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export async function getRecords(resource) {
  const response = await fetch(`${apiOrigin}/api/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The API returned a non-JSON response. Check the API connection.')
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.docs)) return payload.docs
  return []
}

export function formatDate(value) {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value))
}