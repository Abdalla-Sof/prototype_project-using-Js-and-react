import { useState, useEffect, useRef } from "react";

const NAVY = "#1B2A4A";
const TEAL = "#2E7D8C";
const LTEAL = "#4CA5B8";
const ACCENT = "#E8F4F7";

const ROLES = {
  Director: {
    icon: "◈",
    color: "#7F77DD",
    bg: "#EEEDFE",
    feeds: [
      { dot: "#E24B4A", tag: "Critical", tagBg: "#FCEBEB", tagColor: "#A32D2D", title: "EU AI Act — Article 13 enforcement begins Q3 2026", body: "All AI system providers must have technical documentation ready. Launch AI Act Advisory service immediately.", time: "Today", sector: "Strategy" },
      { dot: "#EF9F27", tag: "Revenue", tagBg: "#FAEEDA", tagColor: "#854F0B", title: "DORA audit window: 3 clients need gap assessment", body: "Estimated pipeline value €180K–240K from financial sector clients. Engagement window open now.", time: "Yesterday", sector: "Finance" },
      { dot: "#1D9E75", tag: "Signal", tagBg: "#E1F5EE", tagColor: "#0F6E56", title: "AI Governance demand rising — 6 inbound enquiries", body: "Only 2 Italian ICT firms offer this service. Market window is open for competitive positioning.", time: "2 days ago", sector: "Market" },
      { dot: "#378ADD", tag: "Hiring", tagBg: "#E6F1FB", tagColor: "#185FA5", title: "AI talent market tightening across Europe", body: "Consider pre-emptive hiring for AI compliance specialists before demand peaks in Q3.", time: "3 days ago", sector: "HR" },
    ],
    metrics: [{ label: "Open alerts", val: "12", sub: "3 critical", subColor: "#A32D2D" }, { label: "Pipeline", val: "€420K", sub: "+18% QoQ", subColor: "#0F6E56" }, { label: "Opportunities", val: "7", sub: "AI Act focus", subColor: TEAL }, { label: "Risk score", val: "68", sub: "Medium-high", subColor: "#854F0B" }],
  },
  Consultant: {
    icon: "◉",
    color: "#0F6E56",
    bg: "#E1F5EE",
    feeds: [
      { dot: "#E24B4A", tag: "Client Action", tagBg: "#FCEBEB", tagColor: "#A32D2D", title: "Healthcare client — AI diagnostics classified as high-risk under EU AI Act", body: "Requires conformity assessment and human oversight documentation before deployment.", time: "Today", sector: "Healthcare" },
      { dot: "#EF9F27", tag: "Opportunity", tagBg: "#FAEEDA", tagColor: "#854F0B", title: "Finance client — DORA ICT risk framework gap identified", body: "Third-party provider contracts need updating. Billable engagement opportunity.", time: "Yesterday", sector: "Finance" },
      { dot: "#1D9E75", tag: "Insight", tagBg: "#E1F5EE", tagColor: "#0F6E56", title: "Manufacturing trend: predictive maintenance AI adoption up 41%", body: "Industrial IoT combined with AI maintenance tools now standard in smart factory deployments.", time: "2 days ago", sector: "Manufacturing" },
      { dot: "#378ADD", tag: "New Service", tagBg: "#E6F1FB", tagColor: "#185FA5", title: "Sovereign AI Hosting Advisory — new service offering ready", body: "AWS and Azure Italy sovereign zones launching H2 2026. Package advisory service now.", time: "4 days ago", sector: "Cloud" },
    ],
    metrics: [{ label: "Client alerts", val: "8", sub: "2 urgent", subColor: "#A32D2D" }, { label: "New insights", val: "14", sub: "This week", subColor: TEAL }, { label: "Services pipeline", val: "3", sub: "Ready to pitch", subColor: "#0F6E56" }, { label: "Markets tracked", val: "5", sub: "Sectors", subColor: "#185FA5" }],
  },
  Compliance: {
    icon: "⬡",
    color: "#854F0B",
    bg: "#FAEEDA",
    feeds: [
      { dot: "#E24B4A", tag: "Deadline", tagBg: "#FCEBEB", tagColor: "#A32D2D", title: "EU AI Act — Article 13 Q3 2026 enforcement confirmed", body: "Transparency obligations for AI systems: technical documentation, logging, human oversight. Immediate audit required.", time: "Today", sector: "EU AI Act" },
      { dot: "#E24B4A", tag: "Fine Alert", tagBg: "#FCEBEB", tagColor: "#A32D2D", title: "Italian DPA fined fintech €3.2M for AI profiling violations", body: "GDPR Article 22 automated decision-making rules strictly enforced. Review all AI profiling systems.", time: "Yesterday", sector: "GDPR" },
      { dot: "#EF9F27", tag: "Audit Window", tagBg: "#FAEEDA", tagColor: "#854F0B", title: "DORA — post-deadline ICT audit period active", body: "Financial entities must demonstrate resilience testing and incident reporting capability.", time: "2 days ago", sector: "DORA" },
      { dot: "#EF9F27", tag: "Update", tagBg: "#FAEEDA", tagColor: "#854F0B", title: "NIS2 Italy national decree published", body: "New reporting timelines: 24h initial notification, 72h detailed report. Update incident response procedures.", time: "4 days ago", sector: "NIS2" },
    ],
    metrics: [{ label: "Active deadlines", val: "5", sub: "2 this month", subColor: "#A32D2D" }, { label: "Audit readiness", val: "61%", sub: "Below target", subColor: "#854F0B" }, { label: "Regs monitored", val: "11", sub: "EU + Italy", subColor: TEAL }, { label: "Actions open", val: "9", sub: "3 overdue", subColor: "#A32D2D" }],
  },
  "IT Engineer": {
    icon: "⬡",
    color: "#185FA5",
    bg: "#E6F1FB",
    feeds: [
      { dot: "#E24B4A", tag: "Security", tagBg: "#FCEBEB", tagColor: "#A32D2D", title: "Critical CVE in popular AI inference library — patch available", body: "CVE-2026-1847 affects TensorFlow Serving 2.x. Patch to 2.14.1 immediately. CVSS score 9.1.", time: "Today", sector: "Security" },
      { dot: "#EF9F27", tag: "Cloud", tagBg: "#FAEEDA", tagColor: "#854F0B", title: "Azure Italy sovereign zone — migration guide published", body: "Data residency requirements under NIS2 may require workload migration. Review architecture.", time: "Yesterday", sector: "Cloud" },
      { dot: "#1D9E75", tag: "AI Arch", tagBg: "#E1F5EE", tagColor: "#0F6E56", title: "OpenAI enterprise orchestration API now GA — agentic workflows enabled", body: "Multi-agent task execution with audit trails. Relevant for internal automation roadmap.", time: "2 days ago", sector: "AI" },
      { dot: "#378ADD", tag: "Regulation", tagBg: "#E6F1FB", tagColor: "#185FA5", title: "EU AI Act technical standards published by ENISA", body: "Logging and monitoring requirements for high-risk AI systems now specified. Update system architecture.", time: "3 days ago", sector: "EU AI Act" },
    ],
    metrics: [{ label: "Security alerts", val: "4", sub: "1 critical", subColor: "#A32D2D" }, { label: "Tech signals", val: "22", sub: "This week", subColor: TEAL }, { label: "Arch changes", val: "3", sub: "Flagged", subColor: "#854F0B" }, { label: "CVEs tracked", val: "7", sub: "AI stack", subColor: "#185FA5" }],
  },
};

