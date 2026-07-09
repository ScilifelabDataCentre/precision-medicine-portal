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
      className={`flex flex-row items-center p-4 transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
      role="listitem"
      aria-label={`Profile of ${name}`}
    >
      <div className="flex items-center lg:p-2 lg:w-1/3">
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={`Profile photo of ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </div>
        <div className="text-left lg:w-2/3 pl-4">
          <h2 className="text-2xl text-ellipsis lg:text-5xl lg:text-nowrap font-normal">
            {name}
          </h2>
          <p className="text-lg lg:text-xl lg:text-nowrap italic pt-2">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProfileComponent;
