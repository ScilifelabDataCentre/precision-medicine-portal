"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "DSN-PMD projects",
    href: "/about/dsnpmd-projects",
    description: "Find out more about our ongoing and previous projects",
  },
  {
    title: "FAQ",
    href: "/about/faq",
    description: "Frequently asked questions by our users",
  },
  {
    title: "Team",
    href: "/about/team",
    description: "Who's who in the Data Science Node",
  },
  {
    title: "Partners",
    href: "/about/partners",
    description: "Proudly present our partners",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { role?: string }
>(({ className, title, children, role, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-neutral hover:text-neutral-foreground focus:bg-secondary/20 focus:text-secondary-foreground",
            className,
          )}
          role={role}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function HeaderComponent() {
  return (
    <header
      className="bg-linear-to-b from-secondary to-primary"
      role="banner"
      aria-label="Site header"
    >
      <div className="flex items-center justify-between gap-4 2xl:max-w-(--breakpoint-2xl) 2xl:mx-auto py-2 px-4 lg:px-6">
        <Link href="/" className="shrink-0" aria-label="Go to homepage">
          <Image
            width={600}
            height={59.5}
            src={"/scilifelab-logo/precisionmedicineportal-logo-white.png"}
            alt="Precision Medicine Portal - SciLifeLab"
            priority
            className="w-auto h-7 lg:h-14"
          />
        </Link>
        <div className="hidden lg:block">
          <DesktopNav />
        </div>
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList role="menubar" aria-label="Main navigation">
        <NavigationMenuItem role="none">
          <NavigationMenuTrigger aria-label="Data sources menu">
            Data sources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
              role="menu"
              aria-label="Data sources submenu"
            >
              <li className="row-span-3" role="none">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                    href="/data-sources"
                    role="menuitem"
                    aria-label="Access data - Navigate data for research"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Access data
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Navigate human data for research, including clinical
                      records, quality registries, and biobank data
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/data-sources/quality-registries"
                title="Quality registries"
                role="menuitem"
              >
                Explore various Swedish registries offering individualised
                health data
              </ListItem>
              <ListItem
                href="/data-sources/swedish-research-cohorts"
                title="Swedish research cohorts"
                role="menuitem"
              >
                Discover Swedish research cohorts and biobank-based studies
              </ListItem>
              <ListItem
                href="/data-sources/others"
                title="Other data sources"
                role="menuitem"
              >
                Access a comprehensive overview of data sources
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem role="none">
          <NavigationMenuLink asChild>
            <Link
              href="/omop-cdm"
              className={navigationMenuTriggerStyle()}
              aria-label="OMOP common data model"
            >
              OMOP CDM
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem role="none">
          <NavigationMenuLink asChild>
            <Link
              href="/digifor1health"
              className={navigationMenuTriggerStyle()}
              aria-label="DIGIfor1healthSE initiative"
            >
              DIGIfor1healthSE
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem role="none">
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className={navigationMenuTriggerStyle()}
              aria-label="Contact us"
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem role="none">
          <NavigationMenuTrigger aria-label="About us menu">
            About us
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className="grid gap-3 p-4 w-[500px] grid-cols-2"
              role="menu"
              aria-label="About us submenu"
            >
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  role="menuitem"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-secondary/20 focus:bg-secondary/20"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-label="Mobile navigation menu">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
          <Link
            href="/data-sources"
            className="font-semibold"
            aria-label="Access data"
          >
            Access data
          </Link>
          <Link
            href="/data-sources/quality-registries"
            className="text-sm pl-4"
            aria-label="Quality registries"
          >
            Quality registries
          </Link>
          <Link
            href="/data-sources/swedish-research-cohorts"
            className="text-sm pl-4"
            aria-label="Swedish research cohorts and biobank studies"
          >
            Swedish research cohorts
          </Link>
          <Link
            href="/data-sources/others"
            className="text-sm pl-4"
            aria-label="Other data sources"
          >
            Other data sources
          </Link>
          <Link
            href="/omop-cdm"
            className=""
            aria-label="OMOP common data model"
          >
            OMOP CDM
          </Link>
          <Link
            href="/digifor1health"
            className=""
            aria-label="DIGIfor1healthSE initiative"
          >
            DIGIfor1healthSE
          </Link>
          <Link href="/contact" className="" aria-label="Contact us">
            Contact
          </Link>
          <div className="font-semibold" role="heading" aria-level={2}>
            About us
          </div>
          {components.map((component) => (
            <Link
              key={component.title}
              href={component.href}
              className="text-sm pl-4"
              aria-label={component.title}
            >
              {component.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
