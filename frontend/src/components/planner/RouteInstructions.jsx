import Card from "../common/Card";

export default function RouteInstructions({ routeData }) {
  if (!routeData) return null;

  const route = routeData.route;
  const hos = routeData.hos;

  const instructions = [
    {
      title: "Start",
      description: "Leave current location",
    },
    {
      title: "Drive to Pickup",
      description: `Drive to pickup location`,
    },
    {
      title: "Pickup",
      description: "Load freight (1 hour)",
    },
    {
      title: "Main Route",
      description: `${route.distance_miles} miles (${route.duration_hours} hours)`,
    },
    {
      title: "Fuel Stops",
      description: `${hos.fuel_stops} planned`,
    },
    {
      title: "Mandatory Breaks",
      description: `${hos.rest_stops} planned`,
    },
    {
      title: "Arrival",
      description: "Arrive at destination",
    },
    {
      title: "Dropoff",
      description: "Unload freight (1 hour)",
    },
  ];

  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        Route Instructions
      </h2>

      <div className="space-y-4">

        {instructions.map((step, index) => (

          <div
            key={index}
            className="flex gap-4"
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold
                shrink-0
              "
            >
              {index + 1}
            </div>

            <div>

              <h3 className="font-semibold">
                {step.title}
              </h3>

              <p className="text-slate-500">
                {step.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}
