import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { trackPageView } from "./lib/analytics";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ContactThanks from "./pages/ContactThanks";
import WeddingCatering from "./pages/WeddingCatering";
import CorporateCatering from "./pages/CorporateCatering";
import PrivateEventCatering from "./pages/PrivateEventCatering";
import PrivatePartyCatering from "./pages/PrivatePartyCatering";
import BabyShowerCatering from "./pages/BabyShowerCatering";
import CelebrationOfLife from "./pages/CelebrationOfLife";
import BarbecueCatering from "./pages/BarbecueCatering";
import CateringMenu from "./pages/CateringMenu";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServiceAgreement from "./pages/ServiceAgreement";

// Location Pages
import MesaAZ from "./pages/locations/MesaAZ";
import PhoenixAZ from "./pages/locations/PhoenixAZ";
import ScottsdaleAZ from "./pages/locations/ScottsdaleAZ";
import ChandlerAZ from "./pages/locations/ChandlerAZ";
import GilbertAZ from "./pages/locations/GilbertAZ";

import Gallery from "./pages/Gallery";
import Press from "./pages/Press";
import NotFound from "./pages/NotFound";
import AdminLeads from "./pages/AdminLeads";
import SchoolLunch from "./pages/SchoolLunch";
import AdminLunchOrders from "./pages/AdminLunchOrders";
import CatererChatbot from "./components/CatererChatbot";
import Careers from "./pages/Careers";
import RouteHead from "./components/RouteHead";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/contact/thanks" component={ContactThanks} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/service-agreement" component={ServiceAgreement} />

      {/* Service Pages */}
      <Route path="/wedding-catering-mesa-az" component={WeddingCatering} />
      <Route path="/corporate-event-catering" component={CorporateCatering} />
      <Route path="/private-event-catering" component={PrivateEventCatering} />
      <Route path="/private-party-catering" component={PrivatePartyCatering} />
      <Route path="/baby-shower-catering" component={BabyShowerCatering} />
      <Route path="/celebration-of-life-catering" component={CelebrationOfLife} />
      <Route path="/barbecue-catering" component={BarbecueCatering} />

      {/* Menu Pages — all served by CateringMenu with per-route SEO */}
      <Route path="/catering-menu" component={CateringMenu} />
      <Route path="/mexican-catering-menu" component={CateringMenu} />
      <Route path="/lunch-catering-menu" component={CateringMenu} />
      <Route path="/italian-catering-menu" component={CateringMenu} />
      <Route path="/holiday-menu-2025" component={CateringMenu} />
      <Route path="/breakfast-catering-menu" component={CateringMenu} />
      <Route path="/asian-catering-menu" component={CateringMenu} />
      <Route path="/dessert-menu" component={CateringMenu} />
      <Route path="/sandwich-bar-mesa-az" component={CateringMenu} />

      {/* Location Pages */}
      <Route path="/catering-mesa-az" component={MesaAZ} />
      <Route path="/catering-phoenix-az" component={PhoenixAZ} />
      <Route path="/catering-scottsdale-az" component={ScottsdaleAZ} />
      <Route path="/catering-chandler-az" component={ChandlerAZ} />
      <Route path="/catering-gilbert-az" component={GilbertAZ} />

      {/* Gallery */}
      <Route path="/gallery" component={Gallery} />

      {/* Press */}
      <Route path="/press" component={Press} />

      {/* Blog */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/categories/:category" component={BlogCategory} />
      <Route path="/post/:slug" component={BlogPost} />

      {/* Legacy Wix client-side fallbacks (server handles 301s, these are SPA safety nets) */}
      <Route path="/modernmoments" component={WeddingCatering} />
      <Route path="/copy-of-modern-moments" component={WeddingCatering} />
      <Route path="/general-5" component={Services} />

      {/* Admin */}
      <Route path="/admin/leads" component={AdminLeads} />
      <Route path="/admin/lunch-orders" component={AdminLunchOrders} />

      {/* Student Lunch Program — hidden from nav, linked from school website */}
      <Route path="/school-lunch" component={SchoolLunch} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function GA4PageTracker() {
  const [location] = useLocation();
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <RouteHead />
          <GA4PageTracker />
          <Router />
          <CatererChatbot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
