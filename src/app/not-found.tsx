import { Metadata } from "next";

import Error404Page from "@/containers/extra/error-404-page";

export const metadata: Metadata = {
  title: "Page Not Found – TechSaws",
  description: "The page you’re looking for doesn’t exist or has been moved.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function NotFound() {
  return <Error404Page />;
}
