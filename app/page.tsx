"use client";

import { useMemo, useState } from "react";
import { comparableFlanges, flanges } from "@/data/flanges";
import type { Flange } from "@/types/flange";

type Tab = "overview" | "manufacturing" | "inspection" | "failures" | "compare";

const quickTools: { label: string; tab?: Tab }[] = [
  { label: "Compare Flanges", tab: "compare" },
  { label: "Selection Guide" },
  { label: "Pressure Classes" },
  { label: "Dimensions" },
  { label: "Facing Types" },
  { label: "Standards" },
  { label: "Inspection", tab: "inspection" },
  { label: "Failure Atlas", tab: "failures" },
  { label: "Calculators" }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("weld-neck");
  const [tab, setTab] = useState<Tab>("overview");

  const selected = flanges.find((item) => item.id === selectedId) ?? flanges[0];
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flanges;
    return flanges.filter((item) =>
      [item.name, item.shortName, item.code, item.connection, item.standard, item.pressureUse, item.summary, ...item.applications]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const choose = (flange: Flange) => {
    setSelectedId(flange.id);
    setTab("overview");
  };

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <div className="brand">MR-ENGG</div>
          <div className="tagline">Mechanical Reference & Engineering Workspace</div>
        </div>
        <div className="status"><span className="liveDot" /> Flange Engineering Suite · v1.0</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">PIPING COMPONENTS / PIPE FLANGES</p>
          <h1>Pipe Flange Engineering Hub</h1>
          <p>Selection, engineering science, inspection, failures and field execution in one structured workspace.</p>
        </div>
        <div className="standardStack">
          <span>ASME B16.5</span><span>ASME B16.47</span><span>ASME PCC-1</span>
        </div>
      </section>

      <section className="searchRow">
        <div className="searchBox"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search flange, service, connection, class or standard…" /></div>
        <span>{visible.length} of {flanges.length} types</span>
      </section>

      <section className="catalogStrip">
        {visible.map((flange) => (
          <button key={flange.id} className={selected.id === flange.id ? "catalogCard active" : "catalogCard"} onClick={() => choose(flange)}>
            <FlangeGlyph type={flange.id} />
            <span>{flange.shortName}</span>
            <small>{flange.code}</small>
          </button>
        ))}
      </section>

      <div className="workspace">
        <aside className="sidebar">
          <h2>Pipe Flanges</h2>
          {flanges.map((flange) => (
            <button key={flange.id} className={selected.id === flange.id ? "nav active" : "nav"} onClick={() => choose(flange)}>
              <span>{flange.shortName}</span><small>{flange.code}</small>
            </button>
          ))}
          <h2 className="toolHeading">Quick Tools</h2>
          {quickTools.map((tool) => (
            <button key={tool.label} className="tool" onClick={() => tool.tab && setTab(tool.tab)}>
              <span>{tool.label}</span><b>›</b>
            </button>
          ))}
        </aside>

        <section className="content">
          <div className="componentHeader">
            <div>
              <div className="badgeRow"><span className="code">{selected.code}</span><span className={`category ${selected.category}`}>{selected.category}</span></div>
              <h2>{selected.name}</h2>
              <p>{selected.summary}</p>
            </div>
            <div className="ratingCard">
              <span>Primary connection</span><strong>{selected.connection}</strong>
              <span>Dimensional basis</span><strong>{selected.standard}</strong>
            </div>
          </div>

          <div className="tabs">
            {(["overview", "manufacturing", "inspection", "failures", "compare"] as Tab[]).map((item) => (
              <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{label(item)}</button>
            ))}
          </div>

          {tab === "overview" && <Overview flange={selected} />}
          {tab === "manufacturing" && <Manufacturing flange={selected} />}
          {tab === "inspection" && <Inspection flange={selected} />}
          {tab === "failures" && <Failures flange={selected} />}
          {tab === "compare" && <Comparison />}
        </section>
      </div>
    </main>
  );
}

