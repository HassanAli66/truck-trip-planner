import { useState } from "react";
import {
  Navigation,
  Package,
  Flag,
  Clock3,
  Route,
} from "lucide-react";

import Card from "../common/Card";

function InputField({
  icon,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="relative">

      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-slate-50
          pl-12
          pr-4
          py-3
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

    </div>
  );
}

export default function TripForm({ onSubmit, loading }) {

  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    cycle_used_hours: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (

    <Card className="p-6 h-full flex flex-col">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">

          <Route className="text-white"/>

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Plan Trip
          </h2>

          <p className="text-slate-500 text-sm">
            Generate an optimized truck route
          </p>

        </div>

      </div>

        <form
	    onSubmit={submit}
	    className="flex flex-col gap-4 flex-1"
	>

        <InputField
          icon={<Navigation size={18}/>}
          placeholder="Current Location"
          name="current_location"
          value={form.current_location}
          onChange={handleChange}
        />

        <InputField
          icon={<Package size={18}/>}
          placeholder="Pickup Location"
          name="pickup_location"
          value={form.pickup_location}
          onChange={handleChange}
        />

        <InputField
          icon={<Flag size={18}/>}
          placeholder="Dropoff Location"
          name="dropoff_location"
          value={form.dropoff_location}
          onChange={handleChange}
        />

        <InputField
          icon={<Clock3 size={18}/>}
          placeholder="Cycle Used (Hours)"
          name="cycle_used_hours"
          type="number"
          value={form.cycle_used_hours}
          onChange={handleChange}
        />
        <div className="mt-auto pt-4">
        <button
          disabled={loading}
          className="
            w-full
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            font-semibold
            transition-all
            hover:scale-[1.02]
            active:scale-100
            disabled:opacity-50
            shadow-lg
          "
        >
          {loading ? "Planning Route..." : "Generate Route"}
        </button>
        </div>

      </form>

    </Card>

  );

}
