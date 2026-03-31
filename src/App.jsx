import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, Bell, AlertTriangle, Users, Calendar, 
  BarChart2, Activity, LayoutDashboard, ChevronRight,
  TrendingDown, CheckCircle, XCircle, UserX, UserPlus,
  ShieldAlert, Settings, BookOpen
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

// --- MAIN LAYOUT COMPONENT --- //
function DashboardLayout({ children }) {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          Ashoka Office
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/student" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            Students
          </NavLink>
          <NavLink to="/clubs" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
             {/* Not a specified screen, routes to bias to show the system feature */}
            <Briefcase size={20} />
            Clubs
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Calendar size={20} />
            Events
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <BarChart2 size={20} />
            Feedback & Insights
          </NavLink>
          <div style={{marginTop: 'auto'}}></div>
          <NavLink to="/bias" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <ShieldAlert size={20} />
            System Analytics
          </NavLink>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input type="text" placeholder="Search student / club..." />
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button className="btn btn-outline" style={{border: 'none'}}>
              <Bell size={20} />
            </button>
            <div className="avatar" style={{width: '2rem', height: '2rem', fontSize: '1rem'}}>
              AJ
            </div>
          </div>
        </header>
        <div className="page-container flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

// Icon for clubs instead of missing import
const Briefcase = ({size}) => <BookOpen size={size} />;

// --- SCREEN 1: HOME DASHBOARD --- //
function HomeDashboard() {
  const activityData = [
    { name: 'Mon', active: 120 }, { name: 'Tue', active: 200 }, { name: 'Wed', active: 150 },
    { name: 'Thu', active: 300 }, { name: 'Fri', active: 250 }, { name: 'Sat', active: 80 }, { name: 'Sun', active: 95 }
  ];

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Office Control Center</h1>
          <p>From fragmented campus systems → to a single intelligent control center.</p>
        </div>
      </div>

      <div className="grid-cols-3">
        {/* Card 1 */}
        <div className="card">
          <div className="card-title">Org Catalog</div>
          <div className="stat-value">120+ Clubs</div>
          <p className="micro-copy mb-4">Across 600+ Positions</p>
          <button className="btn btn-outline" style={{width: '100%', marginTop: '1rem'}}>View Structure</button>
        </div>

        {/* Card 2 */}
        <div className="card">
          <div className="card-title">Student Overview</div>
          <div className="flex-between">
            <div>
              <div className="text-sm font-medium">Most Active</div>
              <div className="stat-value" style={{fontSize: '1.5rem', color: 'var(--success-color)'}}>42%</div>
            </div>
            <div>
              <div className="text-sm font-medium">Least Active</div>
              <div className="stat-value" style={{fontSize: '1.5rem', color: 'var(--danger-color)'}}>18%</div>
            </div>
          </div>
          <div style={{height: 60, marginTop: '1rem'}}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[{name: 'Active', val: 42}, {name: 'Mid', val: 40}, {name: 'Low', val: 18}]}>
                 <Bar dataKey="val" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <div className="card-title flex-between">
            Overlap Snapshot
            <span className="badge warning">High</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', position: 'relative'}}>
            {/* Fake Network Graph css */}
            <div style={{width: 12, height: 12, background: 'var(--accent-color)', borderRadius: '50%', position: 'absolute', top: 10, left: 40}}></div>
            <div style={{width: 16, height: 16, background: 'var(--danger-color)', borderRadius: '50%', position: 'absolute', top: 40, right: 30}}></div>
            <div style={{width: 20, height: 20, background: 'var(--warning-color)', borderRadius: '50%', position: 'absolute', bottom: 10, left: 60}}></div>
            <svg width="100%" height="100%" style={{position:'absolute'}}>
              <line x1="45" y1="15" x2="65" y2="70" stroke="var(--border-color)" strokeWidth="2"/>
              <line x1="160" y1="45" x2="75" y2="70" stroke="var(--border-color)" strokeWidth="2"/>
            </svg>
            <p className="micro-copy" style={{position: 'absolute', bottom: 0, right: 0}}>4 hubs isolated</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card">
          <div className="card-title">Event Activity</div>
          <div className="stat-value">32</div>
          <p className="micro-copy">Events this week</p>
          <div className="flex-between mt-2" style={{marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem'}}>
            <span className="text-sm">High clash days:</span>
            <span className="badge danger">3</span>
          </div>
        </div>

        {/* Card 5 Alert Panel */}
        <div className="card" style={{gridColumn: 'span 2'}}>
          <div className="card-title">Alerts & Notifications</div>
          <div className="alert-item warning">
            <AlertTriangle size={18} style={{flexShrink: 0, marginTop: '2px'}} />
            <div>
              <strong>⚠️ 12 students with 0 memberships</strong>
              <div className="micro-copy" style={{marginTop: '0.25rem'}}>Detected isolation risks in recent club induction cycle.</div>
            </div>
          </div>
          <div className="alert-item danger">
            <ShieldAlert size={18} style={{flexShrink: 0, marginTop: '2px'}} />
            <div>
              <strong>⚠️ High overlap detected</strong>
              <div className="micro-copy" style={{marginTop: '0.25rem'}}>Orators and Jazbaa share 65% of leadership positions.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- SCREEN 2: STUDENT PROFILE --- //
function StudentDetailedProfile() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Student Deep Dive</h1>
        <p>Full visibility into one student's campus journey.</p>
      </div>

      <div className="grid-cols-3" style={{gridTemplateColumns: '250px 1fr 300px'}}>
        
        {/* Left Profile */}
        <div className="card" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
           <div className="avatar" style={{width: '6rem', height: '6rem', fontSize: '2.5rem', marginBottom: '1rem'}}>
             IB
           </div>
           <h2>Name: Ibrahim</h2>
           <p className="micro-copy mb-4" style={{marginBottom: '1rem'}}>Year: 1</p>
           <span className="badge danger" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>Status: ⚠️ Low Engagement</span>
        </div>

        {/* Center Metrics */}
        <div className="card">
          <div className="card-title">Engagement Metrics</div>
          <div className="grid-cols-2" style={{gap: '1rem'}}>
             <div style={{padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.5rem'}}>
               <div className="micro-copy">Clubs Applied</div>
               <div className="stat-value" style={{fontSize: '1.5rem'}}>8</div>
             </div>
             <div style={{padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.5rem'}}>
               <div className="micro-copy">Accepted</div>
               <div className="stat-value" style={{fontSize: '1.5rem', color: 'var(--success-color)'}}>0</div>
             </div>
             <div style={{padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.5rem'}}>
               <div className="micro-copy">Rejected</div>
               <div className="stat-value" style={{fontSize: '1.5rem', color: 'var(--danger-color)'}}>8</div>
             </div>
             <div style={{padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.5rem'}}>
               <div className="micro-copy">Memberships</div>
               <div className="stat-value" style={{fontSize: '1.5rem'}}>0</div>
             </div>
             <div style={{padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.5rem', gridColumn: 'span 2'}}>
               <div className="micro-copy">Leadership Roles</div>
               <div className="stat-value" style={{fontSize: '1.5rem'}}>0</div>
             </div>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="card">
           <div className="card-title">Application Funnel</div>
           {/* Visual Funnel Blocks */}
           <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
             <div style={{background: 'linear-gradient(90deg, var(--accent-color), #a855f7)', color: 'white', padding: '0.5rem', textAlign: 'center', borderRadius: '4px', width: '100%', margin: '0 auto', boxShadow: 'var(--glow-accent)'}}>Applied: 8</div>
             <div style={{textAlign: 'center'}}><TrendingDown size={14} color="var(--text-muted)" style={{margin: '0 auto'}}/></div>
             <div style={{background: 'linear-gradient(90deg, var(--danger-color), #f43f5e)', color: 'white', padding: '0.5rem', textAlign: 'center', borderRadius: '4px', width: '80%', margin: '0 auto', border: '1px solid rgba(244, 63, 94, 0.4)'}}>Rejected: 8</div>
             <div style={{textAlign: 'center'}}><TrendingDown size={14} color="var(--text-muted)" style={{margin: '0 auto'}}/></div>
             <div style={{background: 'linear-gradient(90deg, var(--success-color), #34d399)', color: 'white', padding: '0.5rem', textAlign: 'center', borderRadius: '4px', width: '60%', margin: '0 auto', border: '1px solid rgba(16, 185, 129, 0.4)'}}>Accepted: 0</div>
           </div>

           <div className="card-title" style={{marginTop: '2rem'}}>Participation Level</div>
           <div className="progress-bar-container">
             <div className="progress-bar-fill" style={{width: '5%', background: 'var(--danger-color)'}}></div>
           </div>
           <div className="flex-between" style={{marginTop: '0.5rem'}}>
             <span className="micro-copy">Very Low</span>
             <span className="micro-copy">0hrs/week</span>
           </div>
        </div>

      </div>

      <div style={{background: 'var(--danger-light)', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', padding: '1rem', borderRadius: '0.5rem', marginTop: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
         <AlertTriangle size={20} />
         Flagged: Needs Intervention
      </div>
    </>
  );
}

// --- SCREEN 3: EVENT CALENDAR --- //
function SmarterEventPlanning() {
  // Mock 28 days for heatmap
  const days = Array.from({length: 28}, (_, i) => {
     if(i === 12) return 3; // overloaded
     if(i === 14 || i === 15) return 2;
     if(i % 5 === 0) return 1;
     return 0; // low events
  });

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Smarter Event Planning</h1>
        <p>Reduce clashes & increase participation.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem'}}>
        {/* Main Heatmap */}
        <div className="card" style={{position: 'relative'}}>
           <div className="card-title">Schedule Heatmap</div>
           <div className="heatmap-grid">
             {days.map((level, i) => (
                <div key={i} className={`heatmap-cell heat-${level}`} style={{position: 'relative'}}>
                  {level === 3 && (
                    <div style={{position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', background: 'var(--text-main)', color: 'white', padding: '1rem', borderRadius: '0.5rem', width: '220px', zIndex: 10, boxShadow: 'var(--shadow-lg)'}}>
                       <div style={{fontWeight: 600, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                         <AlertTriangle size={16} color="var(--warning-color)"/> This date has 7 events scheduled
                       </div>
                       <button className="btn btn-primary" style={{width: '100%', fontSize: '0.75rem', padding: '0.25rem'}}>Pick alternate date</button>
                       {/* Arrow pointing down */}
                       <div style={{position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '8px', height: '8px', background: 'var(--text-main)'}}></div>
                    </div>
                  )}
                </div>
             ))}
           </div>
           <div className="flex-between" style={{marginTop: '1rem'}}>
             <span className="micro-copy flex-between" style={{gap: '0.5rem'}}><div className="heatmap-cell heat-0" style={{width:12, height:12}}></div> Low</span>
             <span className="micro-copy flex-between" style={{gap: '0.5rem'}}>High <div className="heatmap-cell heat-3" style={{width:12, height:12}}></div></span>
           </div>
        </div>

        {/* Side Panel */}
        <div className="card">
           <div className="card-title">Event Stats</div>
           <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             <li style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>
               <div className="micro-copy">Avg attendance</div>
               <div className="stat-value" style={{fontSize: '1.25rem'}}>42 students</div>
             </li>
             <li style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}}>
               <div className="micro-copy">Most active days</div>
               <div className="stat-value" style={{fontSize: '1.25rem'}}>Wednesdays</div>
             </li>
             <li>
               <div className="micro-copy">Low turnout slots</div>
               <div className="stat-value" style={{fontSize: '1.25rem'}}>Friday Evening</div>
             </li>
           </ul>
        </div>
      </div>

      <div style={{background: 'var(--warning-light)', color: 'var(--warning-color)', padding: '1rem', borderRadius: '0.5rem', marginTop: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
         💡 Insight: High overlap → low participation
      </div>
    </>
  );
}

// --- SCREEN 4: EVENT FEEDBACK & AI --- //
function PostEventIntelligence() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Post-Event Intelligence</h1>
        <p>Feedback summaries & AI detection.</p>
      </div>

      <div className="grid-cols-3" style={{gridTemplateColumns: '250px 1fr 300px'}}>
        
        {/* Left List */}
        <div className="card">
          <div className="search-bar" style={{width: 'auto', marginBottom: '1rem', padding: '0.25rem 0.5rem'}}>
            <Search size={14} color="var(--text-muted)" />
            <input type="text" placeholder="Search events" style={{fontSize: '0.75rem'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <div className="glass-list-item" style={{borderLeft: '3px solid var(--accent-color)'}}>
              <h4 style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Welcome Mixer</h4>
              <p className="micro-copy">Sept 12 • 120 attendees</p>
            </div>
            <div className="glass-list-item">
              <h4 style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Debate Regionals</h4>
              <p className="micro-copy">Sept 10 • 45 attendees</p>
            </div>
            <div className="glass-list-item">
              <h4 style={{fontSize: '0.875rem', marginBottom: '0.25rem'}}>Open Mic</h4>
              <p className="micro-copy">Sept 08 • 250 attendees</p>
            </div>
          </div>
        </div>

        {/* Center Feedback */}
        <div className="card">
           <div className="card-title">Welcome Mixer Summary</div>
           
           <div style={{marginBottom: '1.5rem'}}>
             <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-color)', fontWeight: 600, marginBottom: '0.5rem'}}>
               <CheckCircle size={18} /> 👍 Most liked aspects
             </div>
             <ul style={{listStylePosition: 'inside', color: 'var(--text-main)', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: 1.6}}>
               <li>Great food choices</li>
               <li>Friendly organizers</li>
               <li>Good venue location</li>
             </ul>
           </div>

           <div>
             <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-color)', fontWeight: 600, marginBottom: '0.5rem'}}>
               <XCircle size={18} /> 👎 Common complaints
             </div>
             <ul style={{listStylePosition: 'inside', color: 'var(--text-main)', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: 1.6}}>
               <li>Too crowded</li>
               <li>Not enough time to talk to clubs</li>
               <li>Audio was too loud</li>
             </ul>
           </div>
        </div>

        {/* Right AI Alerts */}
        <div className="card">
           <div className="card-title">AI Alerts</div>
           <div className="alert-item warning">
             <UserX size={18} style={{flexShrink: 0, marginTop: '2px'}} />
             <div>
               <strong>⚠️ Loneliness detected</strong>
               <div className="micro-copy" style={{marginTop: '0.25rem'}}>Multiple qualitative responses explicitly mention feeling excluded during networking sessions.</div>
             </div>
           </div>
           <div className="alert-item danger" style={{marginTop: '0.75rem'}}>
             <AlertTriangle size={18} style={{flexShrink: 0, marginTop: '2px'}} />
             <div>
               <strong>⚠️ Harassment concern flagged</strong>
               <div className="micro-copy" style={{marginTop: '0.25rem'}}>1 anonymous feedback flagged aggressive recruitment tactics by a senior member.</div>
             </div>
           </div>
        </div>

      </div>

      {/* Bottom Rankings */}
      <div className="card" style={{marginTop: '1.5rem'}}>
         <div className="grid-cols-2">
            <div>
              <div className="card-title" style={{color: 'var(--success-color)'}}>Most liked events</div>
              <p className="text-sm">1. Cultural Night</p>
              <p className="text-sm">2. Hackathon Opening</p>
            </div>
            <div>
              <div className="card-title" style={{color: 'var(--danger-color)'}}>Least liked events</div>
              <p className="text-sm">1. Mandatory Seminar A</p>
              <p className="text-sm">2. Tech Talk 4</p>
            </div>
         </div>
      </div>
    </>
  );
}

// --- SCREEN 5: SYSTEM BIAS ANALYTICS --- //
function UncoveringHiddenBias() {
  return (
    <>
      <div className="page-header" style={{marginBottom: '1rem'}}>
        <h1 className="page-title">Uncovering Hidden Bias</h1>
        <p>Show exclusivity + systemic issues.</p>
      </div>

      <div className="grid-cols-3" style={{gridTemplateColumns: '1fr 300px'}}>
        
        {/* Main Network Panel */}
        <div className="card" style={{position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
           <div className="card-title" style={{position: 'absolute', top: '1.5rem', left: '1.5rem'}}>Leadership Network Overlap</div>
           
           {/* Visual Diagram */}
           <div style={{position: 'relative', width: '300px', height: '200px'}}>
             <div style={{width: 60, height: 60, background: 'var(--accent-color)', color: 'white', display: 'flex', alignItems:'center', justifyContent: 'center', borderRadius: '50%', position: 'absolute', top: 30, left: 10, fontSize: '0.75rem', fontWeight: 600}}>Orators</div>
             
             <div style={{width: 70, height: 70, background: 'var(--accent-hover)', color: 'white', display: 'flex', alignItems:'center', justifyContent: 'center', borderRadius: '50%', position: 'absolute', top: 50, right: 10, fontSize: '0.75rem', fontWeight: 600}}>Jazbaa</div>

             <div style={{width: 40, height: 40, background: 'var(--text-muted)', color: 'white', display: 'flex', alignItems:'center', justifyContent: 'center', borderRadius: '50%', position: 'absolute', bottom: -20, left: 100, fontSize: '0.65rem'}}>Tech</div>

             {/* SVG connecting lines */}
             <svg width="100%" height="100%" style={{position:'absolute', top: 0, left: 0, zIndex: -1}}>
               <line x1="70" y1="60" x2="230" y2="85" stroke="var(--danger-color)" strokeWidth="8"/>
               <line x1="265" y1="120" x2="140" y2="180" stroke="var(--border-color)" strokeWidth="2"/>
               <line x1="100" y1="180" x2="40" y2="90" stroke="var(--border-color)" strokeWidth="2"/>
             </svg>

             {/* Overlay Callout */}
             <div style={{position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', background: 'var(--danger-light)', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap'}}>
               Orators ↔ Jazbaa: 65% overlap
             </div>
           </div>
        </div>

        {/* Right Sidebar Leaderboard */}
        <div className="card">
           <div className="card-title flex-between">
              Top Leaders
              <span className="badge warning">Concentration</span>
           </div>
           
           <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--warning-light)', borderRadius: '0.5rem'}}>
               <div className="avatar" style={{width: '2rem', height: '2rem', fontSize: '0.75rem'}}>XS</div>
               <div>
                  <div style={{fontWeight: 600, fontSize: '0.875rem'}}>X student</div>
                  <div className="micro-copy" style={{color: 'var(--warning-color)', fontWeight: 600}}>→ 13 leadership roles</div>
               </div>
             </div>
             
             <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem'}}>
               <div className="avatar" style={{width: '2rem', height: '2rem', fontSize: '0.75rem', background:'var(--border-color)', color: 'var(--text-muted)'}}>Y</div>
               <div>
                  <div style={{fontWeight: 600, fontSize: '0.875rem'}}>Student Y</div>
                  <div className="micro-copy">→ 9 leadership roles</div>
               </div>
             </div>

             <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem'}}>
               <div className="avatar" style={{width: '2rem', height: '2rem', fontSize: '0.75rem', background:'var(--border-color)', color: 'var(--text-muted)'}}>Z</div>
               <div>
                  <div style={{fontWeight: 600, fontSize: '0.875rem'}}>Student Z</div>
                  <div className="micro-copy">→ 8 leadership roles</div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Footer & Tagline */}
      <div className="flex-between" style={{marginTop: '1.5rem'}}>
         <div style={{display: 'flex', gap: '1rem'}}>
           <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem'}}>
             <input type="checkbox" defaultChecked /> Show clubs with &gt;50% overlap
           </label>
           <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem'}}>
             <input type="checkbox" defaultChecked /> Show students with 0 memberships
           </label>
         </div>

         <div style={{fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)'}}>
           "Identify concentration. Reduce exclusivity."
         </div>
      </div>
    </>
  );
}

// --- APP ENTRY POINT --- //
export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/student" element={<StudentDetailedProfile />} />
          <Route path="/events" element={<SmarterEventPlanning />} />
          <Route path="/analytics" element={<PostEventIntelligence />} />
          <Route path="/bias" element={<UncoveringHiddenBias />} />
          <Route path="*" element={<HomeDashboard />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
