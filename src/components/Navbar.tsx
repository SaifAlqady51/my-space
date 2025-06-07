import Image from "next/image";
import Link from "next/link";
import React from "react";
import Owl from "../../public/owl.png";
export const Navbar = () => {
  return (
    <div className="w-ful h-16 bg-inherit flex justify-between shadow-lg px-52 sticky top-0">
      <Link className="flex items-center" href="/">
        <Image
          src={Owl}
          alt="logo"
          height={60}
          width={60}
          style={{ filter: "invert(100%) brightness(1000%)" }}
        />
        <h1 className="text-2xl">Safe Space</h1>
      </Link>
      <div className="flex justify-center gap-8 mt-4 text-lg">
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/about" className="">
          About
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
      </div>
    </div>
  );
};