const OUTLOOK_ITEMS = {
  Director: [
    { type: "danger", icon: "⚠", title: "Action required — EU AI Act Enforcement", body: "Article 13 transparency obligations Q3 2026. All clients deploying AI in EU must have docs ready. Launch AI Act Compliance Advisory now." },
    { type: "warning", icon: "€", title: "Revenue opportunity — DORA Audit Window open", body: "3 financial clients in post-deadline audit window. Gap assessments billable. Pipeline: €180K–240K." },
    { type: "success", icon: "↑", title: "Market signal — AI Governance demand rising", body: "6 inbound enquiries this week. Only 2 Italian ICT firms competing. Market window open now." },
    { type: "info", icon: "i", title: "Hiring signal — AI compliance talent tightening", body: "Pre-emptive hiring for AI compliance specialists recommended before Q3 demand peak." },
  ],
  Compliance: [
    { type: "danger", icon: "⚠", title: "EU AI Act — Article 13 enforcement Q3 2026", body: "Begin conformity assessment for all high-risk AI systems. Technical documentation required." },
    { type: "danger", icon: "⚠", title: "GDPR — Italian DPA AI profiling fine €3.2M", body: "Review all automated decision-making systems under Article 22. Update DPAs." },
    { type: "warning", icon: "📅", title: "DORA audit window active", body: "Demonstrate ICT resilience testing and incident reporting capability immediately." },
    { type: "warning", icon: "📋", title: "NIS2 Italy decree — new reporting timelines", body: "24h initial notification, 72h detailed report required. Update incident response procedures." },
  ],
  Consultant: [
    { type: "danger", icon: "!", title: "Healthcare client — AI Act conformity gap", body: "AI diagnostics tool classified high-risk. Conformity assessment engagement opportunity." },
    { type: "warning", icon: "€", title: "Finance client — DORA ICT framework gap", body: "Third-party contracts need updating. Billable advisory engagement ready to propose." },
    { type: "success", icon: "↑", title: "Manufacturing AI trend — predictive maintenance", body: "41% adoption growth. Position clients for smart factory transformation now." },
    { type: "info", icon: "i", title: "New service: Sovereign AI Hosting Advisory", body: "Azure and AWS Italy sovereign zones launching H2. Package and pitch this service." },
  ],
  "IT Engineer": [
    { type: "danger", icon: "⚠", title: "Critical CVE — patch TensorFlow Serving now", body: "CVE-2026-1847, CVSS 9.1. Patch to 2.14.1 immediately on all inference servers." },
    { type: "warning", icon: "☁", title: "Azure Italy sovereign zone — review architecture", body: "NIS2 data residency requirements may require workload migration. Assess now." },
    { type: "success", icon: "→", title: "OpenAI enterprise orchestration API GA", body: "Agentic workflows with audit trails now available. Relevant for internal AI roadmap." },
    { type: "info", icon: "i", title: "ENISA publishes EU AI Act technical standards", body: "Logging requirements for high-risk AI systems specified. Update system architecture." },
  ],
};

