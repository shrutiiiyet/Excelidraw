"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarClose, SidebarOpen } from "@/data/icons/mobile_nav-icons";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";

import clsx from "clsx";
import { NavLink } from "@/data/navLink";
import Logo from "./logo";
import siteMetadata from "@/lib/siteMetadata";
import Link from "next/link";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const onToggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle Scroll Lock for Body
  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        disableBodyScroll(navRef.current, { reserveScrollBarGap: true });
        document.body.style.overflow = "hidden"; // Prevent body scroll
      } else {
        enableBodyScroll(navRef.current);
        document.body.style.overflow = "auto"; // Restore scrolling
      }
    }
    return () => {
      clearAllBodyScrollLocks();
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggleNav}
        className="relative z-50 flex items-center justify-center md:hidden"
        aria-label="Toggle Menu"
      >
        <SidebarOpen />
      </button>

      {/* Sidebar & Overlay */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 transition-opacity duration-300"
          onClick={onToggleNav} // Close menu when clicking outside
        />
      )}

      <aside
        ref={navRef}
        className={clsx(
          isOpen ? "translate-x-0" : "translate-x-full",
          "text-secondary fixed inset-y-0 right-0 z-50 flex h-screen w-screen flex-col bg-white px-2 transition-transform duration-500 md:w-72",
        )}
      >
        <div
          className="flex items-center justify-between border-b bg-white px-4 py-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <Logo />
          <button onClick={onToggleNav} aria-label="Close Sidebar">
            <SidebarClose />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 flex flex-col gap-4 bg-white px-4 text-lg">
          <ul className="font-medium text-gray-700">
            {NavLink.map((link, index) => (
              <li key={index} className="mt-6">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary text-2xl transition"
                >
                  {link.title}
                </a>
              </li>
            ))}

            <li className="mt-6">
              <a
                href={siteMetadata.github}
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="hover:text-primary text-2xl transition"
              >
                Github
              </a>
            </li>

            <li className="mt-8">
              <Link
                href="/signin"
                scroll={false}
                className="hover:bg-primary bg-primary-darker rounded-lg border-2 border-gray-200 px-6 py-2 font-bold tracking-wider text-white transition"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileNav;
