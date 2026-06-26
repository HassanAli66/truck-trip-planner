import { Truck, Route } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-[9999] bg-white/90 backdrop-blur border-b border-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
            <Truck className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              RouteWise
            </h1>

            <p className="text-slate-500 text-sm">
              Truck Trip Planner
            </p>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-2 text-slate-500">

          <Route size={18} />

          <span className="text-sm">
            FMCSA HOS Planner
          </span>

        </div>

      </div>
    </header>
  );
}