const TOP5 = [
  "EU AI Act Article 13 enforcement Q3 2026 confirmed",
  "Italian DPA issued €3.2M GDPR fine for AI profiling",
  "Microsoft Copilot enterprise adoption hits 78% of Fortune 500",
  "Azure Italy sovereign zone launch confirmed H2 2026",
  "NIS2 Italy national decree published — new reporting timelines",
];

const SHAREPOINT_DOCS = [
  { icon: "📋", name: "EU AI Act Compliance Checklist v2.1", updated: "Today", tag: "Compliance", tagBg: "#FCEBEB", tagColor: "#A32D2D" },
  { icon: "📊", name: "DORA Gap Assessment Template", updated: "Yesterday", tag: "Finance", tagBg: "#FAEEDA", tagColor: "#854F0B" },
  { icon: "📘", name: "AI Governance Framework Design Guide", updated: "2 days ago", tag: "Strategy", tagBg: "#EEEDFE", tagColor: "#3C3489" },
  { icon: "🔒", name: "NIS2 Incident Response Procedure", updated: "3 days ago", tag: "Security", tagBg: "#E6F1FB", tagColor: "#185FA5" },
  { icon: "📄", name: "Weekly Intelligence Report — Week 17", updated: "4 days ago", tag: "Report", tagBg: "#E1F5EE", tagColor: "#0F6E56" },
  { icon: "⚖", name: "GDPR Article 22 Automated Decision Guide", updated: "5 days ago", tag: "GDPR", tagBg: "#FAEEDA", tagColor: "#854F0B" },
];

const COPILOT_STARTERS = [
  "What changed in AI regulation this month?",
  "Show risks for healthcare clients",
  "Summarise banking opportunities in Italy",
  "What should I prioritise this week?",
];

const COPILOT_RESPONSES = {
  "What changed in AI regulation this month?": "This month's key regulatory changes:\n\n🔴 EU AI Act Article 13 enforcement confirmed for Q3 2026 — all high-risk AI system providers must have technical documentation and logging in place.\n\n🟡 Italian DPA issued a €3.2M fine for GDPR Article 22 violations related to AI profiling — review all automated decision-making systems.\n\n🟡 NIS2 national decree published in Italy with new 24h/72h incident reporting timelines.\n\nAction: Start conformity assessments now to avoid Q3 rush.",
  "Show risks for healthcare clients": "Healthcare client risk summary:\n\n🔴 High — AI diagnostics tools likely classified as high-risk under EU AI Act. Conformity assessment + human oversight documentation required before deployment.\n\n🟡 Medium — Health data processing under GDPR Article 9 (special categories) — DPAs need reviewing.\n\n🟡 Medium — Telemedicine platforms now in scope for NIS2 network security obligations.\n\nRecommended engagement: AI Act readiness assessment (2–4 weeks, €25–40K).",
  "Summarise banking opportunities in Italy": "Italian banking sector opportunities:\n\n💰 DORA Readiness Programs — post-deadline audit window is active. 3 known clients need gap assessments. Pipeline: ~€180–240K.\n\n💰 AI Risk Auditing — DORA requires third-party ICT risk assessments. Banks need external auditors.\n\n💰 Fraud Detection AI Advisory — 67% of Italian banks plan AI fraud tools by end 2026. Entry point for AI governance services.\n\nTotal addressable pipeline this quarter: ~€320K.",
  "What should I prioritise this week?": "Your top 3 priorities this week:\n\n1️⃣ EU AI Act Article 13 — brief all consultants on the Q3 enforcement timeline. Prepare client advisory deck.\n\n2️⃣ DORA pipeline — contact the 3 financial clients in the audit window this week before competitors do.\n\n3️⃣ AI Governance service launch — 6 inbound enquiries are waiting. Assign a lead consultant and schedule discovery calls.\n\nEstimated revenue impact if actioned this week: €200–280K.",
};

