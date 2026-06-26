import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, {
        padding: [40, 40],
      });
    }
  }, [positions, map]);

  return null;
}

export default function RouteMap({ routeData }) {
  const center = [39.8283, -98.5795];

  const route = routeData?.route;
  const positions =
  route?.geometry?.coordinates?.map(([lng, lat]) => [lat, lng]) || [];

  const [animatedPositions, setAnimatedPositions] = useState([]);
  useEffect(() => {

	  if (!positions.length) {
		  setAnimatedPositions([]);
		  return;
		}

		const duration = 1000; // milliseconds

		let animationFrame;
		let startTime = null;

		function animate(timestamp) {

		  if (!startTime)
		    startTime = timestamp;

		  const progress = Math.min(
		    (timestamp - startTime) / duration,
		    1
		  );

		  const points = Math.ceil(
		    progress * positions.length
		  );

		  setAnimatedPositions(
		    positions.slice(0, points)
		  );

		  if (progress < 1) {
		    animationFrame = requestAnimationFrame(animate);
		  }

		}

		animationFrame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrame);

	}, [route]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 h-[620px]">
      <div className="flex justify-between items-center mb-5">

        <div>

            <h2 className="text-2xl font-bold">
                Interactive Route
            </h2>

            <p className="text-slate-500">
                OpenStreetMap + OSRM Routing
            </p>

        </div>

    </div>
	{routeData && (

	<div className="grid grid-cols-3 gap-3 mb-5">

	<div className="rounded-xl bg-blue-50 p-3">

	<p className="text-xs text-slate-500">

	Distance

	</p>

	<p className="font-bold text-xl">

	{routeData.route.distance_miles} mi

	</p>

	</div>

	<div className="rounded-xl bg-green-50 p-3">

	<p className="text-xs text-slate-500">

	Drive Time

	</p>

	<p className="font-bold text-xl">

	{routeData.route.duration_hours} h

	</p>

	</div>

	<div className="rounded-xl bg-orange-50 p-3">

	<p className="text-xs text-slate-500">

	Trip Days

	</p>

	<p className="font-bold text-xl">

	{routeData.hos.trip_days}

	</p>

	</div>

	</div>

	)}
      <MapContainer
        center={center}
        zoom={4}
        className="h-[395px] rounded-2xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FitBounds positions={positions} />

        {animatedPositions.length > 0 && (
          <Polyline
            positions={animatedPositions}
		pathOptions={{
		    color:"#2563EB",
		    weight:7,
		    opacity:0.9,
		    lineCap:"round",
		    lineJoin:"round",
		}}
			  />
        )}

        {route && (
          <>
            <Marker position={[route.current.lat, route.current.lng]}>
		<Popup>

		    <div className="text-center">

			<strong>
			    🚛 Current Position
			</strong>

		    </div>

		</Popup>
            </Marker>

            <Marker position={[route.pickup.lat, route.pickup.lng]}>
              <Popup>📦 Pickup Location</Popup>
            </Marker>

            <Marker position={[route.dropoff.lat, route.dropoff.lng]}>
              <Popup>🏁 Destination</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
