import Link from "next/link";
import React from "react";
import { NAVLIST } from "./data/nav-list";
import { OwlIcon } from "@/icons";

export const Header = () => {
  return (
    <div className="w-full h-16 bg-slate-950 border-b border-white/10 flex md:justify-between justify-center shadow-lg lg:px-[var(--main-px)] px-8  top-0 z-50">
      <Link className="flex items-center" href="/">
        <OwlIcon />
        <h1 className="text-2xl font-bold">Safe Space</h1>
      </Link>
      <div className="hidden md:flex justify-center gap-8 mt-4 text-lg ">
        {NAVLIST.map((item, idx) => (
          <Link
            href={item.link}
            key={idx}
            className="hover:scale-105 transition-transform hover:text-white duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
