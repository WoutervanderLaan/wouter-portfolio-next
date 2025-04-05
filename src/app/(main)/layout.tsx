import Footer from "@/components/organisms/footer/footer";
import Navbar from "@/components/organisms/navbar/navbar";
import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex min-h-screen flex-col">
      <div className="flex flex-col justify-between py-4 sm:flex-row md:py-10">
        <Navbar />
        <ThemeToggleButton className="z-10 hidden sm:flex" />
      </div>
      {children}
      <Footer />
    </div>
  );
}
