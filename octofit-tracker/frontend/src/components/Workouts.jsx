import { useEffect, useState } from 'react'
import { getRecords } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getRecords('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><span className="kicker">Octofit / library</span><h1>Workouts</h1><p>Good sessions start with a clear plan.</p></div>{error && <div className="error-state">{error}. Check the API connection and try again.</div>}<div className="card-grid">{workouts.map((workout) => <article className="data-card" key={workout._id || workout.id}><span className="difficulty">{workout.difficulty || 'all levels'}</span><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your next move.'}</p><small>{workout.durationMinutes || 0} minutes</small></article>)}{!workouts.length && !error && <div className="empty-state">No workouts available yet.</div>}</div></section>
}
export default Workouts