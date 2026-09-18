import { describe, it, expect } from "vitest";
import { verifySmtp } from "./email";

describe("SMTP credentials", () => {
  it("should connect to Gmail SMTP successfully", async () => {
    const ok = await verifySmtp();
    expect(ok).toBe(true);
  }, 15000);
});
