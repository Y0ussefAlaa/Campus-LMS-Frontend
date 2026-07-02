import { LayoutGrid, Laptop, Users } from "lucide-react";

const AppMockup = () => {
  return (
    <div id="preview" className="animate-float mx-auto w-full max-w-4xl px-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-blue-500/10 dark:shadow-black/30">
        <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex h-7 w-64 max-w-[60%] items-center justify-center rounded-lg bg-card text-xs text-muted shadow-inner">
            campus.app/dashboard
          </div>
        </div>

        <div className="flex min-h-70 bg-surface sm:min-h-80">
          <aside className="hidden w-16 shrink-0 flex-col gap-3 border-r border-border bg-card p-3 sm:flex lg:w-44 lg:p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-linear-to-br from-brand to-brand-light" />
              <span className="hidden text-xs font-bold text-heading lg:inline">
                Campus
              </span>
            </div>
            {[LayoutGrid, Users, Laptop].map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg p-2 ${
                  i === 0
                    ? "bg-linear-to-r from-brand to-brand-light text-white"
                    : "text-muted"
                }`}
              >
                <Icon size={16} />
                <span className="hidden text-xs font-medium lg:inline">
                  {["Dashboard", "Students", "Courses"][i]}
                </span>
              </div>
            ))}
          </aside>

          <div className="flex-1 p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Dashboard
            </p>
            <h4 className="mt-1 text-lg font-bold text-heading sm:text-xl">
              Welcome back
            </h4>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Students",
                  value: "2,000",
                  color: "from-blue-500 to-blue-400",
                },
                {
                  label: "Courses",
                  value: "84",
                  color: "from-sky-500 to-sky-400",
                },
                {
                  label: "Tasks",
                  value: "312",
                  color: "from-indigo-500 to-indigo-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-3 shadow-sm"
                >
                  <p className="text-[10px] font-medium text-muted sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-base font-bold text-heading sm:text-lg">
                    {stat.value}
                  </p>
                  <div
                    className={`mt-2 h-1 w-full rounded-full bg-linear-to-r ${stat.color} opacity-60`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {[85, 72, 91].map((pct, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-alt px-3 py-2 text-xs shadow-sm"
                >
                  <span className="text-muted">
                    {["Course Progress", "Attendance", "Assignments"][i]}
                  </span>
                  <span className="font-semibold text-brand">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppMockup;
