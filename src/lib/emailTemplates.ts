/**
 * Generates an adaptive HTML email template honoring the client device's theme:
 * - In Light Mode: Crisp Air Force / High-Altitude Sky aesthetic (clean slate canvas #f8fafc, dark typography, azure/gold accents).
 * - In Dark Mode: Tactical Military Army Camo aesthetic (deep olive night #0b0f0a, bunker card #131911, tactical lime/gold accents).
 */
export function getAdaptiveOtpEmailHtml(otpCode: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>SSB Astra Verification Code</title>
  <style>
    /* Default: Air Force Sky Light Theme */
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }

    .email-container {
      max-width: 500px;
      margin: 30px auto;
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }

    .header-bar {
      padding: 24px 28px 16px;
      border-bottom: 1px solid #e2e8f0;
      background-color: #f8fafc;
    }

    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0284c7;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #d97706;
      margin: 4px 0 0 0;
      text-transform: uppercase;
      font-family: monospace;
      letter-spacing: 1.5px;
      font-weight: 700;
    }

    .content-body {
      padding: 28px;
    }

    .salutation {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
    }

    .message-text {
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      margin: 0 0 20px 0;
    }

    .otp-card {
      background-color: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 26px 0;
    }

    .otp-number {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #0284c7;
      font-family: monospace, monospace;
      display: inline-block;
    }

    .expiry-note {
      font-size: 12px;
      line-height: 1.5;
      color: #64748b;
      margin: 0;
    }

    .footer-bar {
      border-top: 1px solid #e2e8f0;
      padding: 18px 28px;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      background-color: #f8fafc;
      font-family: monospace;
    }

    /* Device Dark Mode: Tactical Indian Army Camo Theme */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #050805 !important;
        color: #f2f5f1 !important;
      }
      .email-container {
        background-color: #0b0f0a !important;
        border-color: #2d3b2a !important;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4) !important;
      }
      .header-bar {
        background-color: #131911 !important;
        border-bottom-color: #212c1e !important;
      }
      .brand-title {
        color: #84cc16 !important;
      }
      .brand-subtitle {
        color: #eab308 !important;
      }
      .salutation {
        color: #f2f5f1 !important;
      }
      .message-text {
        color: #cad5c7 !important;
      }
      .otp-card {
        background-color: #141c12 !important;
        border-color: #4d7c0f !important;
      }
      .otp-number {
        color: #a3e635 !important;
      }
      .expiry-note {
        color: #849680 !important;
      }
      .footer-bar {
        background-color: #0e130c !important;
        border-top-color: #212c1e !important;
        color: #849680 !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <center style="width:100%;table-layout:fixed;padding:20px 0;">
    <div class="email-container" style="max-width:500px;background-color:#ffffff;border:1px solid #cbd5e1;border-radius:10px;text-align:left;">
      
      <!-- Header -->
      <div class="header-bar" style="padding:24px 28px 16px;border-bottom:1px solid #e2e8f0;background-color:#f8fafc;">
        <h2 class="brand-title" style="margin:0;font-size:20px;font-weight:800;color:#0284c7;">SSB ASTRA</h2>
        <p class="brand-subtitle" style="margin:4px 0 0 0;font-size:11px;color:#d97706;letter-spacing:1.5px;font-family:monospace;font-weight:700;">OFFICER INTELLIGENCE SUITE</p>
      </div>

      <!-- Main Body -->
      <div class="content-body" style="padding:28px;">
        <div class="salutation" style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:12px;">Candidate Authentication Protocol,</div>
        <p class="message-text" style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 20px 0;">
          Use the one-time authentication code below to verify your email and activate your officer preparation dossier:
        </p>

        <!-- OTP Card -->
        <div class="otp-card" style="background-color:#f0f9ff;border:1px solid #bae6fd;padding:18px;text-align:center;border-radius:8px;margin:24px 0;">
          <span class="otp-number" style="font-size:32px;font-weight:800;letter-spacing:8px;color:#0284c7;font-family:monospace;">
            ${otpCode}
          </span>
        </div>

        <p class="expiry-note" style="font-size:12px;line-height:1.5;color:#64748b;margin:0;">
          This code is strictly confidential and will expire in 10 minutes. If you did not initiate this request, you can safely disregard this transmission.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer-bar" style="border-top:1px solid #e2e8f0;padding:16px 28px;font-size:11px;color:#94a3b8;text-align:center;background-color:#f8fafc;font-family:monospace;">
        Tri-Services Officer Selection Suite • Army • Navy • Air Force
      </div>

    </div>
  </center>
</body>
</html>`;
}
