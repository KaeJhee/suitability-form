import "./globals.css";

export const metadata = {
  title: "Client Onboarding | Ghost Strategies",
  description: "TSSB-compliant suitability and onboarding intake",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
