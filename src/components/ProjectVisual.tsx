import { BarChart3, Check, ChevronDown, FileSpreadsheet, Layers, Leaf, Plus, Search, MapPin, Cpu, BookOpen } from 'lucide-react';
export function ProjectVisual({slug}: {slug:string}) {
 const carbon = slug === 'carbon-footprint-ai'; const csv = slug === 'smartcsv'; const craigslist = slug === 'redesign-craigslist-mumbai'; const techfest = slug === 'techfest-landingpage'; const nswf = slug === 'nswf-portal'; const capstonex = slug === 'capstonex';

 if (craigslist) {
   return (
     <div className={`project-visual ${slug}`} style={{ padding: 0, overflow: 'hidden' }}>
       <img src="/craig.jpg" alt="Craigslist Mumbai Redesign" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
     </div>
   );
 }

 if (nswf) {
   return (
     <div className={`project-visual ${slug}`} style={{ padding: 0, overflow: 'hidden' }}>
       <img src="/nswf.jpg" alt="NSWF Wikipedia Portal" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
     </div>
   );
 }

 if (techfest) {
   return (
     <div className={`project-visual ${slug}`} style={{ padding: 0, overflow: 'hidden' }}>
       <img src="/techfest.jpg" alt="Techfest IIT Bombay Landing Page" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
     </div>
   );
 }

 if (capstonex) {
   return (
     <div className={`project-visual ${slug}`} style={{ padding: 0, overflow: 'hidden' }}>
       <img src="/capstonex.jpg" alt="CapstoneX Platform" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
     </div>
   );
 }

 return <div className={`project-visual ${slug}`} role="img" aria-label={`${csv ? 'SmartCSV' : carbon ? 'Carbon Footprint AI' : craigslist ? 'Craigslist Mumbai' : techfest ? 'Techfest IIT Bombay' : nswf ? 'NSWF Portal' : 'CapstoneX'} illustrative interface concept; sample content, not an original project screenshot`}>
  <div className="mock-window" aria-hidden="true">
   <div className="mock-top"><span className="mock-brand">{csv ? <FileSpreadsheet size={17}/> : carbon ? <Leaf size={17}/> : craigslist ? <MapPin size={17}/> : techfest ? <Cpu size={17}/> : nswf ? <BookOpen size={17}/> : <Layers size={17}/>} {csv ? 'SmartCSV' : carbon ? 'Carbon Footprint' : craigslist ? 'Craigslist Mumbai' : techfest ? 'Techfest 2026' : nswf ? 'NSWF Wiki Portal' : 'CapstoneX'}</span><span className="mock-avatar">K</span></div>
   <div className="mock-body"><aside className="mock-side"><span className="mock-selected">{carbon ? 'Overview' : csv ? 'Workspace' : craigslist ? 'Listings' : techfest ? 'Telemetry' : nswf ? 'Documentation' : 'My projects'}</span><span>{csv ? 'Files' : craigslist ? 'Categories' : techfest ? 'Robotics' : nswf ? 'Methodology' : 'Activity'}</span><span>{carbon ? 'Insights' : craigslist ? 'Saved' : techfest ? 'Summit' : nswf ? 'Media' : 'Settings'}</span><div className="mock-side-bottom">{craigslist ? 'Mumbai, MH' : techfest ? 'System online' : nswf ? 'ISO 14001:2015' : 'Your workspace'}</div></aside>
   <div className="mock-main"><div className="mock-heading"><strong>{csv ? 'Prepare your data' : carbon ? 'Your impact, understood.' : craigslist ? 'Find what you need.' : techfest ? 'Asia\'s largest science festival.' : nswf ? 'Environmental Documentation' : 'Good ideas. Clear direction.'}</strong>{csv ? <FileSpreadsheet size={18}/> : craigslist ? <Search size={18}/> : techfest ? <Cpu size={18}/> : nswf ? <Leaf size={18}/> : <Plus size={18}/>}</div><p className="mock-caption">{csv ? 'Upload. Refine. Export.' : carbon ? 'Small choices. A more thoughtful everyday.' : craigslist ? 'Clean, fast, mobile-first classifieds.' : techfest ? '300+ events. 1,80,000+ footfall. Pure innovation.' : nswf ? 'Verified sources. Encyclopedic format.' : 'A home for your next project.'}</p>
   {csv ? <><div className="csv-toolbar"><span><Check size={12}/> Sample data.csv</span><span>Clean data <ChevronDown size={12}/></span></div><table className="mock-table"><thead><tr><th></th><th>name</th><th>category</th><th>status</th></tr></thead><tbody>{['Avery','Jordan','Sam','Alex'].map((name,i)=><tr key={name}><td>{i+1}</td><td>{name}</td><td>{i%2?'Product':'Design'}</td><td><span className="table-tag">{i===2?'Missing':'Ready'}</span></td></tr>)}</tbody></table><div className="mock-actions"><span>Remove duplicates</span><span>Handle missing values</span></div></> : carbon ? <><div className="carbon-stats"><div><small>LIFESTYLE OVERVIEW</small><strong>Every choice<br/>leaves a trace.</strong><span>Explore your estimated impact</span></div><div className="donut"><Leaf size={26}/></div></div><div className="carbon-bottom"><div><span>Impact by category</span><div className="bars">{[42,73,54,31,63,39,28].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div><div className="insight"><Leaf size={18}/><strong>Make room for change.</strong><span>Explore personalized insights.</span></div></div></> : craigslist ? <><div className="mock-search"><Search size={13}/> Search apartments, jobs, items...</div><div className="kanban">{['Housing','Jobs','For Sale'].map((column,i)=><div key={column}><div className="column-label">{column}<span>0{i+1}</span></div><div className="kanban-card"><span className="tiny-label">{['APARTMENT','FULL-TIME','ELECTRONICS'][i]}</span><strong>{['2BHK Bandra West','Frontend Developer','Used MacBook Pro'][i]}</strong><span className="fake-line"/><span className="fake-line short"/><div className="kanban-foot"><span className="mini-avatar">₹₹</span><MapPin size={12}/></div></div>{i===0&&<div className="kanban-card extra-card"><span className="tiny-label">STUDIO</span><strong>Cozy Colaba Studio</strong><span className="fake-line"/></div>}</div>)}</div></> : techfest ? <><div className="carbon-stats" style={{borderColor: 'lime'}}><div><small style={{color: 'cyan'}}>TELEMETRY // DATA</small><strong style={{color: '#fff'}}>Signal detected.</strong><span style={{color: 'silver'}}>Processing event parameters...</span></div><div className="donut" style={{border: '2px solid lime', borderLeftColor: 'cyan', borderRadius: '50%'}}><Cpu size={26} color="lime"/></div></div><div className="carbon-bottom"><div style={{color: '#fff'}}><span>Active Domains</span><div className="bars">{[90,80,95,70,85].map((h,i)=><i key={i} style={{height:h+'%', background: 'cyan'}}/>)}</div></div><div className="insight" style={{background: '#111', color: 'lime', borderColor: '#333'}}><Cpu size={18}/><strong>System operational.</strong><span style={{color: 'silver'}}>Ready for registration sequence.</span></div></div></> : nswf ? <><div className="mock-search"><Search size={13}/> Search Wikipedia draft...</div><div className="kanban">{['Draft','Research','Media'].map((column,i)=><div key={column}><div className="column-label">{column}</div><div className="kanban-card"><span className="tiny-label">{['CONTENT','SOURCE','GALLERY'][i]}</span><strong>{['Nisarg Srishti Foundation','ISO Certification Docs','Tree Plantation Drive'][i]}</strong><span className="fake-line"/><span className="fake-line short"/><div className="kanban-foot"><span className="mini-avatar">{['V1','PDF','JPG'][i]}</span><Check size={12}/></div></div></div>)}</div></> : <><div className="mock-search"><Search size={13}/> Find a project</div><div className="kanban">{['Proposals','In progress','Review'].map((column,i)=><div key={column}><div className="column-label">{column}<span>0{i+1}</span></div><div className="kanban-card"><span className="tiny-label">{['PROPOSAL','DEVELOPMENT','REVIEW'][i]}</span><strong>{['Campus platform','Project workspace','Research portal'][i]}</strong><span className="fake-line"/><span className="fake-line short"/><div className="kanban-foot"><span className="mini-avatar">{['CP','PW','RP'][i]}</span><Check size={12}/></div></div>{i===1&&<div className="kanban-card extra-card"><span className="tiny-label">DESIGN</span><strong>Interface exploration</strong><span className="fake-line"/></div>}</div>)}</div></>}
   </div></div>
  </div><span className="visual-caption"><BarChart3 size={12}/> Interface concept · illustrative content</span>
 </div>
}
