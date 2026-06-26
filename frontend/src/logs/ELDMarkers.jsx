import { useMemo } from "react";
import useAnimateOnView from "./useAnimateOnView";
import ELDChart from "./ELDChart";
import ELDMarkers from "./ELDMarkers";

const COLORS = {
  Pickup: "#F59E0B",
  Dropoff: "#22C55E",
  "Fuel Stop": "#06B6D4",
  Break: "#A855F7",
};

function getRow(activity) {
  if (
    activity === "Pickup" ||
    activity === "Dropoff" ||
    activity === "Fuel Stop"
  )
    return 3;

  return 0;
}

function toHour(time) {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

export default function ELDMarkers({ timeline }) {

  const { ref, visible } = useAnimateOnView();

  const left = 120;
  const hourWidth = 34;
  const rowHeight = 58;
  const top = 35;

  const markers = useMemo(() => {

    return timeline
      .filter(event => COLORS[event.activity])
      .map(event => ({

        ...event,

        x: left + toHour(event.start) * hourWidth,

        y:
          top +
          getRow(event.activity) * rowHeight +
          28,

      }));

  }, [timeline]);

  return (

    <svg
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="320"
    >

      {markers.map((marker, index) => (

        <g
          key={index}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "scale(1)"
              : "scale(0)",
            transformOrigin: `${marker.x}px ${marker.y}px`,
            transition: `
              opacity 300ms ease ${900 + index * 180}ms,
              transform 300ms ease ${900 + index * 180}ms
            `,
          }}
        >

          <circle
            cx={marker.x}
            cy={marker.y}
            r="7"
            fill={COLORS[marker.activity]}
            stroke="white"
            strokeWidth="3"
          />

          <title>
            {marker.activity}{" "}
            {marker.start} - {marker.end}
          </title>

        </g>

      ))}

    </svg>

  );

}
