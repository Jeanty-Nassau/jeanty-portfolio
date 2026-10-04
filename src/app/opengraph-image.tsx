import { ImageResponse } from "next/og";

export const alt = "Jeanty Nassau — Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1847ff",
          color: "#f7f7f2",
          padding: "64px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(247,247,242,0.25)",
            paddingBottom: "24px",
            fontSize: "22px",
          }}
        >
          <span>JEANTY NASSAU</span>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.12em",
              opacity: 0.65,
            }}
          >
            SOFTWARE DEVELOPER / CAPE TOWN
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ff991c",
              fontSize: "18px",
              letterSpacing: "0.12em",
              marginBottom: "28px",
            }}
          >
            BACKEND / DISTRIBUTED SYSTEMS / CREATIVE CODE
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "1000px",
              fontSize: "96px",
              lineHeight: 0.88,
              letterSpacing: "-0.06em",
              fontWeight: 700,
            }}
          >
            Building systems that move.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(247,247,242,0.25)",
            paddingTop: "24px",
            fontSize: "15px",
            letterSpacing: "0.1em",
            opacity: 0.65,
          }}
        >
          <span>.NET / AWS / KAFKA / POSTGRESQL</span>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#ff991c",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
