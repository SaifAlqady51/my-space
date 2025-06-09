import Image from "next/image";
import Link from "next/link";
import React from "react";
import Owl from "../../../public/owl.png";
import { NAVLIST } from "./data/nav-list";
export const Header = () => {
  return (
    <div className="w-ful h-16 bg-inherit flex md:justify-between justify-center shadow-lg lg:px-52 px-8  sticky top-0">
      <Link className="flex items-center" href="/">
        <Image
          src={Owl}
          alt="logo"
          height={60}
          width={60}
          style={{ filter: "invert(100%) brightness(1000%)" }}
        />
        <h1 className="text-2xl font-bold">Safe Space</h1>
      </Link>
      <div className="hidden md:flex justify-center gap-8 mt-4 text-lg ">
        {NAVLIST.map((item, idx) => (
          <Link href={item.link} key={idx}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
