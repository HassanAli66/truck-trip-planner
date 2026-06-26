import Card from "../common/Card";

export default function LogViewer({ routeData }) {

  return (

    <Card className="p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Driver Timeline
      </h2>

      {!routeData && (

        <p className="text-slate-500">
          Generate a trip first.
        </p>

      )}

      {routeData && (

        <div className="space-y-4">

          {routeData.hos.timeline.map((item, index) => (

            <div
              key={index}
              className="
			flex
			justify-between
			items-center
			rounded-2xl
			border
			border-slate-200
			bg-slate-50
			hover:bg-slate-100
			transition
			p-5
			"
            >

              <div>

                <strong>
                  Day {item.day}
                </strong>

                <div className="text-slate-600">

                  {item.activity}

                </div>

              </div>

              <div className="font-semibold">

                {item.hours} hrs

              </div>

            </div>

          ))}

        </div>

      )}

    </Card>

  );

}
