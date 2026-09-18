/**
 * Mailchimp Integration Helper
 * Adds subscribers to the correct audience for each brand
 */

// Mailchimp Audience IDs
export const MAILCHIMP_AUDIENCES = {
  caterer: "899bb203b1",
  wedding: "cad580a783",
  mealprep: "f94e592b9f",
  charcuterie: "878a0b5671",
  bakken: "12bfd72c0a",
} as const;

export type BrandAudience = keyof typeof MAILCHIMP_AUDIENCES;

export interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  mergeFields?: Record<string, string>;
}

export async function addToMailchimp(
  audience: BrandAudience,
  subscriber: SubscriberData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) {
    console.error("[Mailchimp] API key not configured");
    return { success: false, error: "API key not configured" };
  }

  const server = apiKey.split("-")[1]; // e.g., "us6"
  const listId = MAILCHIMP_AUDIENCES[audience];

  const [firstName, ...lastParts] = (subscriber.firstName || "").split(" ");
  const lastName = subscriber.lastName || lastParts.join(" ") || "";

  const body = {
    email_address: subscriber.email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName || "",
      LNAME: lastName || "",
      PHONE: subscriber.phone || "",
      ...subscriber.mergeFields,
    },
    tags: subscriber.tags || [],
  };

  try {
    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const data = await response.json() as { title?: string; detail?: string };
      // 400 with "Member Exists" is not a real error — they're already subscribed
      if (data.title === "Member Exists") {
        return { success: true };
      }
      console.error("[Mailchimp] Error:", data.title, data.detail);
      return { success: false, error: data.detail || data.title };
    }

    return { success: true };
  } catch (err) {
    console.error("[Mailchimp] Network error:", err);
    return { success: false, error: "Network error" };
  }
}
