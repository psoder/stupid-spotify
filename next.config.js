/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: "",
                pathname: "/image/**"
            },
            {
                protocol: "https",
                hostname: "scontent-ams4-1.xx.fbcdn.net",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

module.exports = nextConfig;
