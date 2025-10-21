import { knewave } from "@/data/fonts";
import siteMetadata from "@/lib/siteMetadata";
import Image from "next/image";
import React from "react";
import Logout from "@/components/auth/logout";

const DashboardHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white drop-shadow-md">
      <section className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="ml-1 flex items-center justify-center gap-3">
          <h1
            className={`${knewave.className} text-secondary text-2xl font-extrabold md:text-3xl`}
          >
            {siteMetadata.header}
          </h1>
        </div>

        <Logout />
      </section>
    </header>
  );
};

export default DashboardHeader;
