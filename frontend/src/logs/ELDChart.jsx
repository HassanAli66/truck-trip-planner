import { useMemo } from "react";
import useAnimateOnView from "./useAnimateOnView";

const ROWS = [
  "OFF DUTY",
  "SLEEPER",
  "DRIVING",
  "ON DUTY",
];

const COLORS = {
  Driving: "#2563EB",
  Pickup: "#F59E0B",
  Dropoff: "#22C55E",
  "Fuel Stop": "#06B6D4",
  Break: "#A855F7",
  "10 Hour Reset": "#64748B",
};

function getRow(activity) {
  if (activity === "Driving") return "DRIVING";

  if (
    activity === "Pickup" ||
    activity === "Dropoff" ||
    activity === "Fuel Stop"
  )
    return "ON DUTY";

  if (activity === "Break")
    return "OFF DUTY";

  return "OFF DUTY";
}

function toHour(time) {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

export default function ELDChart({ timeline }) {

  const { ref, visible } = useAnimateOnView();

  const width = 980;
  const left = 120;
  const hourWidth = 34;
  const rowHeight = 58;
  const top = 35;

  const events = useMemo(() => {

    return timeline.map(event => ({

      ...event,

      row: getRow(event.activity),

      start: toHour(event.start),

      end: toHour(event.end),

    }));

  }, [timeline]);

  return (

  <div ref={ref}>

    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-x-auto"
    >

      <svg
        width={width}
        height={320}
      >

        {/* hour labels */}

        {Array.from({ length: 24 }).map((_, i) => (

          <g key={i}>

            <line
              x1={left + i * hourWidth}
              y1={top}
              x2={left + i * hourWidth}
              y2={280}
              stroke="#E2E8F0"
            />

            <text
              x={left + i * hourWidth + hourWidth / 2}
              y="20"
              fontSize="12"
              textAnchor="middle"
              fill="#64748B"
            >
              {i}
            </text>

          </g>

        ))}

        {/* row labels */}

        {ROWS.map((row, index) => (

          <g key={row}>

            <text
              x="12"
              y={top + index * rowHeight + 34}
              fontSize="13"
              fontWeight="600"
              fill="#334155"
            >
              {row}
            </text>

            <line
              x1={left}
              x2={left + 24 * hourWidth}
              y1={top + index * rowHeight + rowHeight / 2}
              y2={top + index * rowHeight + rowHeight / 2}
              stroke="#CBD5E1"
            />

          </g>

        ))}

        {/* activity bars */}

        {events.map((event, index) => {

          const row = ROWS.indexOf(event.row);

          const x =
            left +
            event.start * hourWidth;

          const w =
            (event.end - event.start) *
            hourWidth;

          const y =
            top +
            row * rowHeight +
            17;

          return (

            <rect
              key={index}
              x={x}
              y={y}
              rx="8"
              ry="8"
              height="22"
              width={visible ? w : 0}
              opacity={visible ? 1 : 0}
              fill={
                COLORS[event.activity] ??
                "#64748B"
              }
              style={{
		    transition: `width 900ms ease ${index * 150}ms,
				 opacity 400ms ease ${index * 150}ms`
		}}
            />

          );

        })}

            </svg>

    </div>

  </div>

  );

}
