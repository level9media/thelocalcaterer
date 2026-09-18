/**
 * Student Lunch Ordering System — Parent-Facing Page
 * Hidden from navigation — linked directly from school website
 * URL: /school-lunch
 *
 * Per-meal quantity selectors with dynamic child name inputs per portion.
 * e.g. qty=2 for Chicken Tenders → "Child 1 name" + "Child 2 name" appear inline.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ShoppingCart, AlertCircle, CheckCircle2, Clock, Loader2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SchoolLunch() {
  const params = new URLSearchParams(window.location.search);
  const isSuccess = params.get("success") === "1";
  const isCancelled = params.get("cancelled") === "1";

  // mealQuantities: { [mealId]: quantity }
  const [mealQuantities, setMealQuantities] = useState<Record<string, number>>({});
  // childNames: { [mealId]: string[] } — one name per portion
  const [childNames, setChildNames] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState({
    parentName: "",
    email: "",
    allergies: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: menuData, isLoading } = trpc.lunch.getMenu.useQuery();
  const createCheckout = trpc.lunch.createCheckout.useMutation();

  const setQty = (mealId: string, newQty: number) => {
    const clamped = Math.max(0, Math.min(10, newQty));
    setMealQuantities((prev) => ({ ...prev, [mealId]: clamped }));
    // Resize child name array to match new qty
    setChildNames((prev) => {
      const existing = prev[mealId] ?? [];
      if (clamped === 0) return { ...prev, [mealId]: [] };
      if (clamped > existing.length) {
        return { ...prev, [mealId]: [...existing, ...Array(clamped - existing.length).fill("")] };
      }
      return { ...prev, [mealId]: existing.slice(0, clamped) };
    });
  };

  const setChildName = (mealId: string, index: number, name: string) => {
    setChildNames((prev) => {
      const arr = [...(prev[mealId] ?? [])];
      arr[index] = name;
      return { ...prev, [mealId]: arr };
    });
  };

  const MEAL_PRICE = 12;
  const TAX_RATE = 0.083;

  const totalMeals = Object.values(mealQuantities).reduce((sum, q) => sum + q, 0);
  const subtotal = totalMeals * MEAL_PRICE;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.parentName.trim()) errs.parentName = "Parent name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (totalMeals === 0) errs.meals = "Please select at least one meal";
    // Validate all child name fields are filled
    for (const [mealId, qty] of Object.entries(mealQuantities)) {
      if (qty > 0) {
        const names = childNames[mealId] ?? [];
        for (let i = 0; i < qty; i++) {
          if (!names[i]?.trim()) {
            errs[`child_${mealId}_${i}`] = "required";
          }
        }
      }
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Build selectedMealIds array with duplicates for quantity
    const selectedMealIds: string[] = [];
    for (const [mealId, qty] of Object.entries(mealQuantities)) {
      for (let i = 0; i < qty; i++) selectedMealIds.push(mealId);
    }

    // Build a combined student name string from all child name inputs
    const allChildNames: string[] = [];
    for (const [mealId, qty] of Object.entries(mealQuantities)) {
      if (qty > 0) {
        const names = childNames[mealId] ?? [];
        names.forEach((n) => { if (n.trim() && !allChildNames.includes(n.trim())) allChildNames.push(n.trim()); });
      }
    }
    const studentName = allChildNames.join(", ") || "Student";

    // Build per-meal child name notes for allergies/notes field
    const mealNotes: string[] = [];
    if (menuData) {
      for (const meal of menuData.meals) {
        const qty = mealQuantities[meal.id] ?? 0;
        if (qty > 0) {
          const names = childNames[meal.id] ?? [];
          mealNotes.push(`${meal.name} (${meal.date}): ${names.join(", ")}`);
        }
      }
    }
    const combinedNotes = [
      mealNotes.length > 0 ? `Meal assignments: ${mealNotes.join(" | ")}` : "",
      form.allergies.trim(),
    ].filter(Boolean).join("\n");

    try {
      const result = await createCheckout.mutateAsync({
        parentName: form.parentName,
        email: form.email,
        studentName,
        allergies: combinedNotes || undefined,
        selectedMealIds,
        origin: window.location.origin,
      });
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#2D6A4F" }}>
            <CheckCircle2 size={40} color="white" />
          </div>
          <h1 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
            Order Confirmed!
          </h1>
          <p className="text-base mb-6" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
            Thank you! Your lunch order has been received and payment confirmed. You'll receive a confirmation email shortly.
          </p>
          <p className="text-sm" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
            Meals are served every Monday and Wednesday. Questions? Call{" "}
            <a href="tel:+14807181671" style={{ color: "#2D6A4F" }}>(480) 718-1671</a>
          </p>
        </div>
      </div>
    );
  }

  const hasChildErrors = Object.keys(errors).some((k) => k.startsWith("child_"));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2D6A4F" }} className="py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: "rgba(245,239,224,0.7)", fontFamily: "'Outfit', sans-serif" }}>
            The Local Caterer
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Student Lunch Program — August
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
            <Clock size={14} />
            <span>Meals served every Monday &amp; Wednesday</span>
          </div>
        </div>
      </div>

      {/* Cancelled notice */}
      {isCancelled && (
        <div className="max-w-2xl mx-auto mt-6 px-4">
          <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ backgroundColor: "#FFF3CD", borderColor: "#F0C040" }}>
            <AlertCircle size={18} style={{ color: "#856404" }} />
            <p className="text-sm" style={{ color: "#856404", fontFamily: "'Outfit', sans-serif" }}>
              Your order was cancelled. No payment was taken. You can try again below.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin" size={32} style={{ color: "#2D6A4F" }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Ordering closed banner */}
            {/* Meal Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Select Meals
              </h2>
              <p className="text-sm mb-4" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                $12.00 per meal · 8.3% sales tax applied at checkout · Use +/− to set how many portions, then enter each child's name
              </p>
              {(errors.meals || hasChildErrors) && (
                <p className="text-sm mb-3" style={{ color: "#C0392B" }}>
                  {errors.meals || "Please enter a name for each child"}
                </p>
              )}
              <div className="space-y-3">
                {menuData?.meals.map((meal) => {
                  const qty = mealQuantities[meal.id] ?? 0;
                  const isDisabled = !menuData.orderingOpen;
                  const isSelected = qty > 0;
                  const names = childNames[meal.id] ?? [];
                  return (
                    <div
                      key={meal.id}
                      className="w-full rounded-lg border-2 transition-all overflow-hidden"
                      style={{
                        backgroundColor: isSelected ? "#EAF4EE" : "#fff",
                        borderColor: isSelected ? "#2D6A4F" : "#E8DFC8",
                        opacity: isDisabled ? 0.6 : 1,
                      }}
                    >
                      {/* Meal row */}
                      <div className="flex items-center gap-3 p-4">
                        {/* Meal info */}
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}>
                            {meal.day} · {meal.date}
                          </span>
                          <p className="text-base font-semibold mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                            {meal.name}
                          </p>
                          <p className="text-sm mt-0.5" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                            {meal.description}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            disabled={isDisabled || qty === 0}
                            onClick={() => setQty(meal.id, qty - 1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                            style={{
                              borderColor: qty > 0 ? "#2D6A4F" : "#DDD",
                              color: qty > 0 ? "#2D6A4F" : "#CCC",
                              backgroundColor: "#fff",
                              cursor: isDisabled || qty === 0 ? "not-allowed" : "pointer",
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span
                            className="w-8 text-center font-semibold text-lg"
                            style={{ fontFamily: "'Outfit', sans-serif", color: qty > 0 ? "#2D6A4F" : "#999" }}
                          >
                            {qty}
                          </span>

                          <button
                            type="button"
                            disabled={isDisabled || qty >= 10}
                            onClick={() => setQty(meal.id, qty + 1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                            style={{
                              borderColor: "#2D6A4F",
                              color: "#2D6A4F",
                              backgroundColor: qty > 0 ? "#2D6A4F" : "#fff",
                              cursor: isDisabled || qty >= 10 ? "not-allowed" : "pointer",
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} color={qty > 0 ? "#fff" : "#2D6A4F"} />
                          </button>

                          {/* Per-meal subtotal */}
                          <span
                            className="w-14 text-right text-sm font-semibold"
                            style={{ fontFamily: "'Outfit', sans-serif", color: qty > 0 ? "#2D6A4F" : "#CCC" }}
                          >
                            {qty > 0 ? `$${(qty * MEAL_PRICE).toFixed(2)}` : "$0.00"}
                          </span>
                        </div>
                      </div>

                      {/* Child name inputs — one per portion, shown when qty > 0 */}
                      {isSelected && (
                        <div
                          className="px-4 pb-4 pt-1 space-y-2"
                          style={{ borderTop: "1px solid #C8E6D4" }}
                        >
                          {Array.from({ length: qty }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold w-16 flex-shrink-0"
                                style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                              >
                                Child {i + 1}
                              </span>
                              <Input
                                value={names[i] ?? ""}
                                onChange={(e) => setChildName(meal.id, i, e.target.value)}
                                placeholder={`Child ${i + 1} name`}
                                className="h-8 text-sm"
                                style={{
                                  borderColor: errors[`child_${meal.id}_${i}`] ? "#C0392B" : "#C8E6D4",
                                  backgroundColor: "#fff",
                                }}
                                disabled={isDisabled}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Form */}
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                Your Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="parentName" style={{ fontFamily: "'Outfit', sans-serif", color: "#333" }}>
                    Parent / Guardian Name *
                  </Label>
                  <Input
                    id="parentName"
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder="Jane Smith"
                    className="mt-1"
                    style={{ borderColor: errors.parentName ? "#C0392B" : undefined }}
                  />
                  {errors.parentName && <p className="text-xs mt-1" style={{ color: "#C0392B" }}>{errors.parentName}</p>}
                </div>

                <div>
                  <Label htmlFor="email" style={{ fontFamily: "'Outfit', sans-serif", color: "#333" }}>
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="mt-1"
                    style={{ borderColor: errors.email ? "#C0392B" : undefined }}
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#C0392B" }}>{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="allergies" style={{ fontFamily: "'Outfit', sans-serif", color: "#333" }}>
                    Allergies / Dietary Notes <span style={{ color: "#888" }}>(optional)</span>
                  </Label>
                  <Textarea
                    id="allergies"
                    value={form.allergies}
                    onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                    placeholder="e.g. nut allergy, gluten-free, vegetarian..."
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary + Checkout */}
            <div className="rounded-lg p-5 border-2" style={{ backgroundColor: "#fff", borderColor: "#E8DFC8" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} style={{ color: "#2D6A4F" }} />
                  <span className="font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A1A" }}>
                    Order Summary
                  </span>
                </div>
                <span className="text-sm" style={{ color: "#888", fontFamily: "'Outfit', sans-serif" }}>
                  {totalMeals} portion{totalMeals !== 1 ? "s" : ""} selected
                </span>
              </div>

              {/* Line items for selected meals */}
              {totalMeals > 0 && (
                <div className="space-y-1 mb-3">
                  {menuData?.meals.map((meal) => {
                    const qty = mealQuantities[meal.id] ?? 0;
                    if (qty === 0) return null;
                    const names = childNames[meal.id] ?? [];
                    return (
                      <div key={meal.id} className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#555" }}>
                        <div className="flex justify-between">
                          <span>{meal.name} × {qty}</span>
                          <span>${(qty * MEAL_PRICE).toFixed(2)}</span>
                        </div>
                        {names.filter(Boolean).length > 0 && (
                          <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                            {names.filter(Boolean).join(", ")}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t pt-3 space-y-1" style={{ borderColor: "#E8DFC8" }}>
                <div className="flex items-center justify-between text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#555" }}>
                  <span>Subtotal ({totalMeals} meal{totalMeals !== 1 ? "s" : ""} × $12.00)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#555" }}>
                  <span>Sales Tax (8.3%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#E8DFC8" }}>
                  <span className="font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "#333" }}>Total</span>
                  <span className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2D6A4F" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting || !menuData?.orderingOpen || totalMeals === 0}
                className="w-full mt-3 py-3 text-base font-semibold"
                style={{
                  backgroundColor: "#2D6A4F",
                  color: "#F5EFE0",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Redirecting to payment...
                  </span>
                ) : (
                  `Pay $${total.toFixed(2)} — Secure Checkout`
                )}
              </Button>
              <p className="text-xs text-center mt-2" style={{ color: "#AAA", fontFamily: "'Outfit', sans-serif" }}>
                Powered by Stripe · SSL encrypted · No card data stored
              </p>
            </div>

          </form>
        )}
      </div>

      {/* Footer */}
      <div className="py-8 text-center" style={{ borderTop: "1px solid #E8DFC8" }}>
        <p className="text-xs" style={{ color: "#AAA", fontFamily: "'Outfit', sans-serif" }}>
          Questions? Call <a href="tel:+14807181671" style={{ color: "#2D6A4F" }}>(480) 718-1671</a> or email{" "}
          <a href="mailto:josh@thelocalcaterer.com" style={{ color: "#2D6A4F" }}>josh@thelocalcaterer.com</a>
        </p>
      </div>
    </div>
  );
}
