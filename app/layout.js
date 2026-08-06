import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
