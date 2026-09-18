import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Phone, Mail, Calendar, Users, MessageSquare, Trash2, Edit3, ExternalLink } from "lucide-react";

type LeadStatus = "new" | "contacted" | "quoted" | "booked" | "closed" | "lost";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  quoted: "bg-purple-100 text-purple-800 border-purple-200",
  booked: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  lost: "bg-red-100 text-red-700 border-red-200",
};

const SOURCE_LABELS: Record<string, string> = {
  "caterer-contact-form": "Caterer",
  "wedding-contact-form": "Wedding",
  "mealprep-contact-form": "Meal Prep",
  "charcuterie-contact-form": "Charcuterie",
  "bakken-contact-form": "Bakken",
};

function LeadCard({ lead, onStatusUpdate, onDelete }: {
  lead: {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    eventType?: string | null;
    eventDate?: string | null;
    guestCount?: string | null;
    message?: string | null;
    source?: string | null;
    status: LeadStatus;
    notes?: string | null;
    createdAt: Date;
  };
  onStatusUpdate: (id: number, status: LeadStatus, notes?: string) => void;
  onDelete: (id: number) => void;
}) {
  const [editNotes, setEditNotes] = useState(lead.notes || "");
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = new Date(lead.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {lead.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lead.source && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
              {SOURCE_LABELS[lead.source] || lead.source}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[lead.status]}`}>
            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-wrap gap-3 mb-3">
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors"
        >
          <Mail size={13} /> {lead.email}
        </a>
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors"
          >
            <Phone size={13} /> {lead.phone}
          </a>
        )}
      </div>

      {/* Event details */}
      {(lead.eventType || lead.eventDate || lead.guestCount) && (
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
          {lead.eventType && (
            <span className="flex items-center gap-1.5">
              <ExternalLink size={12} className="text-gray-400" />
              {lead.eventType}
            </span>
          )}
          {lead.eventDate && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-gray-400" />
              {lead.eventDate}
            </span>
          )}
          {lead.guestCount && (
            <span className="flex items-center gap-1.5">
              <Users size={12} className="text-gray-400" />
              {lead.guestCount} guests
            </span>
          )}
        </div>
      )}

      {/* Message */}
      {lead.message && (
        <div className="mb-3 p-3 bg-gray-50 rounded text-sm text-gray-700 flex gap-2">
          <MessageSquare size={13} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{lead.message}</p>
        </div>
      )}

      {/* Notes */}
      {lead.notes && !isEditing && (
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-100 rounded text-sm text-gray-700">
          <p className="text-xs font-semibold text-yellow-700 mb-1">Notes</p>
          <p>{lead.notes}</p>
        </div>
      )}

      {/* Edit notes */}
      {isEditing && (
        <div className="mb-3">
          <Textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Add internal notes..."
            className="text-sm resize-none"
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              className="text-xs h-7"
              style={{ backgroundColor: "#2D6A4F" }}
              onClick={() => {
                onStatusUpdate(lead.id, lead.status, editNotes);
                setIsEditing(false);
              }}
            >
              Save Notes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs h-7"
              onClick={() => { setIsEditing(false); setEditNotes(lead.notes || ""); }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <Select
          value={lead.status}
          onValueChange={(val) => onStatusUpdate(lead.id, val as LeadStatus)}
        >
          <SelectTrigger className="h-8 text-xs w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-xs gap-1.5 text-gray-500 hover:text-gray-700"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit3 size={12} /> Notes
        </Button>

        <a
          href={`https://thelocalcaterer.tripleseat.com/party_request/34341`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <Button size="sm" className="h-8 text-xs gap-1.5" style={{ backgroundColor: "#C1440E" }}>
            <ExternalLink size={11} /> Send Quote
          </Button>
        </a>

        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
          onClick={() => {
            if (confirm(`Delete lead from ${lead.name}?`)) onDelete(lead.id);
          }}
        >
          <Trash2 size={13} />
        </Button>
      </div>
    </div>
  );
}

const ADMIN_EMAIL_WHITELIST = [
  "josh@thelocalcaterer.com",
  "kasandra@thelocalcaterer.com",
];

function isAdminUser(user: { role?: string; email?: string | null } | null | undefined): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.email && ADMIN_EMAIL_WHITELIST.includes(user.email.toLowerCase())) return true;
  return false;
}

export default function AdminLeads() {
  const { user, loading, isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const { data: leads = [], refetch, isLoading } = trpc.contact.getLeads.useQuery(undefined, {
    enabled: isAuthenticated && isAdminUser(user),
    refetchInterval: 30000, // auto-refresh every 30s
  });

  const updateStatus = trpc.contact.updateStatus.useMutation({
    onSuccess: () => { refetch(); toast.success("Lead updated"); },
    onError: () => toast.error("Failed to update lead"),
  });

  const deleteLeadMutation = trpc.contact.deleteLead.useMutation({
    onSuccess: () => { refetch(); toast.success("Lead deleted"); },
    onError: () => toast.error("Failed to delete lead"),
  });

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Not admin
  if (!loading && isAuthenticated && !isAdminUser(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Access Denied
          </h1>
          <p className="text-gray-600">This area is restricted to The Local Caterer team.</p>
        </div>
      </div>
    );
  }

  // Filter leads
  const filtered = leads.filter((lead) => {
    const statusMatch = statusFilter === "all" || lead.status === statusFilter;
    const sourceMatch = sourceFilter === "all" || lead.source === sourceFilter;
    return statusMatch && sourceMatch;
  });

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    booked: leads.filter((l) => l.status === "booked").length,
    quoted: leads.filter((l) => l.status === "quoted").length,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title="Admin — Leads Dashboard | The Local Caterer"
        description="Internal leads management dashboard."
        noindex
      />
      <Navigation />

      <div className="container py-12 pt-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
            Leads Dashboard
          </h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
            All catering inquiries — auto-refreshes every 30 seconds
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, color: "#2D6A4F" },
            { label: "New", value: stats.new, color: "#1D4ED8" },
            { label: "Quoted", value: stats.quoted, color: "#7C3AED" },
            { label: "Booked", value: stats.booked, color: "#059669" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-9 text-sm bg-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-40 h-9 text-sm bg-white">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="caterer-contact-form">Caterer</SelectItem>
              <SelectItem value="wedding-contact-form">Wedding</SelectItem>
              <SelectItem value="mealprep-contact-form">Meal Prep</SelectItem>
              <SelectItem value="charcuterie-contact-form">Charcuterie</SelectItem>
              <SelectItem value="bakken-contact-form">Bakken</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="h-9 text-sm bg-white"
            onClick={() => refetch()}
          >
            Refresh
          </Button>

          <span className="ml-auto text-sm text-gray-500 self-center">
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Leads Grid */}
        {isLoading || loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 animate-pulse h-48" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {leads.length === 0 ? "No leads yet — they'll appear here as forms are submitted." : "No leads match the current filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead as Parameters<typeof LeadCard>[0]["lead"]}
                onStatusUpdate={(id, status, notes) =>
                  updateStatus.mutate({ id, status, notes })
                }
                onDelete={(id) => deleteLeadMutation.mutate({ id })}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
