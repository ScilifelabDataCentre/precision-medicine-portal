"use client";

import React from "react";
import Image from "next/image";

type ProfileComponentProps = {
  imageUrl: string;
  name: string;
  title: string;
  bgColor: string;
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  imageUrl,
  name,
  title,
  bgColor,
}) => {
  return (
    <article
      className={`flex flex-row items-center gap-4 p-4 transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
      role="listitem"
      aria-label={`Profile of ${name}`}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full lg:h-32 lg:w-32">
        <Image
          src={imageUrl}
          alt={`Profile photo of ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <h2 className="text-2xl font-normal break-words lg:text-5xl">{name}</h2>
        <p className="pt-2 text-lg italic break-words lg:text-xl">{title}</p>
      </div>
    </article>
  );
};

export default ProfileComponent;
