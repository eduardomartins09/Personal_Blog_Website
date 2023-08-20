/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    }
}

module.exports = nextConfig