export default function App() {
  const [screen, setScreen] = useState("start");
  const [role, setRole] = useState("Director");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [copilotMessages, setCopilotMessages] = useState([
    { from: "bot", text: "Hello Abdullahi! I'm your AI Intelligence Assistant. Ask me anything about regulations, clients, or market opportunities." }
  ]);
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [copilotMessages]);

  const sendCopilot = (text) => {
    const msg = text || copilotInput;
    if (!msg.trim()) return;
    setCopilotMessages(m => [...m, { from: "user", text: msg }]);
    setCopilotInput("");
    setCopilotLoading(true);
    setTimeout(() => {
      const reply = COPILOT_RESPONSES[msg] || "I'm analysing the latest intelligence data for you. Based on current signals, I recommend reviewing the EU AI Act compliance checklist and the DORA gap assessment template in SharePoint. Shall I generate a tailored briefing?";
      setCopilotMessages(m => [...m, { from: "bot", text: reply }]);
      setCopilotLoading(false);
    }, 1200);
  };

  const data = ROLES[role];
  const outlookItems = OUTLOOK_ITEMS[role];

  const typeColors = {
    danger: { bg: "#FCEBEB", border: "#E24B4A", label: "#A32D2D" },
    warning: { bg: "#FAEEDA", border: "#EF9F27", label: "#854F0B" },
    success: { bg: "#E1F5EE", border: "#1D9E75", label: "#0F6E56" },
    info: { bg: "#E6F1FB", border: "#378ADD", label: "#185FA5" },
  };

  // ── START SCREEN ──────────────────────────────────────────────────────────
  if (screen === "start") return (
    <div style={{ minHeight: "100vh", background: NAVY, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Georgia', serif" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ position: "relative", width: 56, height: 56 }}>
            {[44, 32, 20].map((r, i) => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: r, height: r, borderRadius: "50%", border: `1.5px solid ${LTEAL}`, opacity: 0.3 + i * 0.25 }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 8, height: 8, borderRadius: "50%", background: LTEAL }} />
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: "bold", color: "#fff", letterSpacing: -0.5 }}>AI Compliance Radar</div>
            <div style={{ fontSize: 13, color: LTEAL, marginTop: 2, fontFamily: "sans-serif", letterSpacing: 0.5 }}>Intelligence Platform · 2026</div>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, maxWidth: 420, lineHeight: 1.7, fontFamily: "sans-serif", margin: "0 auto 32px" }}>
          Transform regulatory complexity and technology change into structured intelligence for your team.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 480, margin: "0 auto 32px" }}>
          {Object.entries(ROLES).map(([name, r]) => (
            <button key={name} onClick={() => { setRole(name); setScreen("app"); setActiveNav("dashboard"); }}
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(76,165,184,0.3)`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(76,165,184,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{r.icon}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff", fontFamily: "sans-serif" }}>{name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, fontFamily: "sans-serif" }}>{name === "Director" ? "Strategic overview" : name === "Consultant" ? "Client insights" : name === "Compliance" ? "Regulatory alerts" : "Security & tech"}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>Select your role to enter the platform</div>
      </div>
      <div style={{ position: "fixed", bottom: 16, fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif" }}>Abdullahi Abdulkadir · Version 1.0 · 2026</div>
    </div>
  );

  // ── MAIN APP ──────────────────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard", icon: "◈", label: "Dashboard" },
    { id: "teams", icon: "◉", label: "Teams Feed" },
    { id: "outlook", icon: "✉", label: "Outlook" },
    { id: "powerbi", icon: "▣", label: "Power BI" },
    { id: "sharepoint", icon: "⊞", label: "SharePoint" },
    { id: "copilot", icon: "✦", label: "Copilot" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f2f5", fontFamily: "sans-serif", fontSize: 13 }}>

      {/* SIDEBAR */}
      <div style={{ width: 210, background: NAVY, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: "0.5px solid rgba(255,255,255,0.08)", cursor: "pointer" }} onClick={() => setScreen("start")}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
              {[18, 12, 6].map((r, i) => <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: r, height: r, borderRadius: "50%", border: `1px solid ${LTEAL}`, opacity: 0.4 + i * 0.3 }} />)}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 4, height: 4, borderRadius: "50%", background: LTEAL }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>AI Compliance Radar</div>
              <div style={{ fontSize: 10, color: LTEAL, marginTop: 1 }}>Intelligence Platform</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "10px 0 4px" }}>
          <div style={{ fontSize: 10, color: LTEAL, fontWeight: "bold", padding: "0 14px 6px", letterSpacing: "0.7px" }}>PLATFORM</div>
          {navItems.map(n => (
            <div key={n.id} onClick={() => setActiveNav(n.id)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px", cursor: "pointer", fontSize: 12.5, color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.55)", background: activeNav === n.id ? "rgba(76,165,184,0.18)" : "transparent", borderRight: activeNav === n.id ? `2px solid ${LTEAL}` : "2px solid transparent", transition: "all 0.12s" }}>
              <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>{n.icon}</span>
              {n.label}
              {n.id === "copilot" && <span style={{ marginLeft: "auto", background: TEAL, borderRadius: 20, fontSize: 9, padding: "1px 6px", color: "#fff" }}>NEW</span>}
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 0 4px", borderTop: "0.5px solid rgba(255,255,255,0.08)", marginTop: 8 }}>
          <div style={{ fontSize: 10, color: LTEAL, fontWeight: "bold", padding: "0 14px 6px", letterSpacing: "0.7px" }}>ROLE VIEW</div>
          {Object.entries(ROLES).map(([name, r]) => (
            <div key={name} onClick={() => setRole(name)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 14px", cursor: "pointer", fontSize: 12, color: role === name ? "#fff" : "rgba(255,255,255,0.45)", background: role === name ? "rgba(255,255,255,0.06)" : "transparent" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: role === name ? LTEAL : "rgba(255,255,255,0.2)", flexShrink: 0 }} />
              {name}
            </div>
          ))}
        </div>

        <div style={{ margin: "auto 12px 14px", background: "rgba(76,165,184,0.12)", border: "0.5px solid rgba(76,165,184,0.25)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: LTEAL, letterSpacing: "0.5px" }}>ACTIVE ROLE</div>
          <div style={{ fontSize: 13, color: "#fff", fontWeight: "bold", marginTop: 3 }}>{role}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Abdullahi Abdulkadir</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ background: "#fff", borderBottom: "0.5px solid #e0e0e0", padding: "0 20px", height: 46, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: NAVY, flex: 1 }}>
            {activeNav === "dashboard" && "Intelligence Dashboard"}
            {activeNav === "teams" && "Microsoft Teams — AI Intelligence Channel"}
            {activeNav === "outlook" && "Outlook — Weekly Intelligence Report"}
            {activeNav === "powerbi" && "Power BI — Analytics & Risk"}
            {activeNav === "sharepoint" && "SharePoint — Knowledge Hub"}
            {activeNav === "copilot" && "Copilot — AI Assistant"}
          </div>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#FCEBEB", color: "#A32D2D", fontWeight: "bold" }}>
            {data.metrics[0].sub.includes("critical") ? data.metrics[0].sub.replace("critical", "critical alerts") : "3 critical alerts"}
          </span>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ACCENT, color: TEAL, fontWeight: "bold" }}>Week 17 · 2026</span>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: data.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: data.color }}>AA</div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* ── DASHBOARD ── */}
          {activeNav === "dashboard" && <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {data.metrics.map((m, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "0.5px solid #e8e8e8" }}>
                  <div style={{ fontSize: 11, color: "#888" }}>{m.label}</div>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: NAVY, marginTop: 4 }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: m.subColor, marginTop: 2 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>🔔</span> Intelligence Feed
                  <span style={{ marginLeft: "auto", fontSize: 10, color: TEAL, fontWeight: "normal" }}>Role: {role}</span>
                </div>
                {data.feeds.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < data.feeds.length - 1 ? "0.5px solid #f0f0f0" : "none" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.dot, marginTop: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: f.tagBg, color: f.tagColor, fontWeight: "bold", marginRight: 6 }}>{f.tag}</span>
                      <span style={{ fontSize: 12, color: "#222", fontWeight: "bold" }}>{f.title}</span>
                      <div style={{ fontSize: 11, color: "#666", marginTop: 3, lineHeight: 1.5 }}>{f.body}</div>
                      <div style={{ fontSize: 10, color: "#aaa", marginTop: 3 }}>{f.time} · {f.sector}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 10 }}>📊 Sector risk exposure</div>
                  {[["Finance", 82, "#E24B4A"], ["Healthcare", 74, "#EF9F27"], ["Public sector", 68, "#EF9F27"], ["Manufacturing", 45, "#1D9E75"], ["Retail", 31, "#1D9E75"]].map(([label, val, color]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 82, fontSize: 11, color: "#555" }}>{label}</div>
                      <div style={{ flex: 1, height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${val}%`, height: "100%", background: color, borderRadius: 4 }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#333", width: 28, textAlign: "right" }}>{val}%</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 10 }}>💡 Opportunities</div>
                  {[["AI Act Advisory", "High", TEAL], ["DORA Programs", "High", TEAL], ["AI Governance", "Medium", "#EF9F27"], ["Data Sovereignty", "Medium", "#EF9F27"], ["AI Audit & Cert.", "Growing", "#1D9E75"]].map(([name, val, color]) => (
                    <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5", fontSize: 12 }}>
                      <span style={{ color: "#333" }}>{name}</span>
                      <span style={{ color, fontWeight: "bold" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>}

          {/* ── TEAMS ── */}
          {activeNav === "teams" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8", overflow: "hidden" }}>
              <div style={{ background: "#464775", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: "#5B5EA6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: "bold" }}>T</div>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>Microsoft Teams — AI Intelligence</div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{role} channel · Live</div>
              </div>
              <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: LTEAL, flexShrink: 0 }}>AI</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>AI Intelligence Bot</span>
                      <span style={{ fontSize: 11, color: "#aaa" }}>Today 8:00 AM</span>
                      <span style={{ fontSize: 10, background: ACCENT, color: TEAL, padding: "1px 7px", borderRadius: 20 }}>Auto</span>
                    </div>
                    <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 12, borderLeft: `3px solid ${TEAL}` }}>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 8 }}>📋 Weekly Intelligence Briefing — Week 17 ({role} view)</div>
                      <div style={{ fontSize: 11, color: "#777", marginBottom: 10 }}>{data.metrics[0].val} regulatory updates · {data.metrics[1].val} {activeNav === "teams" ? "signals" : ""} · {data.metrics[2].val} opportunities</div>
                      {data.feeds.slice(0, 3).map((f, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#333", marginBottom: 5 }}>
                          <span style={{ fontSize: 13 }}>{f.dot === "#E24B4A" ? "🔴" : f.dot === "#EF9F27" ? "🟡" : "🟢"}</span> <strong>{f.title.split(" — ")[0]}</strong> — {f.title.split(" — ")[1] || f.body.slice(0, 60) + "…"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: data.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: data.color, flexShrink: 0 }}>AA</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>Abdullahi Abdulkadir</span>
                      <span style={{ fontSize: 11, color: "#aaa" }}>Today 8:34 AM</span>
                    </div>
                    <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 10, padding: "9px 12px", fontSize: 12, color: "#333" }}>
                      @AI Intelligence Bot — what should I focus on this week as {role}?
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: LTEAL, flexShrink: 0 }}>AI</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>AI Intelligence Bot</span>
                      <span style={{ fontSize: 11, color: "#aaa" }}>Today 8:35 AM</span>
                    </div>
                    <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 12, color: "#333", marginBottom: 8 }}>As <strong>{role}</strong>, your top priorities this week:</div>
                      {data.feeds.slice(0, 3).map((f, i) => (
                        <div key={i} style={{ fontSize: 12, color: "#333", marginBottom: 4 }}>{i + 1}. {f.title}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "10px 16px", borderTop: "0.5px solid #f0f0f0", display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1, background: "#f5f5f5", borderRadius: 20, padding: "8px 14px", fontSize: 12, color: "#aaa" }}>Message AI Intelligence...</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["📎", "😊", "→"].map((ic, i) => <button key={i} style={{ background: "transparent", border: "none", fontSize: i === 2 ? 16 : 14, cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>{ic}</button>)}
                </div>
              </div>
            </div>
          )}

          {/* ── OUTLOOK ── */}
          {activeNav === "outlook" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8", overflow: "hidden" }}>
              <div style={{ background: "#0078D4", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, color: "#fff" }}>✉</span>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>Outlook — Weekly Intelligence Report</div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Inbox · Auto-generated</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ borderBottom: "0.5px solid #f0f0f0", paddingBottom: 12, marginBottom: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: "bold", color: NAVY, marginBottom: 6 }}>AI Intelligence & Compliance Weekly — Week 17, 2026</div>
                  <div style={{ fontSize: 11, color: "#888" }}>From: AI Intelligence Platform &lt;noreply@intelligence.company.it&gt; · To: {role} Distribution List</div>
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>Dear Abdullahi, here is your personalised weekly briefing as <strong>{role}</strong>. {outlookItems.filter(i => i.type === "danger").length} items require immediate attention.</div>

                {outlookItems.map((item, i) => {
                  const tc = typeColors[item.type];
                  return (
                    <div key={i} style={{ background: tc.bg, borderRadius: 8, padding: "11px 14px", marginBottom: 10, borderLeft: `3px solid ${tc.border}` }}>
                      <div style={{ fontSize: 12, fontWeight: "bold", color: tc.label, marginBottom: 4 }}>{item.icon} {item.title}</div>
                      <div style={{ fontSize: 12, color: "#333" }}>{item.body}</div>
                    </div>
                  );
                })}

                <div style={{ fontSize: 12, fontWeight: "bold", color: NAVY, margin: "14px 0 8px" }}>Top 5 market changes this week</div>
                {TOP5.map((t, i) => <div key={i} style={{ fontSize: 12, color: "#444", padding: "4px 0", borderBottom: "0.5px solid #f5f5f5" }}>{i + 1}. {t}</div>)}
              </div>
            </div>
          )}

          {/* ── POWER BI ── */}
          {activeNav === "powerbi" && <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: -4 }}>
              <div style={{ background: "#F2C811", width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: "#000" }}>P</div>
              <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>Power BI — AI Intelligence Dashboard</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>Live · Updated 1h ago</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[["Regulatory alerts", "12", "3 critical", "#A32D2D"], ["Compliance score", "68%", "Below target", "#854F0B"], ["Pipeline from intel", "€420K", "This quarter", "#0F6E56"], ["Alerts actioned", "79%", "+8% vs last week", TEAL]].map(([l, v, s, c]) => (
                <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "0.5px solid #e8e8e8" }}>
                  <div style={{ fontSize: 11, color: "#888" }}>{l}</div>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: NAVY, marginTop: 4 }}>{v}</div>
                  <div style={{ fontSize: 11, color: c, marginTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 12 }}>Regulatory timeline 2026</div>
                {[["Q1", "DORA deadline passed", "#E24B4A"], ["Q2", "NIS2 audit window", "#EF9F27"], ["Q3", "AI Act Art. 13 enforcement", "#E24B4A"], ["Q4", "GDPR review cycle", "#378ADD"]].map(([q, label, color]) => (
                  <div key={q} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 26, fontSize: 11, color: "#888", flexShrink: 0 }}>{q}</div>
                    <div style={{ flex: 1, height: 24, background: color, borderRadius: 4, display: "flex", alignItems: "center", padding: "0 10px" }}>
                      <span style={{ fontSize: 11, color: "#fff" }}>{label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 12 }}>Opportunity pipeline</div>
                {[["AI Act Advisory", 90, "€160K"], ["DORA Programs", 68, "€120K"], ["AI Governance", 54, "€80K"], ["Data Sovereignty", 34, "€60K"]].map(([n, p, v]) => (
                  <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 96, fontSize: 11, color: "#555" }}>{n}</div>
                    <div style={{ flex: 1, height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${p}%`, height: "100%", background: TEAL, borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 11, color: NAVY, fontWeight: "bold", width: 40, textAlign: "right" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 12 }}>Sector intelligence heatmap</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {[["Finance", "High", "#E24B4A"], ["Healthcare", "Medium", "#EF9F27"], ["Public sector", "Medium", "#EF9F27"], ["Manufacturing", "Low", "#1D9E75"], ["Retail", "Low", "#1D9E75"]].map(([s, l, c]) => (
                  <div key={s} style={{ height: 62, background: c, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: "bold", color: "#fff" }}>{s}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.8)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 12 }}>Future outlook</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[["Next 6 months", "AI Act enforcement ramps up. DORA audits peak. Major compliance advisory demand.", "#E6F1FB", "#185FA5"], ["Next 12 months", "AI Governance market matures. Sovereign AI hosting becomes standard. NIS2 audits expand.", "#E1F5EE", "#0F6E56"], ["Next 3 years", "AI regulation stabilises. New frameworks for autonomous AI. Italy digital transformation 2.0.", "#EEEDFE", "#3C3489"]].map(([period, text, bg, color]) => (
                  <div key={period} style={{ background: bg, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: "bold", color, marginBottom: 6 }}>{period}</div>
                    <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {/* ── SHAREPOINT ── */}
          {activeNav === "sharepoint" && <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: -4 }}>
              <div style={{ background: "#038387", width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: "#fff" }}>S</div>
              <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>SharePoint — AI Intelligence Knowledge Hub</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[["Documents", "24", "6 updated this week", TEAL], ["Playbooks", "8", "AI & compliance", "#185FA5"], ["Templates", "12", "Ready to use", "#0F6E56"], ["Team members", "42", "With access", "#854F0B"]].map(([l, v, s, c]) => (
                <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "0.5px solid #e8e8e8" }}>
                  <div style={{ fontSize: 11, color: "#888" }}>{l}</div>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: NAVY, marginTop: 4 }}>{v}</div>
                  <div style={{ fontSize: 11, color: c, marginTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8" }}>
              <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #f0f0f0", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: "bold", color: NAVY }}>📁 Recent documents</span>
                <input placeholder="Search knowledge base..." style={{ marginLeft: "auto", fontSize: 12, padding: "5px 12px", border: "0.5px solid #ddd", borderRadius: 20, outline: "none", width: 200 }} />
              </div>
              {SHAREPOINT_DOCS.map((doc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: i < SHAREPOINT_DOCS.length - 1 ? "0.5px solid #f5f5f5" : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: 20 }}>{doc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#222" }}>{doc.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Updated {doc.updated}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: doc.tagBg, color: doc.tagColor, fontWeight: "bold" }}>{doc.tag}</span>
                  <button style={{ fontSize: 11, padding: "4px 12px", border: `0.5px solid #ddd`, borderRadius: 20, cursor: "pointer", background: "transparent", color: "#555" }}>Open</button>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "0.5px solid #e8e8e8" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 12 }}>🚀 Quick actions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[["Create new playbook", TEAL], ["Upload intelligence report", "#185FA5"], ["Share with team", "#0F6E56"]].map(([label, color]) => (
                  <button key={label} style={{ background: color, color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, cursor: "pointer", fontWeight: "bold" }}>{label}</button>
                ))}
              </div>
            </div>
          </>}

          {/* ── COPILOT ── */}
          {activeNav === "copilot" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%", minHeight: 500 }}>
              <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8", padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: NAVY, marginBottom: 10 }}>✦ Copilot — Ask anything about your intelligence data</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {COPILOT_STARTERS.map((s, i) => (
                    <button key={i} onClick={() => { setActiveNav("copilot"); sendCopilot(s); }}
                      style={{ fontSize: 11, padding: "6px 14px", borderRadius: 20, border: `0.5px solid ${TEAL}`, background: ACCENT, color: TEAL, cursor: "pointer", fontWeight: "bold" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1, background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {copilotMessages.map((msg, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                      {msg.from === "bot" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: LTEAL, fontWeight: "bold", flexShrink: 0 }}>✦</div>}
                      <div style={{ maxWidth: "72%", background: msg.from === "user" ? NAVY : "#f8f9fa", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: msg.from === "user" ? "#fff" : "#333", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                        {msg.text}
                      </div>
                      {msg.from === "user" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: data.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", color: data.color, flexShrink: 0 }}>AA</div>}
                    </div>
                  ))}
                  {copilotLoading && (
                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: LTEAL, fontWeight: "bold" }}>✦</div>
                      <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "#aaa" }}>Analysing intelligence data…</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div style={{ padding: "10px 14px", borderTop: "0.5px solid #f0f0f0", display: "flex", gap: 8 }}>
                  <input value={copilotInput} onChange={e => setCopilotInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendCopilot()}
                    placeholder="Ask about regulations, clients, opportunities…"
                    style={{ flex: 1, fontSize: 12, padding: "8px 14px", border: "0.5px solid #ddd", borderRadius: 20, outline: "none" }} />
                  <button onClick={() => sendCopilot()}
                    style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 20, padding: "8px 18px", fontSize: 12, cursor: "pointer", fontWeight: "bold" }}>Send</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
