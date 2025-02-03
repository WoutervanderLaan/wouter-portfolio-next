import List from "@/components/atoms/list/list";
import NavItem from "@/components/molecules/nav-item/nav-item";
import clsx from "clsx";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={clsx("relative flex flex-col self-start", className)}>
      <div className="absolute -left-[10%] -top-[10%] z-10 h-[120%] w-[120%] bg-white opacity-50 blur-lg dark:bg-black" />
      <List className="z-10">
        <NavItem href="/" label="homepage">
          Wouter van der Laan
        </NavItem>
        <NavItem href="/portfolio">Portfolio</NavItem>
        <NavItem href="/resume">Resume</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </List>
    </nav>
  );
};

export default Navbar;
