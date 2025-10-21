import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {

  const routes = [""].map((route) => ({
    url: 'http://localhost:3001'
   }));

  return [...routes];
}
