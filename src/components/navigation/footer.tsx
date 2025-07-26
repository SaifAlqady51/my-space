import Link from "next/link";
import { NAVLIST } from "./data/nav-list";

export const Footer = () => {
  return (
    <div className="flex justify-between fixed bottom-0 shadow-black shadow-2xl  md:hidden w-full bg-slate-950 ">
      {NAVLIST.map((item, idx) => (
        <Link
          href={item.link}
          key={idx}
          className="flex items-center justify-center p-4 transition-colors"
        >
          <div className="flex items-center gap-0.5 flex-col hover:bg-black ">
            <div className="text-2xl">{item.icon}</div>
            <p className="text-xs">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
