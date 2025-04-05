import Link from "@/components/atoms/link/link";
import Paint from "@/components/icons/paint";
import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";

export default function Home() {
  return (
    <main className="flex-1">
      <ThemeToggleButton className="sm:hidden" />
      <div className="absolute bottom-0 right-0">
        <Link href="/canvas">
          <div className="p-4">
            <Paint />
          </div>
        </Link>
      </div>
    </main>
  );
}
