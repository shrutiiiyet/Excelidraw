import { envSiteUrl } from "@/config";

if (!envSiteUrl) {
  throw new Error(
    "❌ NEXT_PUBLIC_SITE_URL is missing or empty! Check your .env file.",
  );
}

const SITE_URL = envSiteUrl.replace(/\/$/, "");

const siteMetadata = {
  title: "Excelidraw",
  description:
    "A real-time collaborative sketching tool for teams to brainstorm, draw, and create together.",

  header: "EXCELIDRAW",

  slogan: `Draw Together, Think Better`,

  developer: "Shruti",

  siteUrl: SITE_URL,

  language: "en-US",
  locale: "en-US",

  // socialBanner: `${SITE_URL}/images/social-banner.webp`,

  // social links
  github: "https://github.com/shrutiiiyet/Excelidraw.git",
  linkedIn: "https://www.linkedin.com/in/shruti-jadhav-892164277/",

  // contacts
  email: "shrutiiiii.05@gmail.com",
};

export default siteMetadata;
