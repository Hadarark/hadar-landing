type FbqStandardEvent =
  | "PageView"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase"
  | "CompleteRegistration"
  | "ViewContent"
  | "Contact";

type FbqParams = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  num_items?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    fbq?: (action: "track" | "init", event: string, params?: FbqParams) => void;
  }
}

export function trackEvent(event: FbqStandardEvent, params?: FbqParams) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
