"use client";

import { useMemo, useState } from "react";

type Flange = {
  id: string;
  name: string;
  code: string;
  connection: string;
  pressureUse: string;
  fatigue: string;
  cost: string;
  summary: string;
  applications: string[];
  advantages: string[];
  limitations: string[];
  inspection: string[];
  fieldNotes: string[];
};

const flanges: Flange[] = [
  {
    id: "weld-neck",
    name: "Weld Neck",
    code: "WF-01",
    connection: "Butt weld",
    pressureUse: "High pressure / high temperature / cyclic service",
    fatigue: "Excellent",
    cost: "High",
    summary: "A forged flange with a tapered hub that transfers pipe stress gradually into the flange body.",
    applications: ["Critical process piping", "Steam and hydrocarbon service", "Thermal cycling", "High-pressure systems"],
    advantages: ["Best stress distribution", "Strong leak-resistant joint", "Suitable for radiography of butt weld"],
    limitations: ["Higher material and fabrication cost", "Requires accurate bevel alignment", "Longer installation time"],
    inspection: ["Verify bore and pipe schedule match", "Check hub taper and neck damage", "Inspect bevel preparation", "Confirm facing finish and protection"],
    fieldNotes: ["Do not force alignment using bolts", "Protect the machined face during welding", "Confirm flange rotation before final weld"],
  },
  {
    id: "slip-on",
    name: "Slip-On",
    code: "WF-02",
    connection: "Inside and outside fillet welds",
    pressureUse: "Low to moderate pressure, non-severe cyclic service",
    fatigue: "Fair",
    cost: "Low",
    summary: "The pipe slips through the flange bore and is secured by internal and external fillet welds.",
    applications: ["Utility piping", "Cooling water", "Low-pressure services", "General plant piping"],
    advantages: ["Lower initial cost", "Easy fit-up", "Less accurate pipe cutting required"],
    limitations: ["Lower fatigue strength than weld neck", "Two welds required", "Crevice may retain corrosive fluid"],
    inspection: ["Check pipe setback from flange face", "Verify both fillet welds", "Check bore clearance", "Inspect alignment and face runout"],
    fieldNotes: ["Maintain correct insertion gap", "Do not weld pipe flush with the raised face", "Avoid severe cyclic duties unless approved"],
  },
  {
    id: "socket-weld",
    name: "Socket Weld",
    code: "WF-03",
    connection: "Socket plus external fillet weld",
    pressureUse: "Small-bore, high-pressure service",
    fatigue: "Good",
    cost: "Medium",
    summary: "A small-bore flange where the pipe is inserted into a recessed socket and fillet welded externally.",
    applications: ["Small-bore process lines", "Instrument connections", "High-pressure utility lines"],
    advantages: ["Good alignment", "Compact arrangement", "No internal weld metal projection"],
    limitations: ["Crevice corrosion risk", "Not preferred for severe thermal cycling", "Generally limited to smaller sizes"],
    inspection: ["Verify expansion gap", "Check socket depth", "Inspect fillet weld profile", "Confirm bore cleanliness"],
    fieldNotes: ["Withdraw pipe slightly after bottoming", "Avoid use where crevice corrosion is critical", "Confirm project size limits"],
  },
  {
    id: "threaded",
    name: "Threaded",
    code: "WF-04",
    connection: "Tapered pipe thread",
    pressureUse: "Low-pressure services where welding is undesirable",
    fatigue: "Low",
    cost: "Medium",
    summary: "A flange connected to externally threaded pipe without a pressure-retaining weld.",
    applications: ["Air and water services", "Hazardous areas where hot work is restricted", "Temporary or low-severity systems"],
    advantages: ["No welding required", "Rapid installation", "Useful for galvanized piping"],
    limitations: ["Thread leakage risk", "Poor cyclic performance", "Not suitable for severe temperature variation"],
    inspection: ["Check thread standard and engagement", "Inspect thread damage", "Verify sealant compatibility", "Check flange face alignment"],
    fieldNotes: ["Do not use excessive thread sealant", "Avoid back-off after alignment", "Follow line-class restrictions"],
  },
  {
    id: "lap-joint",
    name: "Lap Joint",
    code: "WF-05",
    connection: "Loose backing flange over a stub end",
    pressureUse: "Corrosive service and systems requiring frequent dismantling",
    fatigue: "Fair",
    cost: "Medium",
    summary: "A rotatable backing flange used with a separate stub end that provides the wetted sealing face.",
    applications: ["Stainless and alloy piping", "Frequent dismantling", "Lined piping", "Alignment-sensitive joints"],
    advantages: ["Bolt-hole rotation simplifies alignment", "Backing flange can use lower-cost material", "Easy dismantling"],
    limitations: ["Lower rigidity", "Requires compatible stub end", "Not preferred for high bending loads"],
    inspection: ["Check stub-end seating face", "Verify lap radius compatibility", "Inspect backing flange bore", "Confirm free rotation before assembly"],
    fieldNotes: ["Select gasket based on stub-end face", "Support heavy lines near the joint", "Do not confuse backing-flange material with wetted material"],
  },
  {
    id: "blind",
    name: "Blind",
    code: "WF-06",
    connection: "Bolted closure",
    pressureUse: "Permanent or temporary end closure",
    fatigue: "Not directly comparable",
    cost: "Varies strongly with size/class",
    summary: "A solid flange used to terminate a piping system, nozzle, valve end, or future connection.",
    applications: ["Line termination", "Equipment nozzles", "Future tie-ins", "Hydrotest boundaries"],
    advantages: ["Positive pressure boundary", "Allows future access", "Simple inspection of closure point"],
    limitations: ["Heavy at large size and class", "High bending stress under pressure", "Requires safe lifting arrangement"],
    inspection: ["Verify thickness and class", "Inspect facing damage", "Check lifting method", "Confirm venting and depressurization before removal"],
    fieldNotes: ["Never stand in front during first pressurization", "Use certified lifting points for large blinds", "Confirm trapped pressure is released"],
  },
  {
    id: "reducing",
    name: "Reducing",
    code: "WF-07",
    connection: "Flanged connection with reduced bore",
    pressureUse: "Compact size transition at equipment or piping connections",
    fatigue: "Depends on geometry and service",
    cost: "Medium to high",
    summary: "A flange with a bore smaller than the nominal flange size, used where a compact transition is justified.",
    applications: ["Equipment connections", "Space-limited transitions", "Selected pump or instrument connections"],
    advantages: ["Compact transition", "Can eliminate a separate reducer", "Useful where layout space is limited"],
    limitations: ["Creates local turbulence", "Not a universal substitute for a reducer", "Potential erosion or pressure-drop concerns"],
    inspection: ["Verify bore and transition geometry", "Check concentricity", "Confirm process suitability", "Inspect sharp internal edges"],
    fieldNotes: ["Assess velocity increase before selection", "Avoid using only to save space", "Confirm line-class approval"],
  },
  {
    id: "long-weld-neck",
    name: "Long Weld Neck",
    code: "WF-08",
    connection: "Integral long neck with butt-weld end",
    pressureUse: "Equipment nozzles, vessels and special high-integrity connections",
    fatigue: "Excellent",
    cost: "High",
    summary: "A long-neck forged flange commonly used as an equipment nozzle or reinforced connection rather than a routine line flange.",
    applications: ["Pressure-vessel nozzles", "Columns and drums", "Special equipment connections", "High-integrity branch/nozzle duties"],
    advantages: ["Integral reinforcement potential", "Excellent stress transition", "Reduces separate neck components"],
    limitations: ["Special design coordination required", "High cost and lead time", "Not interchangeable with standard weld neck flange"],
    inspection: ["Check neck length and wall profile", "Verify equipment drawing dimensions", "Inspect transition radii", "Confirm material traceability"],
    fieldNotes: ["Treat as an equipment/nozzle item where applicable", "Check vessel design calculations", "Do not replace with standard weld neck without engineering review"],
  },
];

