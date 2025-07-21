import Image from "next/image";
import Link from "next/link";
import React from "react";
import Owl from "../../../public/owl.png";
import { NAVLIST } from "./data/nav-list";

export const Header = () => {
  return (
    <div className="w-full h-16 bg-white/10 backdrop-blur-md border-b border-white/10 flex md:justify-between justify-center shadow-lg lg:px-52 px-8 sticky top-0 z-50">
      <Link className="flex items-center" href="/">
        <Image
          src={Owl}
          alt="logo"
          height={60}
          width={60}
          style={{ filter: "invert(100%) brightness(1000%)" }}
          className="hover:scale-110 transition-transform duration-300"
        />
        <h1 className="text-2xl font-bold text-white">Safe Space</h1>
      </Link>
      <div className="hidden md:flex justify-center gap-8 mt-4 text-lg text-white/80 hover:[&>a]:text-white [&>a]:transition-colors [&>a]:duration-300">
        {NAVLIST.map((item, idx) => (
          <Link
            href={item.link}
            key={idx}
            className="hover:scale-105 transition-transform duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
