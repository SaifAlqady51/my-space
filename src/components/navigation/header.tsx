import Link from "next/link";
import React from "react";
import { OwlIcon } from "@/icons";
import { NAVLIST } from "@/data";

export const Header = () => {
  return (
    <div className="w-full gap-4 h-16 bg-slate-950 border-b border-white/10 flex md:justify-between justify-center shadow-gray-800 shadow-md  lg:px-32 xl:px-[var(--main-px)] px-8 top-0 z-50">
      <Link className="flex items-center" href="/">
        <OwlIcon />
        <h1 className="text-2xl font-bold whitespace-nowrap">Safe Space</h1>
      </Link>
      <div className="hidden md:flex justify-center gap-8 mt-4 text-lg ">
        {NAVLIST.map((item, idx) => (
          <Link
            href={item.link}
            key={idx}
            className="hover:scale-105 transition-transform hover:text-gold-100 duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
