/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['10.1.1.190'],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...config.externals,
        function (context, request, callback) {
          if (request === 'canvas') {
            return callback(null, 'commonjs canvas');
          }
          callback();
        },
      ];
    }

    return config;
  },
};

export default nextConfig;
