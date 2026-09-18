/**
 * Email helper — sends transactional emails via Gmail SMTP (nodemailer)
 * From: "The Local Caterer" <josh@thelocalcaterer.com>
 * To: both josh@ and kasandra@thelocalcaterer.com
 */
import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

const NOTIFICATION_RECIPIENTS = [
  "josh@thelocalcaterer.com",
  "kasandra@thelocalcaterer.com",
];

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export interface LeadEmailOptions {
  subject: string;
  fields: Record<string, string | undefined>;
  /** When set, hitting Reply in the inbox goes to the prospect, not back to josh@ */
  replyTo?: string;
}

/**
 * Sends a lead notification email to both Josh and Kasandra.
 * Returns true on success, false on failure (non-throwing).
 */
export async function sendLeadEmail(options: LeadEmailOptions): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[Email] SMTP credentials not configured — skipping email send");
    return false;
  }

  const rows = Object.entries(options.fields)
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#1A1A1A;background:#F5EFE0;border:1px solid #E8DFC8;white-space:nowrap;font-family:Arial,sans-serif;font-size:14px;">${k}</td>
          <td style="padding:8px 12px;color:#333;border:1px solid #E8DFC8;font-family:Arial,sans-serif;font-size:14px;">${v}</td>
        </tr>`
    )
    .join("\n");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#EDE6D3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE6D3;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E8DFC8;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#1B4332;padding:28px 32px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F5EFE0;font-weight:600;">
                The Local Caterer
              </p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(245,239,224,0.65);letter-spacing:0.1em;text-transform:uppercase;">
                New Lead Notification
              </p>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding:28px 32px 16px;border-bottom:2px solid #C1440E;">
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#1A1A1A;font-weight:600;">
                ${options.subject}
              </p>
            </td>
          </tr>
          <!-- Fields table -->
          <tr>
            <td style="padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${rows}
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:8px 32px 32px;">
              <a href="https://thelocalcaterer.com/admin/leads"
                 style="display:inline-block;background:#2D6A4F;color:#F5EFE0;text-decoration:none;padding:12px 24px;font-family:Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">
                View All Leads →
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#F5EFE0;padding:16px 32px;border-top:1px solid #E8DFC8;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#888;">
                © ${new Date().getFullYear()} The Local Caterer · Mesa, Arizona · (480) 718-1671
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Plain-text fallback
  const text = Object.entries(options.fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"The Local Caterer" <${SMTP_USER}>`,
      to: NOTIFICATION_RECIPIENTS.join(", "),
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
      subject: options.subject,
      text,
      html,
    });
    console.log(`[Email] Lead notification sent to ${NOTIFICATION_RECIPIENTS.join(", ")}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send lead notification:", err);
    return false;
  }
}

export interface LunchOrderEmailOptions {
  parentName: string;
  parentEmail: string;
  studentName: string;
  allergies?: string;
  meals: { day: string; date: string; name: string; qty: number }[];
  totalCents: number;
  orderId: number;
}

/**
 * Sends two emails on a confirmed lunch order:
 * 1. Parent confirmation (to the buyer)
 * 2. Kitchen notification (to josh@ + kasandra@)
 */
export async function sendLunchOrderEmails(options: LunchOrderEmailOptions): Promise<void> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[Email] SMTP credentials not configured — skipping lunch order emails");
    return;
  }

  const mealRows = options.meals
    .map(
      (m) =>
        `<tr>
          <td style="padding:8px 12px;color:#1A1A1A;border:1px solid #E8DFC8;font-family:Arial,sans-serif;font-size:14px;">
            <strong>${m.day}, ${m.date}</strong><br/>${m.name}${m.qty > 1 ? ` <span style="background:#2D6A4F;color:#fff;padding:1px 6px;border-radius:3px;font-size:12px;">&times;${m.qty}</span>` : ""}
          </td>
          <td style="padding:8px 12px;text-align:right;color:#2D6A4F;font-weight:600;border:1px solid #E8DFC8;font-family:Arial,sans-serif;font-size:14px;">$${(m.qty * 8).toFixed(2)}</td>
        </tr>`
    )
    .join("\n");

  const totalFormatted = `$${(options.totalCents / 100).toFixed(2)}`;

  // ── 1. Parent confirmation ──────────────────────────────────────────────
  const parentHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#EDE6D3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE6D3;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E8DFC8;max-width:600px;width:100%;">
          <tr>
            <td style="background:#1B4332;padding:28px 32px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F5EFE0;font-weight:600;">The Local Caterer</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(245,239,224,0.65);letter-spacing:0.1em;text-transform:uppercase;">Lunch Order Confirmed</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 16px;border-bottom:2px solid #C1440E;">
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#1A1A1A;font-weight:600;">Your order is confirmed, ${options.parentName.split(" ")[0]}!</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#555;"><strong>Student(s):</strong> ${options.studentName}</p>
              ${options.allergies ? `<p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#555;"><strong>Dietary notes:</strong> ${options.allergies}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${mealRows}
                <tr>
                  <td style="padding:10px 12px;font-weight:700;font-family:Arial,sans-serif;font-size:14px;color:#1A1A1A;border-top:2px solid #1B4332;">Total Paid</td>
                  <td style="padding:10px 12px;text-align:right;font-weight:700;font-family:Georgia,serif;font-size:18px;color:#2D6A4F;border-top:2px solid #1B4332;">${totalFormatted}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#666;">Meals are served every <strong>Monday and Wednesday</strong>. If you have any questions, reply to this email or call <a href="tel:+14807181671" style="color:#2D6A4F;">(480) 718-1671</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#F5EFE0;padding:16px 32px;border-top:1px solid #E8DFC8;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#888;">© ${new Date().getFullYear()} The Local Caterer · Mesa, Arizona · (480) 718-1671</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // ── 2. Kitchen notification ─────────────────────────────────────────────
  const kitchenHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#EDE6D3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE6D3;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E8DFC8;max-width:600px;width:100%;">
          <tr>
            <td style="background:#1B4332;padding:28px 32px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F5EFE0;font-weight:600;">The Local Caterer</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(245,239,224,0.65);letter-spacing:0.1em;text-transform:uppercase;">New Lunch Order — Order #${options.orderId}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 16px;border-bottom:2px solid #C1440E;">
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#1A1A1A;font-weight:600;">New Paid Lunch Order</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#555;"><strong>Parent:</strong> ${options.parentName} &lt;${options.parentEmail}&gt;</p>
              <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#555;"><strong>Student(s):</strong> ${options.studentName}</p>
              ${options.allergies ? `<p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;color:#C0392B;"><strong>⚠ Dietary notes:</strong> ${options.allergies}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${mealRows}
                <tr>
                  <td style="padding:10px 12px;font-weight:700;font-family:Arial,sans-serif;font-size:14px;color:#1A1A1A;border-top:2px solid #1B4332;">Total</td>
                  <td style="padding:10px 12px;text-align:right;font-weight:700;font-family:Georgia,serif;font-size:18px;color:#2D6A4F;border-top:2px solid #1B4332;">${totalFormatted}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <a href="https://thelocalcaterer.com/admin/lunch-orders"
                 style="display:inline-block;background:#2D6A4F;color:#F5EFE0;text-decoration:none;padding:12px 24px;font-family:Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">
                View All Lunch Orders &rarr;
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#F5EFE0;padding:16px 32px;border-top:1px solid #E8DFC8;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#888;">© ${new Date().getFullYear()} The Local Caterer · Mesa, Arizona</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const transporter = createTransporter();

  // Send parent confirmation
  try {
    await transporter.sendMail({
      from: `"The Local Caterer" <${SMTP_USER}>`,
      to: options.parentEmail,
      replyTo: SMTP_USER,
      subject: `Your Lunch Order is Confirmed — ${options.studentName}`,
      html: parentHtml,
      text: `Hi ${options.parentName}, your lunch order for ${options.studentName} is confirmed. Total paid: ${totalFormatted}. Meals: ${options.meals.map((m) => `${m.day} ${m.date}: ${m.name}${m.qty > 1 ? ` x${m.qty}` : ""}`).join(", ")}`,
    });
    console.log(`[Email] Parent confirmation sent to ${options.parentEmail}`);
  } catch (err) {
    console.error("[Email] Failed to send parent confirmation:", err);
  }

  // Send kitchen notification
  try {
    await transporter.sendMail({
      from: `"The Local Caterer" <${SMTP_USER}>`,
      to: NOTIFICATION_RECIPIENTS.join(", "),
      replyTo: options.parentEmail,
      subject: `New Lunch Order — ${options.studentName} (Order #${options.orderId})`,
      html: kitchenHtml,
      text: `New paid lunch order #${options.orderId}. Parent: ${options.parentName} <${options.parentEmail}>. Student(s): ${options.studentName}. ${options.allergies ? `Dietary notes: ${options.allergies}. ` : ""}Meals: ${options.meals.map((m) => `${m.day} ${m.date}: ${m.name}${m.qty > 1 ? ` x${m.qty}` : ""}`).join(", ")}. Total: ${totalFormatted}`,
    });
    console.log(`[Email] Kitchen notification sent to ${NOTIFICATION_RECIPIENTS.join(", ")}`);
  } catch (err) {
    console.error("[Email] Failed to send kitchen notification:", err);
  }
}

