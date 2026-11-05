import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VectorLineProcess from "@/components/VectorLineProcess";
import ComparisonTable from "@/components/ComparisonTable";
import SubtestShowcase from "@/components/SubtestShowcase";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <VectorLineProcess />
      <ComparisonTable />
      <SubtestShowcase />
      <FAQ />
      <Footer />
    </main>
  );
}
