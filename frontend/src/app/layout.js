import HeritageFooter from "@/components/Footer";
import "./globals.css";

import HeritageHero from "@/components/Hero";
import Header from "@/components/Header";

export const metadata = {
  title: "The Heritage Resort | Jaipur",
  description:
    "Experience a contemporary heritage stay at The Heritage Resort, Jaipur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-content">
          <Header />
        

          <main>
            {children}
          </main>
          <HeritageFooter />
        </div>
      </body>
    </html>
  );
}