function Overview({ flange }: { flange: Flange }) {
  return <div className="grid">
    <article className="panel wide">
      <div className="panelTitle"><h3>Engineering use</h3><span>{flange.standard}</span></div>
      <p>{flange.pressureUse}</p>
      <div className="metrics">
        <Metric label="Fatigue performance" value={flange.fatigue} />
        <Metric label="Relative cost" value={flange.cost} />
        <Metric label="Size basis" value={flange.sizeRange} />
      </div>
    </article>
    <ListPanel title="Typical applications" items={flange.applications} />
    <article className="panel visualPanel"><h3>Engineering schematic</h3><div className="drawing"><FlangeGlyph type={flange.id} large /><div className="centerline" /></div><p className="muted">Conceptual only. Dimensions must come from the governing standard edition and project specification.</p></article>
    <ListPanel title="Advantages" items={flange.advantages} />
    <ListPanel title="Limitations" items={flange.limitations} warning />
    <article className="panel wide"><h3>Applicable pressure classes</h3><div className="chips">{flange.pressureClasses.map((item) => <span key={item}>Class {item}</span>)}</div></article>
    <article className="panel wide"><h3>Related standards</h3><div className="standardGrid">{flange.relatedStandards.map((item) => <button key={item}>{item}<small>Open reference ›</small></button>)}</div></article>
  </div>;
}

function Manufacturing({ flange }: { flange: Flange }) {
  return <div className="grid">
    <article className="panel wide"><h3>Manufacturing route</h3><div className="processFlow">{flange.manufacturing.map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span></div>)}</div></article>
    <ListPanel title="Incoming verification" items={["Approved material specification and purchase description", "Heat-number and MTC traceability", "Required heat treatment and mechanical properties", "Visual condition before machining"]} />
    <ListPanel title="Final release controls" items={["Dimensional report", "Facing finish and groove inspection", "Marking verification", "NDE / PMI records where specified", "Preservation and flange-face protection"]} />
  </div>;
}

function Inspection({ flange }: { flange: Flange }) {
  return <div className="grid">
    <ListPanel title="Inspection sequence" items={flange.inspection} numbered />
    <ListPanel title="Field notes" items={flange.fieldNotes} warning />
    <article className="panel wide"><h3>Lifecycle checkpoints</h3><div className="timeline">{["Material", "Dimensions", "Facing", "Fit-up", "Joint assembly", "Final release"].map((item, index) => <div key={item}><b>{index + 1}</b><span>{item}</span></div>)}</div></article>
    <article className="panel wide callout"><strong>Joint integrity reminder</strong><p>Flange rating alone does not guarantee leak tightness. Facing condition, gasket compatibility, bolting condition, alignment and controlled tightening must be evaluated together.</p></article>
  </div>;
}

function Failures({ flange }: { flange: Flange }) {
  return <div className="failureGrid">{flange.failures.map((failure) => <article className="failureCard" key={failure.mode}><div className="failureIcon">!</div><h3>{failure.mode}</h3><p><b>Likely cause</b>{failure.cause}</p><p><b>Prevention</b>{failure.prevention}</p></article>)}</div>;
}

function Comparison() {
  return <article className="panel comparison"><div className="panelTitle"><div><h3>General flange comparison</h3><p className="muted">Blind, reducing and long weld neck flanges are excluded because their functions are not directly comparable.</p></div></div><div className="tableWrap"><table><thead><tr><th>Feature</th>{comparableFlanges.map((item) => <th key={item.id}>{item.shortName}</th>)}</tr></thead><tbody>
    <CompareRow label="Connection" values={comparableFlanges.map((item) => item.connection)} />
    <CompareRow label="Typical duty" values={comparableFlanges.map((item) => item.pressureUse)} />
    <CompareRow label="Fatigue" values={comparableFlanges.map((item) => item.fatigue)} />
    <CompareRow label="Relative cost" values={comparableFlanges.map((item) => item.cost)} />
    <CompareRow label="Key limitation" values={comparableFlanges.map((item) => item.limitations[0])} />
  </tbody></table></div></article>;
}

function CompareRow({ label: rowLabel, values }: { label: string; values: string[] }) { return <tr><th>{rowLabel}</th>{values.map((value, index) => <td key={`${rowLabel}-${index}`}>{value}</td>)}</tr>; }
function Metric({ label: metricLabel, value }: { label: string; value: string }) { return <div><span>{metricLabel}</span><strong>{value}</strong></div>; }
function ListPanel({ title, items, warning = false, numbered = false }: { title: string; items: string[]; warning?: boolean; numbered?: boolean }) { return <article className={warning ? "panel warning" : "panel"}><h3>{title}</h3><ul>{items.map((item, index) => <li key={item}>{numbered ? `${index + 1}. ` : ""}{item}</li>)}</ul></article>; }
function label(tab: Tab) { return tab === "inspection" ? "Field & Inspection" : tab[0].toUpperCase() + tab.slice(1); }

function FlangeGlyph({ type, large = false }: { type: string; large?: boolean }) {
  return <div className={`glyph glyph-${type} ${large ? "large" : ""}`} aria-hidden="true"><i className="disc" /><i className="hub" /><i className="bore" /></div>;
}
