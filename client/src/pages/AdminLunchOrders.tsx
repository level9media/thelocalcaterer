/**
 * Admin Lunch Orders Dashboard
 * Protected — only accessible to josh@ and kasandra@thelocalcaterer.com
 * URL: /admin/lunch-orders
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Loader2,
  UtensilsCrossed,
  LogIn,
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";

const ADMIN_EMAILS = ["josh@thelocalcaterer.com", "kasandra@thelocalcaterer.com", "robertgray@gmail.com"];

// Mirror of AUGUST_MENU from lunchRouter.ts — confirmed dates from Josh Bakken
const AUGUST_MENU = [
  { id: "aug-wed-5", day: "Wednesday", date: "August 5, 2026", name: "Chicken Tenders" },
  { id: "aug-mon-10", day: "Monday", date: "August 10, 2026", name: "Ham & Cheese Hoagie" },
  { id: "aug-wed-12", day: "Wednesday", date: "August 12, 2026", name: "BBQ Pulled Chicken" },
  { id: "aug-mon-17", day: "Monday", date: "August 17, 2026", name: "Chicken Quesadilla" },
  { id: "aug-wed-19", day: "Wednesday", date: "August 19, 2026", name: "Chicken Tenders" },
  { id: "aug-mon-24", day: "Monday", date: "August 24, 2026", name: "Turkey & Cheese Hoagie" },
  { id: "aug-wed-26", day: "Wednesday", date: "August 26, 2026", name: "Chicken Alfredo Pasta" },
  { id: "aug-mon-31", day: "Monday", date: "August 31, 2026", name: "Cheese Quesadilla" },
];

function expandMealIds(selectedMeals: unknown): { id: string; day: string; date: string; name: string; qty: number }[] {
  const ids = Array.isArray(selectedMeals) ? selectedMeals as string[] : [];
  // Collapse duplicates into qty
  const qtyMap: Record<string, number> = {};
  for (const id of ids) qtyMap[id] = (qtyMap[id] || 0) + 1;
  return Object.entries(qtyMap)
    .map(([id, qty]) => {
      const meal = AUGUST_MENU.find((m) => m.id === id);
      return meal ? { ...meal, qty } : null;
    })
    .filter(Boolean) as { id: string; day: string; date: string; name: string; qty: number }[];
}

type SortField = "createdAt" | "studentName" | "mealDate" | "totalCents";
type SortDir = "asc" | "desc";

function formatDate(dateStr: string | Date) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function downloadCSV(rows: any[]) {
  if (!rows.length) return;
  const headers = ["Order Date", "Parent Name", "Email", "Student Name", "Allergies", "Meals Selected", "Total Paid", "Status"];
  const lines = rows.map((r) => {
    const expandedMeals = expandMealIds(r.selectedMeals);
    const meals = expandedMeals.map((m) => m.qty > 1 ? `${m.day} ${m.date}: ${m.name} ×${m.qty}` : `${m.day} ${m.date}: ${m.name}`).join(" | ");
    return [
      formatDate(r.createdAt),
      r.parentName,
      r.email,
      r.studentName,
      r.allergies || "",
      meals,
      formatCents(r.totalCents),
      r.paymentStatus,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
  });
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lunch-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminLunchOrders() {
  const { user, loading: authLoading } = useAuth();
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterMeal, setFilterMeal] = useState<string>("all");

  const isAdmin =
    user?.role === "admin" || ADMIN_EMAILS.includes(user?.email ?? "");

  const { data, isLoading, refetch, isRefetching } = trpc.lunch.getOrders.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const { data: byMealData } = trpc.lunch.getOrdersByMeal.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp size={12} style={{ color: "#CCC" }} />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} style={{ color: "#2D6A4F" }} />
    ) : (
      <ChevronDown size={12} style={{ color: "#2D6A4F" }} />
    );
  };

  const allOrders = Array.isArray(data) ? data : [];

  // Collect all unique meal dates for filter dropdown
  const mealDates = useMemo(() => {
    const dates = new Set<string>();
    allOrders.forEach((o: any) => {
      expandMealIds(o.selectedMeals).forEach((m) => dates.add(`${m.day} ${m.date}`));
    });
    return Array.from(dates).sort();
  }, [allOrders]);

  const filteredOrders = useMemo(() => {
    let orders = [...allOrders];
    if (filterMeal !== "all") {
      orders = orders.filter((o) =>
        expandMealIds(o.selectedMeals).some((m) => `${m.day} ${m.date}` === filterMeal)
      );
    }
    orders.sort((a, b) => {
      let av: any, bv: any;
      if (sortField === "createdAt") {
        av = new Date(a.createdAt).getTime();
        bv = new Date(b.createdAt).getTime();
      } else if (sortField === "studentName") {
        av = a.studentName.toLowerCase();
        bv = b.studentName.toLowerCase();
      } else if (sortField === "totalCents") {
        av = a.totalCents;
        bv = b.totalCents;
      } else if (sortField === "mealDate") {
        // Sort by first meal date
        const aMeals = expandMealIds(a.selectedMeals);
        const bMeals = expandMealIds(b.selectedMeals);
        av = aMeals[0]?.date ?? "";
        bv = bMeals[0]?.date ?? "";
      } else {
        av = "";
        bv = "";
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return orders;
  }, [allOrders, filterMeal, sortField, sortDir]);

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalCents, 0);

  // Auth guard
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5EFE0" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "#2D6A4F" }} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="text-center max-w-sm mx-4">
          <AlertCircle size={48} style={{ color: "#C1440E" }} className="mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Access Denied
          </h1>
          <p className="text-sm mb-6" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
            This page is only accessible to authorized administrators.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => { window.location.href = getLoginUrl(); }}
              className="w-full flex items-center justify-center gap-2"
              style={{ backgroundColor: "#2D6A4F", color: "#fff" }}
            >
              <LogIn size={16} /> Sign In
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2D6A4F" }} className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Link href="/admin/leads">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ArrowLeft size={18} color="white" />
                </button>
              </Link>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "rgba(245,239,224,0.6)", fontFamily: "'Outfit', sans-serif" }}>
                  Admin
                </p>
                <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
                  Student Lunch Orders
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: "rgba(245,239,224,0.9)", fontFamily: "'Outfit', sans-serif" }}
              >
                <RefreshCw size={14} className={isRefetching ? "animate-spin" : ""} />
                Refresh
              </button>
              <button
                onClick={() => downloadCSV(filteredOrders)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: "#C1440E", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
              >
                <Download size={14} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: allOrders.length.toString() },
            { label: "Filtered Orders", value: filteredOrders.length.toString() },
            { label: "Total Revenue", value: formatCents(totalRevenue) },
            { label: "Avg Order", value: filteredOrders.length ? formatCents(Math.round(totalRevenue / filteredOrders.length)) : "$0.00" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg p-4 border" style={{ backgroundColor: "#fff", borderColor: "#E8DFC8" }}>
              <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                {stat.label}
              </p>
              <p className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* By Meal Summary */}
        {byMealData && byMealData.length > 0 && (() => {
          // Group flat rows by mealDate for kitchen summary
          const grouped: Record<string, { day: string; date: string; name: string; count: number }> = {};
          byMealData.forEach((row) => {
            const key = row.mealDate;
            if (!grouped[key]) {
              grouped[key] = { day: row.mealDay, date: row.mealDate, name: row.mealName, count: 0 };
            }
            grouped[key].count++;
          });
          const groupedRows = Object.values(grouped);
          return (
            <div className="rounded-lg border mb-8 overflow-hidden" style={{ borderColor: "#E8DFC8" }}>
              <div className="px-5 py-4 border-b" style={{ backgroundColor: "#EDE6D3", borderColor: "#E8DFC8" }}>
                <h2 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                  <UtensilsCrossed size={18} style={{ color: "#2D6A4F" }} />
                  Orders by Meal (Kitchen View)
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F5EFE0" }}>
                      <th className="text-left px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>Day</th>
                      <th className="text-left px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>Meal</th>
                      <th className="text-right px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>Portions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedRows.map((m, i) => (
                      <tr key={m.date} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAF7" }}>
                        <td className="px-5 py-3" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                          {m.day} · {m.date}
                        </td>
                        <td className="px-5 py-3" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                          {m.name}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>
                          {m.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* Filter + Table */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#E8DFC8" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between gap-4 flex-wrap" style={{ backgroundColor: "#EDE6D3", borderColor: "#E8DFC8" }}>
            <h2 className="text-lg font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              All Orders
            </h2>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                Filter by Meal:
              </label>
              <select
                value={filterMeal}
                onChange={(e) => setFilterMeal(e.target.value)}
                className="text-sm rounded-lg px-3 py-1.5 border"
                style={{ borderColor: "#E8DFC8", fontFamily: "'Outfit', sans-serif", backgroundColor: "#fff" }}
              >
                <option value="all">All Meals</option>
                {mealDates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin" size={32} style={{ color: "#2D6A4F" }} />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <UtensilsCrossed size={40} style={{ color: "#CCC" }} className="mx-auto mb-3" />
              <p className="text-base" style={{ color: "#AAA", fontFamily: "'Outfit', sans-serif" }}>
                No orders found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F5EFE0" }}>
                    <th
                      className="text-left px-5 py-3 font-semibold cursor-pointer hover:text-[#2D6A4F] select-none"
                      style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}
                      onClick={() => toggleSort("createdAt")}
                    >
                      <span className="flex items-center gap-1">Order Date <SortIcon field="createdAt" /></span>
                    </th>
                    <th
                      className="text-left px-5 py-3 font-semibold cursor-pointer hover:text-[#2D6A4F] select-none"
                      style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}
                      onClick={() => toggleSort("studentName")}
                    >
                      <span className="flex items-center gap-1">Student <SortIcon field="studentName" /></span>
                    </th>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                      Parent / Email
                    </th>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                      Meals
                    </th>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                      Allergies
                    </th>
                    <th
                      className="text-right px-5 py-3 font-semibold cursor-pointer hover:text-[#2D6A4F] select-none"
                      style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}
                      onClick={() => toggleSort("totalCents")}
                    >
                      <span className="flex items-center gap-1 justify-end">Total <SortIcon field="totalCents" /></span>
                    </th>
                    <th className="text-center px-5 py-3 font-semibold" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => (
                    <tr
                      key={order.id}
                      style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAF7" }}
                      className="hover:bg-[#EAF4EE] transition-colors"
                    >
                      <td className="px-5 py-3 whitespace-nowrap" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                        {String(formatDate(order.createdAt as any))}
                      </td>
                      <td className="px-5 py-3 font-semibold" style={{ color: "#1A1A1A", fontFamily: "'Outfit', sans-serif" }}>
                        {order.studentName}
                      </td>
                      <td className="px-5 py-3" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                        <div>{order.parentName}</div>
                        <div className="text-xs" style={{ color: "#888" }}>{order.email}</div>
                      </td>
                      <td className="px-5 py-3" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                        {(() => {
                          const meals = expandMealIds(order.selectedMeals);
                          return meals.length > 0 ? (
                            <ul className="space-y-0.5">
                              {meals.map((m, mi) => (
                                <li key={mi} className="text-xs flex items-center gap-1">
                                  <span className="font-semibold" style={{ color: "#2D6A4F" }}>{m.day} {m.date}:</span>{" "}
                                  {m.name}
                                  {m.qty > 1 && (
                                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#2D6A4F", color: "#fff" }}>×{m.qty}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-xs" style={{ color: "#AAA" }}>—</span>
                          );
                        })()}
                      </td>
                      <td className="px-5 py-3" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                        {order.allergies ? (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF3CD", color: "#856404" }}>
                            {order.allergies}
                          </span>
                        ) : (
                          <span className="text-xs" style={{ color: "#CCC" }}>None</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold whitespace-nowrap" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                        {formatCents(order.totalCents)}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor:
                              order.paymentStatus === "paid"
                                ? "#D1FAE5"
                                : order.paymentStatus === "failed"
                                ? "#FEE2E2"
                                : "#FEF3C7",
                            color:
                              order.paymentStatus === "paid"
                                ? "#065F46"
                                : order.paymentStatus === "failed"
                                ? "#991B1B"
                                : "#92400E",
                          }}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
