import DarkModeToggleButton from "../darkmodeToggle/darkmodeToggleButton";

export default function NavBar() {
  return (
    <nav className="bg-white-800 absolute right-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-end h-16 p-8">
          <div>
            <DarkModeToggleButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
