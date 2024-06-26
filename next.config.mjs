/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'false' },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                ]
            },
            {
                // matching all API routes
                source: '/api/challenge/banks',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'false' },
                    { key: "Access-Control-Allow-Origin", value: "https://dev.obtenmas.com/catom" },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                ]
            }
        ]
    }
}

export default nextConfig;
