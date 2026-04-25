// Blue theme tokens (findmyidealpillow.com)
const t = {
  background: "#f7faff",
  surface: "#eaf0fa",
  border: "#c7d3e6",
  textPrimary: "#1a2340",
  textSecondary: "#4b5876",
  accent: "#2563eb",
};

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100svh",
        background: t.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 440,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, color: t.textPrimary, margin: 0 }}>
          FindMyIdealPillow
        </h1>
        <p style={{ fontSize: 18, color: t.textSecondary, margin: 0 }}>
          Something great is coming soon.
        </p>
        <div
          style={{
            width: 48,
            height: 3,
            borderRadius: 2,
            background: t.accent,
            margin: "8px 0",
          }}
        />
        <p
          style={{
            fontSize: 14,
            color: t.textSecondary,
            margin: 0,
            maxWidth: 320,
          }}
        >
          {`We're building a free, personalised pillow recommendation tool.
          Answer a few questions about how you sleep and we'll match you
          to the perfect pillow. Check back soon.`}
        </p>
        <a
          href="https://findmyideal.info"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 24,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: t.textSecondary,
            textDecoration: "none",
            border: `1px solid ${t.border}`,
            borderRadius: 20,
            padding: "4px 12px",
            opacity: 0.75,
          }}
        >
          {String.fromCodePoint(0x26A1)} Powered by <strong style={{ marginLeft: 2 }}>FindMyIdeal</strong>
        </a>
      </main>
    </div>
  );
}
