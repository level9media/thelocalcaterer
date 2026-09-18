import "dotenv/config";
import { describe, it, expect } from "vitest";

describe("Mailchimp API Key Validation", () => {
  it("should connect to Mailchimp and return lists", async () => {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    expect(apiKey).toBeTruthy();

    const server = apiKey?.split("-")[1]; // e.g., "us6"
    expect(server).toBeTruthy();

    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists?count=5&fields=lists.id,lists.name`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
      }
    );

    expect(response.ok).toBe(true);
    const data = await response.json() as { lists: Array<{ id: string; name: string }> };
    expect(data.lists).toBeDefined();
    expect(data.lists.length).toBeGreaterThan(0);
    console.log("Mailchimp audiences:", data.lists.map((l) => `${l.name} (${l.id})`).join(", "));
  });
});
