import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const Header = () => {
  const logoSrc = "https://rb.gy/ulxxee";
  const accountSrc = "https://rb.gy/g1pwyx";
  const headerItems = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
  ];

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${scroll && "bg-[#101010]"}`} style={{ zoom: 1.25 }}>
      <div className="flex items-center space-x-2 md:space-x-10 font-NetflixSans font-[500]">
        <img
          src={logoSrc}
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <div className="hidden space-x-4 md:flex">
          {headerItems.map((item, index) => {
            return (
              <div
                key={uuidv4()}
                className="cursor-pointer text-sm text-[#e5e5e5] transition duration-[0.4s] hover:text-[#b3b3b3]"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex item-center space-x-4 text-sm font-light items-center">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img src={accountSrc} className="cursor-pointer rounded" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
