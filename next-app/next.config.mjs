/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/about',
            destination: '/about/dsnpmd-projects',
            permanent: true,
          },
          {
            // The KIARVA page was removed from the portal; send old
            // bookmarks and external links to the KIARVA service itself.
            source: '/kiarva',
            destination: 'https://kiarva.scilifelab.se/',
            permanent: true,
          },
        ]
    },
    output: 'standalone',
  };

export default nextConfig;