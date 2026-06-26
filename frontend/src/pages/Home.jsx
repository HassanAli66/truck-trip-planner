import { useState } from "react";

import Header from "../components/layout/Header";
import TripForm from "../components/planner/TripForm";
import RouteMap from "../components/map/RouteMap";
import SummaryCard from "../components/planner/SummaryCard";
import RouteInstructions from "../components/planner/RouteInstructions";
import LogViewer from "../components/logs/LogViewer";
import ELDLog from "../components/logs/ELDLog";

import { generateRoute } from "../services/api";

export default function Home() {

  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerateTrip(formData) {

    setLoading(true);
    setError("");

    try {

      const data = await generateRoute(formData);

      setRouteData(data);

    } catch (err) {

      console.error(err);

      setError("Failed to generate route.");

      setRouteData(null);

    }

    setLoading(false);

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Top */}

        <section className="grid xl:grid-cols-12 gap-6">

          <div className="xl:col-span-4">

            <TripForm
              loading={loading}
              onSubmit={handleGenerateTrip}
            />

          </div>

          <div className="xl:col-span-8">

            <RouteMap
              routeData={routeData}
            />

          </div>

        </section>

        {/* KPIs */}

        <SummaryCard
          routeData={routeData}
        />

        {/* Instructions + Timeline */}

        <section className="grid lg:grid-cols-2 gap-6">

          <RouteInstructions
            routeData={routeData}
          />

          <LogViewer
            routeData={routeData}
          />

        </section>

        {/* ELD */}

        <ELDLog
          routeData={routeData}
        />

        {error && (

          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">

            {error}

          </div>

        )}

      </main>

    </div>

  );

}
