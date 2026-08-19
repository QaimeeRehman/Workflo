import Header from "../_components/Header";
import Navbar from "../_components/Navbar";

export default function layout({ children }) {
  return (
    <>
      <header id="no-print">
        <Header />
        <Navbar />
      </header>
      <main className="mx-auto p-8 w-325 print:w-auto">{children}</main>
    </>
  );
}
