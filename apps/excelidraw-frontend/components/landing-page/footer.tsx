import React from "react";
import siteMetadata from "../../lib/siteMetaData";
import CardSocial from "./card-social";
import Logo from "./logo";
import Animation from "@/components/animation";

const Footer = () => {
  const links = [
    { name: "About Us" },
    { name: "Features" },
    { name: "Pricing" },
    { name: "Blog" },
  ];

  return (
    <footer className="border-t border-gray-300 text-gray-700">
      <section className="mx-auto flex max-w-7xl flex-col justify-between px-6 py-10 md:flex-row">
        {/* Left Section - Logo & Socials */}
        <section className="flex w-full flex-col items-start justify-start md:w-40">
          <Logo />
          <section className="mt-8 flex justify-between gap-4">
            <CardSocial title="Github" href={siteMetadata.github} />
            <CardSocial title="LinkedIn" href={siteMetadata.linkedIn} />
          </section>
        </section>

        {/* Center Section - Quick Links */}
        <section className="mt-8 md:mt-0">
          <h3 className="text-xl font-semibold text-black">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-lg">
            {links.map((link) => (
              <li
                key={link.name}
                className="hover:text-primary cursor-pointer font-medium transition duration-300"
              >
                {link.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Right Section - Contact Info */}
        <section className="mt-8 md:mt-0">
          <h3 className="text-xl font-semibold text-black">Contact Us</h3>
          <ul className="mt-3 space-y-2 text-lg font-medium">
            <li>
              <a
                href={`mailto:${siteMetadata.email}`}
                className="hover:text-primary"
              >
                <Animation type="box">{siteMetadata.email}</Animation>
              </a>
            </li>
          </ul>
        </section>
      </section>

      {/* Footer Credit */}
      <section className="py-4 text-center text-sm font-medium">
        <p className="py-2">
          &copy; {new Date().getFullYear()} <span>{siteMetadata.header}</span>.
          All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
