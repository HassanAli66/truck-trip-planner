import { useMemo } from "react";

const ROWS = [
  "OFF DUTY",
  "SLEEPER",
  "DRIVING",
  "ON DUTY",
];

const COLORS = {
  "OFF DUTY": "#64748b",
  "SLEEPER": "#8b5cf6",
  "DRIVING": "#2563eb",
  "ON DUTY": "#f59e0b",
};

function getRow(activity) {

  if (activity === "Driving")
    return "DRIVING";

  if (
    activity === "Pickup" ||
    activity === "Dropoff" ||
    activity === "Fuel Stop"
  )
    return "ON DUTY";

  if (
    activity === "Break" ||
    activity === "10 Hour Reset"
  )
    return "OFF DUTY";

  return "OFF DUTY";

}

function toHour(time) {

  const [h, m] = time.split(":").map(Number);

  return h + m / 60;

}

export default function ELDGrid({ timeline }) {

  const WIDTH = 1200;
  const LEFT = 120;
  const HOUR = 42;
  const ROW_HEIGHT = 60;
  const TOP = 40;

  const events = useMemo(() => {

    return timeline.map(event => ({

      ...event,

      row: getRow(event.activity),

      start: toHour(event.start),

      end: toHour(event.end),

    }));

  }, [timeline]);

  return (

    <div className="rounded-2xl border border-slate-200 bg-white overflow-auto">

      <svg
        width={WIDTH}
        height={330}
      >

        {/* Hour labels */}

        {Array.from({ length: 24 }).map((_, i) => (

          <g key={i}>

            <line

              x1={LEFT + i * HOUR}
              y1={TOP}
              x2={LEFT + i * HOUR}
              y2={300}

              stroke="#E2E8F0"

            />

            <text

              x={LEFT + i * HOUR + HOUR / 2}
              y={22}

              textAnchor="middle"

              fontSize="12"

              fill="#64748B"

            >

              {i}

            </text>

          </g>

        ))}

        {/* Row labels */}

        {ROWS.map((row, index) => (

          <g key={row}>

            <text

              x="15"
              y={TOP + index * ROW_HEIGHT + 35}

              fontSize="14"

              fontWeight="600"

              fill="#334155"

            >

              {row}

            </text>

            <line

              x1={LEFT}
              y1={TOP + index * ROW_HEIGHT + ROW_HEIGHT / 2}
              x2={LEFT + 24 * HOUR}
              y2={TOP + index * ROW_HEIGHT + ROW_HEIGHT / 2}

              stroke="#CBD5E1"
              strokeWidth="2"

            />

          </g>

        ))}

      </svg>

    </div>

  );

}
