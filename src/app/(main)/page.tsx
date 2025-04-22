import Link from "@/components/atoms/link/link";
import Magnet from "@/components/atoms/magnet/magnet";
import Paint from "@/components/icons/paint";
import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";

export default function Home() {
  return (
    <main className="flex-1">
      <ThemeToggleButton className="sm:hidden" />
      <div className="absolute bottom-4 right-4">
        <Link href="/canvas">
          <Magnet magneticAreaSize={100}>
            <Paint />
          </Magnet>
        </Link>
      </div>
    </main>
  );
}
