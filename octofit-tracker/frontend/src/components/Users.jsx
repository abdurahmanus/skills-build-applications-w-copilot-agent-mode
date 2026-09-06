import { useEffect, useState } from 'react'
import { getRecords } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getRecords('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><span className="kicker">Octofit / people</span><h1>Users</h1><p>The people behind the progress.</p></div>{error && <div className="error-state">{error}. Check the API connection and try again.</div>}<div className="record-list">{users.map((user) => <article className="record-row user-row" key={user._id || user.id}><div className="avatar">{(user.displayName || user.username || '?')[0].toUpperCase()}</div><div className="user-details"><strong>{user.displayName || user.username || 'Unnamed user'}</strong><span>{user.email || 'No email provided'}</span></div><span className="handle">@{user.username || 'athlete'}</span></article>)}{!users.length && !error && <div className="empty-state">No users registered yet.</div>}</div></section>
}
export default Users