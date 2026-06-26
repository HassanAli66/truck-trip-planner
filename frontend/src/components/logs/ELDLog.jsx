import Card from "../common/Card";
import ELDChart from "./ELDChart";


import {
  Printer,
  Route,
  Package,
  Flag,
  Fuel,
  Coffee,
  Moon,
  Clock3,
} from "lucide-react";

function EventIcon({ activity }) {
  switch (activity) {
    case "Driving":
      return <Route className="text-blue-600" size={20} />;

    case "Pickup":
      return <Package className="text-amber-600" size={20} />;

    case "Dropoff":
      return <Flag className="text-green-600" size={20} />;

    case "Fuel Stop":
      return <Fuel className="text-cyan-600" size={20} />;

    case "Break":
      return <Coffee className="text-purple-600" size={20} />;

    case "10 Hour Reset":
      return <Moon className="text-slate-600" size={20} />;

    default:
      return <Clock3 className="text-slate-600" size={20} />;
  }
}

function Badge({ activity }) {
  const colors = {
    Driving: "bg-blue-100 text-blue-700",
    Pickup: "bg-amber-100 text-amber-700",
    Dropoff: "bg-green-100 text-green-700",
    "Fuel Stop": "bg-cyan-100 text-cyan-700",
    Break: "bg-purple-100 text-purple-700",
    "10 Hour Reset": "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`w-3 h-3 rounded-full inline-block ${
        colors[activity]
      }`}
    />
  );
}

function duration(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
}

export default function ELDLog({ routeData }) {
  if (!routeData) return null;

  const timeline = routeData.hos.timeline;

  return (
    <Card className="p-6">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            Driver Activity Timeline
          </h2>

          <p className="text-slate-500">
            FMCSA Hours of Service Visualization
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 transition"
        >
          <Printer size={18} />
          Print
        </button>

      </div>

      <div className="mt-8">
        <ELDChart timeline={timeline} />
      </div>

      <div className="mt-10">

        <h3 className="text-xl font-bold mb-5">
          Event Timeline
        </h3>

        <div className="space-y-4">

          {timeline.map((event, index) => {

            const hrs = duration(event.start, event.end);

            return (

              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition p-5"
              >

                <div className="flex justify-between items-start">

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

                      <EventIcon activity={event.activity} />

                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h4 className="font-semibold text-lg">

                          {event.activity}

                        </h4>

                        <Badge  />

                      </div>

                      <p className="text-sm text-slate-500 mt-1">

                        Day {event.day}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">

                      {event.start} - {event.end}

                    </p>

                    <p className="text-sm text-slate-500">

                      {hrs.toFixed(1)} hrs

                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </Card>
  );
}
