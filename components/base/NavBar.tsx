import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white text-green">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-start items-center">
          <Image
            className="white:invert"
            src="/cibra.webp"
            alt="Cibra logo"
            width={90}
            height={90}
            priority
          />
      </div>
    </nav>
  );
};

export default Navbar;
