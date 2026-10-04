import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutPreview } from "@/features/home/about-preview";
import { LabPreview } from "@/features/home/lab-preview";
import { NotesPreview } from "@/features/home/notes-preview";
import { SelectedWork } from "@/features/home/selected-work";
import { Hero } from "@/features/home/hero/hero";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <SelectedWork />
        <LabPreview />
        <AboutPreview />
        <NotesPreview />
      </main>

      <Footer />
    </>
  );
}