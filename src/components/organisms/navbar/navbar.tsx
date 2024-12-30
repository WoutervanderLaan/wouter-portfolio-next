import List from "@/components/atoms/list/list";
import NavItem from "@/components/molecules/nav-item/nav-item";

const Navbar = () => {
  return (
    <nav className="self-start flex flex-col relative">
      <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] z-0 bg-white dark:bg-black opacity-50 blur-lg" />
      <List className="z-10">
        <NavItem href="/">Wouter van der Laan</NavItem>
        <NavItem href="/portfolio">Portfolio</NavItem>
        <NavItem href="/resume">Resume</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </List>
    </nav>
  );
};

export default Navbar;
