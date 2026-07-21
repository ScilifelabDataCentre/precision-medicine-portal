import { pageMetadata } from "@/lib/metadata";
import { ReactElement } from "react";
import ProfileComponent from "@/components/ProfileComponent";

import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LastUpdated } from "@/components/common/last-updated";

export const metadata = pageMetadata({
  title: "Team",
  description: "Meet the team behind the SciLifeLab Precision Medicine Portal.",
  path: "/about/team",
});

export default function AboutTeamPage(): ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb navigation" role="navigation">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">About us</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about/team">Team</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <Title level={1} className="mb-10">
        Team
      </Title>

      <section aria-label="Team members" className="mb-8">
        <div role="list">
          <div role="listitem">
            <ProfileComponent
              imageUrl="/team-pics/jan-team-pic.jpg"
              name="Jan Lorenz"
              title="Product Owner"
              bgColor="bg-muted"
            />
          </div>
          <div role="listitem">
            <ProfileComponent
              imageUrl="/team-pics/nat-team-pic.jpg"
              name="Natashia Benzian Olsson"
              title="Data Steward"
              bgColor="bg-neutral"
            />
          </div>
          <div role="listitem">
            <ProfileComponent
              imageUrl="/team-pics/seb-team-pic.png"
              name="Sebastian Lindbom Gunnari"
              title="Software Engineer"
              bgColor="bg-muted"
            />
          </div>
          <div role="listitem">
            <ProfileComponent
              imageUrl="/team-pics/sam-team-pic.jpg"
              name="Saman Rassam"
              title="Data Engineer"
              bgColor="bg-neutral"
            />
          </div>
          <div role="listitem">
            <ProfileComponent
              imageUrl="/team-pics/ste-team-pic.jpg"
              name="Stefano Rapisarda"
              title="Database Coordinator"
              bgColor="bg-muted"
            />
          </div>
        </div>
      </section>

      <div className="mt-8">
        <LastUpdated date="17-03-2026" />
      </div>
    </div>
  );
}
