import {
    Route,
    Clock3,
    CalendarDays,
    Fuel,
    Coffee,
    Gauge
} from "lucide-react";
import Card from "../common/Card";

function Metric({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        {icon}

      </div>

      <h2 className="text-3xl font-bold mt-4 text-slate-900">
        {value}
      </h2>

    </div>
  );
}
export default function SummaryCard({ routeData }) {

  if (!routeData) {

    return (

      <Card className="p-6">

        <h2 className="text-xl font-semibold">
          Trip Summary
        </h2>

        <p className="mt-3 text-slate-500">
          Generate a route to see trip statistics.
        </p>

      </Card>

    );

  }

  const route = routeData.route;
  const hos = routeData.hos;

  return (

    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        Trip Summary
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">

	<Metric
	    title="Distance"
	    value={`${route.distance_miles} mi`}
	    icon={<Route size={20}/>}
	/>

	<Metric
	    title="Drive Time"
	    value={`${route.duration_hours} h`}
	    icon={<Clock3 size={20}/>}
	/>

	<Metric
	    title="Trip Days"
	    value={hos.trip_days}
	    icon={<CalendarDays size={20}/>}
	/>

	<Metric
	    title="Fuel Stops"
	    value={hos.fuel_stops}
	    icon={<Fuel size={20}/>}
	/>

	<Metric
	    title="Breaks"
	    value={hos.rest_stops}
	    icon={<Coffee size={20}/>}
	/>

	<Metric
	    title="Cycle Left"
	    value={`${hos.cycle_remaining} h`}
	    icon={<Gauge size={20}/>}
	/>

      </div>

    </Card>

  );

}
