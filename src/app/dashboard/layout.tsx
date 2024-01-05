"use client";

import DisplayChildrenOnPaths from "@/components/DisplayChildrenOnPaths";
import Sidebar from "@/components/SideBar/Sidebar";
import axios from "axios";
import { useQuery } from "react-query";

const SIDEBAR_MENUS = [
  {
    heading: "dashboard",
    sub_heading: [
      {
        href: "/dashboard",
        icon_url: "/icons/sidebar/dashboard.svg",
        label: "Dashboard",
      },
      // {
      // 	href: '/category-explorer',
      // 	icon_url: '/icons/sidebar/dashboard.svg',
      // 	label: 'Category Explorer'
      // }
    ],
  },
  {
    heading: "research",
    sub_heading: [
      {
        href: "/niche-finder",
        icon_url: "/icons/sidebar/niche-finder.svg",
        label: "Niche Finder",
      },
      {
        href: "/product-research",
        icon_url: "/icons/sidebar/product-research.svg",
        label: "Product Research",
      },
      {
        href: "/keyword-research/summary",
        icon_url: "/icons/sidebar/keyword-research.svg",
        label: "Keyword Research",
      },
      {
        href: "/longtail-keywords",
        icon_url: "/icons/sidebar/keyword-research.svg",
        label: "Longtail Keywords",
      },
    ],
  },
  {
    heading: "analysis",
    sub_heading: [
      {
        href: "/shop-analyzer/shop-overview",
        icon_url: "/icons/sidebar/shop-analyzer.svg",
        label: "Shop Analyzer",
      },

      {
        href: "/competitor-analysis",
        icon_url: "/icons/sidebar/competitor-analysis.svg",
        label: "Competitor Analysis",
      },
    ],
  },
  {
    heading: "AI Powered",
    sub_heading: [
      {
        href: "/ai-writer/title-generator",
        icon_url: "/icons/sidebar/ai-writer.svg",
        label: "AI Writer",
      },
    ],
  },
  {
    heading: "Coming soon",
    sub_heading: [
      {
        href: "/description-formatter",
        icon_url: "/icons/sidebar/shop-analyzer.svg",
        label: "DescriptionFormatter",
      },
      {
        href: "/shop-tracker/featured-listings",
        icon_url: "/icons/sidebar/shop-analyzer.svg",
        label: "Shop Tracker",
      },
      {
        href: "/trending/topics",
        icon_url: "/icons/sidebar/trending.svg",
        label: "Trending",
      },
      {
        href: "/tag-generator/by-keyword",
        icon_url: "/icons/sidebar/tag-generator.svg",
        label: "Tag Generator",
      },
    ],
  },
];

const DASHBOARD_PATHS: string[] = ["/dashboard"];
const LANDINGPAGE_PATHS: string[] = [
  "/",
  "/not-found",
  "/pricing",
  "/affilate-program",
  "/contact",
];

const AUTHENTICATION_PATHS: string[] = [
  "/auth/signup",
  "/auth/signin",
  "/auth/reset-password",
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery<any>("fetchUser", () =>
    fetch(
      `http://localhost:3000/auth/users/659629f645e36205daed5339?key=AutoCommentIQ`
    ).then((res) => res.json())
  );

  return (
    <main className="flex bg-white text-black">
      <DisplayChildrenOnPaths paths={DASHBOARD_PATHS}>
        <Sidebar menus={SIDEBAR_MENUS} />
      </DisplayChildrenOnPaths>
      <div className="h-screen w-full overflow-y-scroll">
        {/* <DisplayChildrenOnPaths paths={DASHBOARD_PATHS}>
          <DashboardHeader />
        </DisplayChildrenOnPaths> */}
        {/* 
        <DisplayChildrenOnPaths paths={LANDINGPAGE_PATHS}>
          <LandingPageHeader />
        </DisplayChildrenOnPaths> */}
        <div className="flex items-center justify-between px-8">
          <div className="">
            <div className="">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-[350px] px-4 py-3.5 ps-10 text-sm text-gray-900 border border-gray-200 outline-none rounded-full bg-[#F9F9FB]  "
                  placeholder="Search You Tube Videos"
                  required
                />
              </div>
            </div>
          </div>
          <div className="py-6">
            <div className="flex items-center gap-3">
              <img
                src={user?.profile?.picture}
                alt="profile images"
                className="w-11 h-11 rounded-full"
              />
              <h1 className="text-[14px] not-italic font-semibold leading-[140%] capitalize">
                {user?.username}
              </h1>
            </div>
          </div>
        </div>
        {children}

        {/* <FilterChildrenOnPaths paths={AUTHENTICATION_PATHS}>
          <Footer />
        </FilterChildrenOnPaths> */}
      </div>
    </main>
  );
}
