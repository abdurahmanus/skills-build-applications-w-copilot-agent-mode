import { useEffect, useState } from 'react'
import { getRecords } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getRecords('leaderboard', leaderboardEndpoint).then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><span className="kicker">Octofit / competition</span><h1>Leaderboard</h1><p>A little friendly pressure goes a long way.</p></div>{error && <div className="error-state">{error}. Check the API connection and try again.</div>}<div className="leaderboard-list">{entries.sort((a, b) => (a.rank || 999) - (b.rank || 999)).map((entry, index) => <article className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><strong>{entry.displayName || entry.username || entry.userId || 'Athlete'}</strong><b>{entry.points || 0} pts</b></article>)}{!entries.length && !error && <div className="empty-state">No leaderboard entries yet.</div>}</div></section>
}
export default Leaderboard