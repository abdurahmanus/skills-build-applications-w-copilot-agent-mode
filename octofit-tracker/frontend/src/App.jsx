import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/">
            <span className="brand-mark">O</span>
            <span>Octofit</span>
          </NavLink>
          <span className="eyebrow">Team performance, made visible</span>
        </header>
        <div className="app-layout">
          <nav className="sidebar" aria-label="Primary navigation">
            <span className="nav-label">Workspace</span>
            <NavLink className="nav-link" to="/">Overview</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </nav>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </main>
        </div>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <div className="page-heading">
        <span className="kicker">Sunday, your team is ready</span>
        <h1>Move with purpose.</h1>
        <p>Track the work, celebrate the wins, and keep your team in motion.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-card feature-card" to="/activities">
          <span className="card-number">01</span>
          <strong>Log an activity</strong>
          <span>See every effort in one place.</span>
        </NavLink>
        <NavLink className="overview-card" to="/leaderboard">
          <span className="card-number">02</span>
          <strong>Check the leaderboard</strong>
          <span>Find your next small edge.</span>
        </NavLink>
        <NavLink className="overview-card" to="/workouts">
          <span className="card-number">03</span>
          <strong>Choose a workout</strong>
          <span>Build momentum for today.</span>
        </NavLink>
      </div>
    </section>
  )
}

export default App
