// GA4 Analytics utility
// Measurement ID: G-PLKEP3P8TM

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-PLKEP3P8TM', {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Specific event helpers
export const analytics = {
  // Form events
  formSubmit: (formType: string) =>
    trackEvent('form_submit', { form_type: formType, event_category: 'lead' }),

  // CTA clicks
  ctaClick: (ctaName: string, location: string) =>
    trackEvent('cta_click', { cta_name: ctaName, cta_location: location }),

  // Phone clicks
  phoneClick: () =>
    trackEvent('phone_click', { event_category: 'contact', value: 1 }),

  // Menu PDF download
  menuDownload: () =>
    trackEvent('file_download', { file_name: 'catering-menu-2025.pdf', event_category: 'engagement' }),

  // Quote request
  quoteRequest: (source: string) =>
    trackEvent('quote_request', { source, event_category: 'lead', value: 1 }),
};
