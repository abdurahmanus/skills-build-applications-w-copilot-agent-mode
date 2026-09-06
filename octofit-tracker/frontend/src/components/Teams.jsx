import { useEffect, useState } from 'react'
import { getRecords } from '../api.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getRecords('teams', teamsEndpoint).then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><span className="kicker">Octofit / community</span><h1>Teams</h1><p>Find the people who make showing up easier.</p></div>{error && <div className="error-state">{error}. Check the API connection and try again.</div>}<div className="card-grid">{teams.map((team) => <article className="data-card" key={team._id || team.id}><span className="card-number">TEAM</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A team with momentum.'}</p><small>{team.memberIds?.length || 0} members</small></article>)}{!teams.length && !error && <div className="empty-state">No teams created yet.</div>}</div></section>
}
export default Teams