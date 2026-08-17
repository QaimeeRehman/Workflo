import { Toaster } from "react-hot-toast";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,

            style: {
              borderRadius: "10px",
              padding: "16px",
              fontSize: "15px",
              fontWeight: "500",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },

            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
                border: "1px solid #15803d",
              },

              iconTheme: {
                primary: "#fff",
                secondary: "#16a34a",
              },
            },

            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
                border: "1px solid #b91c1c",
              },

              iconTheme: {
                primary: "#fff",
                secondary: "#dc2626",
              },
            },
          }}
        />
        <div id="no-print">
          <Header />
          <Navbar />
        </div>
        <div className="mx-auto p-8">{children}</div>
      </body>
    </html>
  );
}
