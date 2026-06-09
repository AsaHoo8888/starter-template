import "./globals.css";

export const metadata = {
  title: "Next.js + Directus Starter",
  description:
    "A reusable starter for building local websites with Next.js, Directus, and PostgreSQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
