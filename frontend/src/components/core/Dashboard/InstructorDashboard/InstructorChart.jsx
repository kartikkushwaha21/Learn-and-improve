import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(...registerables)

const CHART_COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#F59E0B",
  "#10B981",
  "#F43F5E",
  "#8B5CF6",
  "#0F172A",
  "#14B8A6",
]

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(value || 0)

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const datasetItems = courses.map((course, index) => ({
    name: course.courseName,
    value:
      currChart === "students"
        ? course.totalStudentsEnrolled
        : course.totalAmountGenerated,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }))

  const chartData = {
    labels: datasetItems.map((item) => item.name),
    datasets: [
      {
        data: datasetItems.map((item) => item.value),
        backgroundColor: datasetItems.map((item) => item.color),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Performance
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Revenue and learner distribution
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            The chart stays inside its card and the legend is separated for a
            cleaner, more balanced dashboard layout.
          </p>
        </div>

        <div className="inline-flex rounded-full bg-slate-100 p-1">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              currChart === "students"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              currChart === "income"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-center">
        <div className="flex items-center justify-center overflow-hidden rounded-[24px] bg-slate-50 p-6">
          <div className="relative h-[280px] w-full max-w-[320px] sm:h-[340px] sm:max-w-[360px]">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        <div className="rounded-[24px] bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Breakdown
          </p>
          <div className="mt-5 max-h-[340px] space-y-3 overflow-auto pr-1">
            {datasetItems.map((item) => (
              <div
                key={`${currChart}-${item.name}`}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-slate-950">
                  {currChart === "students"
                    ? formatNumber(item.value)
                    : formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
