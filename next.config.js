const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
});
