import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  assetClassesByRisk,
  industries,
  getAllInvestmentsForRisk,
  lossAversionOptions,
  profitTakingOptions,
  firmServiceOptions,
} from "@/lib/formData";

// Look up display label from option id
function lookupLabel(options, id) {
  const found = options.find((o) => o.id === id);
  return found ? found.label : id;
}

function lookupLabels(options, ids) {
  if (!Array.isArray(ids) || ids.length === 0) return "None selected";
  return ids.map((id) => lookupLabel(options, id)).join(", ");
}

// ============================================================================
// ADMIN NOTIFICATION EMAIL (sent to firm)
// ============================================================================
function buildAdminEmail(d) {
  const assetOpts = assetClassesByRisk[d.riskTolerance] || [];
  const investOpts = getAllInvestmentsForRisk(d.riskTolerance);

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Client Onboarding</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
  <div style="max-width:680px;margin:0 auto;padding:32px 24px;">
    <div style="background:#12121a;border:1px solid #252535;border-radius:12px;padding:32px;">
      <div style="border-bottom:2px solid #6366f1;padding-bottom:16px;margin-bottom:24px;">
        <h1 style="margin:0;color:#ffffff;font-size:24px;">New Client Onboarding Submission</h1>
        <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">Ghost Strategies LLC | ${submittedAt} CT</p>
      </div>

      <h2 style="color:#6366f1;font-size:16px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px;">Contact</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#9ca3af;width:180px;">Full Name</td><td style="padding:6px 0;color:#fff;font-weight:600;">${d.fullName}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Email</td><td style="padding:6px 0;color:#fff;"><a href="mailto:${d.email}" style="color:#6366f1;">${d.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Phone</td><td style="padding:6px 0;color:#fff;">${d.phone || "Not provided"}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Age</td><td style="padding:6px 0;color:#fff;">${d.age}</td></tr>
      </table>

      <h2 style="color:#6366f1;font-size:16px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px;">TSSB Suitability</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#9ca3af;width:180px;">Annual Income</td><td style="padding:6px 0;color:#fff;">${d.annualIncome}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Net Worth</td><td style="padding:6px 0;color:#fff;">${d.netWorth}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Liquid Net Worth</td><td style="padding:6px 0;color:#fff;">${d.liquidNetWorth}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Investment Experience</td><td style="padding:6px 0;color:#fff;">${d.investmentExperience}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Investment Objective</td><td style="padding:6px 0;color:#fff;">${d.investmentObjective}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Risk Tolerance</td><td style="padding:6px 0;"><span style="background:#6366f1;color:#fff;padding:4px 10px;border-radius:4px;font-weight:600;">${d.riskTolerance}</span></td></tr>
      </table>

      <h2 style="color:#6366f1;font-size:16px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px;">Investment Preferences</h2>
      <div style="background:#0a0a0f;border:1px solid #252535;border-radius:8px;padding:16px;margin-bottom:12px;">
        <div style="color:#9ca3af;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Asset Classes</div>
        <div style="color:#fff;font-size:14px;">${lookupLabels(assetOpts, d.assetClasses)}</div>
      </div>
      <div style="background:#0a0a0f;border:1px solid #252535;border-radius:8px;padding:16px;margin-bottom:12px;">
        <div style="color:#9ca3af;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Industries</div>
        <div style="color:#fff;font-size:14px;">${lookupLabels(industries, d.industries)}</div>
      </div>
      <div style="background:#0a0a0f;border:1px solid #252535;border-radius:8px;padding:16px;">
        <div style="color:#9ca3af;font-size:12px;text-transform:uppercase;margin-bottom:6px;">Specific Investments</div>
        <div style="color:#fff;font-size:14px;">${lookupLabels(investOpts, d.specificInvestments)}</div>
      </div>

      <h2 style="color:#6366f1;font-size:16px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px;">Behavioral Profile</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#9ca3af;width:180px;">Loss Aversion</td><td style="padding:6px 0;color:#fff;">${lookupLabel(lossAversionOptions, d.lossAversion)}</td></tr>
        <tr><td style="padding:6px 0;color:#9ca3af;">Profit Taking</td><td style="padding:6px 0;color:#fff;">${lookupLabel(profitTakingOptions, d.profitTaking)}</td></tr>
      </table>

      <h2 style="color:#6366f1;font-size:16px;margin:24px 0 12px;text-transform:uppercase;letter-spacing:1px;">Requested Services</h2>
      <div style="background:#0a0a0f;border:1px solid #252535;border-radius:8px;padding:16px;">
        <div style="color:#fff;font-size:14px;">${lookupLabels(firmServiceOptions, d.firmServices)}</div>
      </div>

      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #252535;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:11px;">
          This submission was collected via the Ghost Strategies onboarding portal in compliance with Texas Administrative Code Title 7, Part 7.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================================
// CLIENT CONFIRMATION EMAIL (sent to prospect)
// ============================================================================
function buildClientConfirmation(d) {
  const firstName = (d.fullName || "").split(" ")[0] || "there";
  const services = lookupLabels(firmServiceOptions, d.firmServices);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to Ghost Strategies</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#e5e7eb;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#12121a;border:1px solid #252535;border-radius:12px;padding:40px 32px;">

      <!-- Brand header -->
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #252535;">
        <div style="display:inline-block;padding:14px 24px;background:#0a0a0f;border:1px solid #252535;border-radius:8px;">
          <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.5px;">Ghost Strategies</span>
          <span style="color:#6366f1;font-size:18px;font-weight:700;margin:0 6px;">|</span>
          <span style="color:#9ca3af;font-size:13px;font-weight:500;">Wealth &amp; Strategy</span>
        </div>
      </div>

      <!-- Greeting -->
      <h1 style="margin:32px 0 12px;color:#ffffff;font-size:26px;font-weight:700;">
        Welcome aboard, ${firstName}.
      </h1>
      <p style="margin:0 0 24px;color:#d1d5db;font-size:15px;line-height:1.6;">
        Thank you for completing your suitability profile with Ghost Strategies.
        We have received your submission, and an advisor will reach out within
        <strong style="color:#ffffff;">1 business day</strong> to schedule your consultation.
      </p>

      <!-- Summary box -->
      <div style="background:#0a0a0f;border:1px solid #252535;border-radius:8px;padding:20px;margin:24px 0;">
        <div style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
          Submission Summary
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:6px 0;color:#9ca3af;width:140px;">Risk Profile</td>
            <td style="padding:6px 0;"><span style="background:#6366f1;color:#fff;padding:3px 10px;border-radius:4px;font-size:12px;font-weight:600;">${d.riskTolerance}</span></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#9ca3af;vertical-align:top;">Services</td>
            <td style="padding:6px 0;color:#fff;">${services}</td>
          </tr>
        </table>
      </div>

      <!-- Next steps -->
      <h2 style="margin:32px 0 12px;color:#6366f1;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        What happens next
      </h2>
      <ol style="margin:0;padding-left:20px;color:#d1d5db;font-size:14px;line-height:1.8;">
        <li>An advisor reviews your suitability profile</li>
        <li>You will receive a calendar invitation for an introductory call</li>
        <li>We discuss your goals and craft a tailored strategy</li>
      </ol>

      <!-- Contact -->
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #252535;">
        <p style="margin:0 0 6px;color:#9ca3af;font-size:13px;">Questions in the meantime?</p>
        <p style="margin:0;color:#fff;font-size:14px;">
          Reach us at <a href="mailto:kris@ghoststrategies.io" style="color:#6366f1;text-decoration:none;font-weight:600;">kris@ghoststrategies.io</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #252535;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:11px;line-height:1.5;">
          Ghost Strategies LLC<br>
          This is an automated confirmation. All client information is held in confidence
          per Texas Administrative Code Title 7, Part 7.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Plain-text fallback for clients that don't render HTML
function buildClientConfirmationText(d) {
  const firstName = (d.fullName || "").split(" ")[0] || "there";
  return `Welcome aboard, ${firstName}.

Thank you for completing your suitability profile with Ghost Strategies. We have received your submission, and an advisor will reach out within 1 business day to schedule your consultation.

Risk Profile: ${d.riskTolerance}

What happens next:
1. An advisor reviews your suitability profile
2. You will receive a calendar invitation for an introductory call
3. We discuss your goals and craft a tailored strategy

Questions? Reach us at kris@ghoststrategies.io

Ghost Strategies LLC
This is an automated confirmation. All client information is held in confidence
per Texas Administrative Code Title 7, Part 7.`;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Server-side validation of required fields
    const required = [
      "fullName",
      "email",
      "age",
      "annualIncome",
      "netWorth",
      "liquidNetWorth",
      "investmentExperience",
      "investmentObjective",
      "riskTolerance",
    ];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !adminEmail) {
      console.error("Missing RESEND_API_KEY or ADMIN_EMAIL env vars");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Send admin notification (the firm needs to know about the new submission)
    // Send client confirmation (the prospect was promised one on Phase 8)
    // Run in parallel so total latency = max(both) instead of sum.
    const [adminResult, clientResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Ghost Strategies Onboarding <${fromEmail}>`,
        to: [adminEmail],
        replyTo: body.email,
        subject: `New Client Submission: ${body.fullName} (${body.riskTolerance})`,
        html: buildAdminEmail(body),
      }),
      resend.emails.send({
        from: `Ghost Strategies <${fromEmail}>`,
        to: [body.email],
        replyTo: adminEmail,
        subject: `Welcome to Ghost Strategies, ${(body.fullName || "").split(" ")[0]}`,
        html: buildClientConfirmation(body),
        text: buildClientConfirmationText(body),
      }),
    ]);

    // The admin email is critical. If it fails, the firm won't know about the lead.
    // Treat that as a real failure and return 500 so the form shows an error.
    if (adminResult.status === "rejected" || adminResult.value?.error) {
      const err = adminResult.status === "rejected"
        ? adminResult.reason
        : adminResult.value.error;
      console.error("Admin email failed:", err);
      return NextResponse.json(
        { error: err?.message || "Email send failed" },
        { status: 500 }
      );
    }

    // The client confirmation is nice-to-have. If it fails, log it and still
    // return success so the prospect lands on the congrats screen. The firm
    // got the lead; they can follow up manually.
    if (clientResult.status === "rejected" || clientResult.value?.error) {
      const err = clientResult.status === "rejected"
        ? clientResult.reason
        : clientResult.value.error;
      console.error("Client confirmation email failed (non-fatal):", err);
    }

    return NextResponse.json({
      success: true,
      adminId: adminResult.value?.data?.id,
      clientId: clientResult.status === "fulfilled" ? clientResult.value?.data?.id : null,
      clientEmailSent: clientResult.status === "fulfilled" && !clientResult.value?.error,
    });
  } catch (err) {
    console.error("Submit handler error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