const quickTools = ["Compare Flanges", "Selection Guide", "Pressure Classes", "Dimensions", "Materials", "Facing Types", "Standards", "Drawings", "Inspection", "Failure Atlas", "Calculators"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Flange>(flanges[0]);
  const [tab, setTab] = useState<"overview" | "inspection" | "compare">("overview");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flanges;
    return flanges.filter((f) => [f.name, f.code, f.connection, f.pressureUse, f.summary].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <div className="brand">MR-ENGG</div>
          <div className="tagline">Mechanical Reference & Engineering Workspace</div>
        </div>
        <div className="status">Flange Engineering Suite · v1</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">PIPING COMPONENTS / PIPE FLANGES</p>
          <h1>Pipe Flange Engineering Hub</h1>
          <p>Structured reference for selection, application, inspection, comparison and field use.</p>
        </div>
        <div className="standards">ASME B16.5 · ASME B16.47 · project specifications</div>
      </section>

      <section className="searchRow">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search flange type, service, connection or code…" />
        <span>{visible.length} of {flanges.length} flange types</span>
      </section>

      <div className="workspace">
        <aside className="sidebar">
          <h2>Pipe Flanges</h2>
          {visible.map((f) => (
            <button key={f.id} className={selected.id === f.id ? "nav active" : "nav"} onClick={() => { setSelected(f); setTab("overview"); }}>
              <span>{f.name}</span><small>{f.code}</small>
            </button>
          ))}
          <h2 className="toolHeading">Quick Tools</h2>
          {quickTools.map((tool) => (
            <button key={tool} className="tool" onClick={() => tool === "Compare Flanges" && setTab("compare")}>{tool}</button>
          ))}
        </aside>

        <section className="content">
          <div className="componentHeader">
            <div>
              <span className="code">{selected.code}</span>
              <h2>{selected.name} Flange</h2>
              <p>{selected.summary}</p>
            </div>
            <div className="ratingCard">
              <span>Primary connection</span>
              <strong>{selected.connection}</strong>
            </div>
          </div>

          <div className="tabs">
            <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
            <button className={tab === "inspection" ? "active" : ""} onClick={() => setTab("inspection")}>Field & Inspection</button>
            <button className={tab === "compare" ? "active" : ""} onClick={() => setTab("compare")}>Compare</button>
          </div>

          {tab === "overview" && (
            <div className="grid">
              <article className="panel wide">
                <h3>Engineering use</h3>
                <p>{selected.pressureUse}</p>
                <div className="metrics">
                  <div><span>Fatigue performance</span><strong>{selected.fatigue}</strong></div>
                  <div><span>Relative cost</span><strong>{selected.cost}</strong></div>
                  <div><span>Joint form</span><strong>{selected.connection}</strong></div>
                </div>
              </article>
              <ListPanel title="Typical applications" items={selected.applications} />
              <ListPanel title="Advantages" items={selected.advantages} />
              <ListPanel title="Limitations" items={selected.limitations} warning />
              <article className="panel">
                <h3>Engineering drawing</h3>
                <div className="drawing" aria-label={`${selected.name} flange schematic`}>
                  <div className="flangeDisc" />
                  <div className="flangeHub" />
                  <div className="centerline" />
                </div>
                <p className="muted">Schematic placeholder. Standard-controlled dimensions will be connected from the engineering database.</p>
              </article>
            </div>
          )}

          {tab === "inspection" && (
            <div className="grid">
              <ListPanel title="Inspection sequence" items={selected.inspection} numbered />
              <ListPanel title="Field notes" items={selected.fieldNotes} warning />
              <article className="panel wide">
                <h3>Lifecycle checkpoints</h3>
                <div className="timeline">{["Material verification", "Dimensional inspection", "Facing protection", "Fit-up", "Welding / assembly", "Final joint inspection"].map((x, i) => <div key={x}><b>{i + 1}</b><span>{x}</span></div>)}</div>
              </article>
            </div>
          )}

          {tab === "compare" && <Comparison />}
        </section>
      </div>
    </main>
  );
}

function ListPanel({ title, items, warning = false, numbered = false }: { title: string; items: string[]; warning?: boolean; numbered?: boolean }) {
  return <article className={warning ? "panel warning" : "panel"}><h3>{title}</h3><ul>{items.map((item, index) => <li key={item}>{numbered ? `${index + 1}. ` : ""}{item}</li>)}</ul></article>;
}

function Comparison() {
  const comparable = flanges.filter((f) => !["blind", "reducing", "long-weld-neck"].includes(f.id));
  return (
    <article className="panel comparison">
      <h3>Comparable general-purpose flange types</h3>
      <p className="muted">Blind, reducing and long weld neck flanges are excluded from this direct performance comparison because their engineering functions differ.</p>
      <div className="tableWrap"><table><thead><tr><th>Type</th><th>Connection</th><th>Typical duty</th><th>Fatigue</th><th>Relative cost</th></tr></thead><tbody>{comparable.map((f) => <tr key={f.id}><td><strong>{f.name}</strong></td><td>{f.connection}</td><td>{f.pressureUse}</td><td>{f.fatigue}</td><td>{f.cost}</td></tr>)}</tbody></table></div>
    </article>
  );
}