/**
 * Verify SMTP connection — used in tests.
 */
export async function verifySmtp(): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASS) return false;
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}

export interface JobApplicationEmailOptions {
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  position: string;
  experience?: string;
  availability?: string;
  message?: string;
}

/**
 * Sends a job application notification to Josh and Kasandra.
 */
export async function sendJobApplicationEmail(options: JobApplicationEmailOptions): Promise<void> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[Email] SMTP credentials not configured — skipping job application email");
    return;
  }

  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE0;padding:32px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;">
          <tr>
            <td style="padding:28px 32px 16px;border-bottom:2px solid #C1440E;">
              <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#2D6A4F;">New Job Application</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;color:#1A1A1A;">The Local Caterer — Careers</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;width:40%;">Applicant</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#333;border:1px solid #E8DFC8;">${options.applicantName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;">Email</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#333;border:1px solid #E8DFC8;"><a href="mailto:${options.applicantEmail}" style="color:#2D6A4F;">${options.applicantEmail}</a></td>
                </tr>
                ${options.applicantPhone ? `
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;">Phone</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#333;border:1px solid #E8DFC8;">${options.applicantPhone}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;">Position</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#C1440E;font-weight:700;border:1px solid #E8DFC8;">${options.position}</td>
                </tr>
                ${options.experience ? `
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;">Experience</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#333;border:1px solid #E8DFC8;">${options.experience}</td>
                </tr>` : ""}
                ${options.availability ? `
                <tr>
                  <td style="padding:8px 12px;background:#F5EFE0;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;border:1px solid #E8DFC8;">Availability</td>
                  <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#333;border:1px solid #E8DFC8;">${options.availability}</td>
                </tr>` : ""}
                ${options.message ? `
                <tr>
                  <td colspan="2" style="padding:12px;border:1px solid #E8DFC8;">
                    <p style="margin:0 0 6px;font-weight:700;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;">Message</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#444;line-height:1.6;">${options.message}</p>
                  </td>
                </tr>` : ""}
              </table>
              <p style="margin:20px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#666;">
                Reply to this email to contact the applicant directly at <a href="mailto:${options.applicantEmail}" style="color:#2D6A4F;">${options.applicantEmail}</a>.
              </p>
            </td>
          </tr>
          <td style="background:#F5EFE0;padding:16px 32px;border-top:1px solid #E8DFC8;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#888;">The Local Caterer · Mesa, AZ · (480) 718-1671 · thelocalcaterer.com</p>
          </td>
        </table>
      </td></tr>
    </table>
  `;

  const transporter = createTransporter();
  try {
    await transporter.sendMail({
      from: `"The Local Caterer" <${SMTP_USER}>`,
      to: NOTIFICATION_RECIPIENTS.join(", "),
      replyTo: options.applicantEmail,
      subject: `New Job Application — ${options.position} — ${options.applicantName}`,
      html,
      text: `New job application from ${options.applicantName} (${options.applicantEmail}) for: ${options.position}. Experience: ${options.experience || "N/A"}. Availability: ${options.availability || "N/A"}. Message: ${options.message || "N/A"}`,
    });
    console.log(`[Email] Job application notification sent for ${options.applicantName}`);
  } catch (err) {
    console.error("[Email] Failed to send job application email:", err);
  }
}
