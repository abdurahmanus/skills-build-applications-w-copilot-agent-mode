import { useEffect, useState } from 'react'
import { formatDate, getRecords } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getRecords('activities', activitiesEndpoint).then(setActivities).catch((reason) => setError(reason.message))
  }, [])

  return <ResourcePage title="Activities" intro="Every session counts." error={error}>
    <div className="record-list">
      {activities.map((activity) => <article className="record-row" key={activity._id || activity.id}>
        <div><strong>{activity.type || 'Activity'}</strong><span>{formatDate(activity.completedAt)}</span></div>
        <b>{activity.durationMinutes || 0} min</b><b>{activity.calories || 0} kcal</b>
      </article>)}
      {!activities.length && !error && <EmptyState text="No activities logged yet." />}
    </div>
  </ResourcePage>
}

function ResourcePage({ title, intro, error, children }) {
  return <section><div className="page-heading"><span className="kicker">Octofit / workspace</span><h1>{title}</h1><p>{intro}</p></div>{error && <ErrorState message={error} />}{children}</section>
}
function EmptyState({ text }) { return <div className="empty-state">{text}</div> }
function ErrorState({ message }) { return <div className="error-state">{message}. Check the API connection and try again.</div> }

export default Activities