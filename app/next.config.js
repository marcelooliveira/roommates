const webpack = require("webpack");
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  distDir: 'dist',
  target: 'serverless',
  webpack: config => {
    return config;
  },
  publicRuntimeConfig: {
    // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? 'https://roommates-match.netlify.app/' : '',    
    lokiDatabase: 'roommatesV4.json',
    staticFolder: '/static',
    cloudinaryCloudName: cloudinaryCloudName,
    cloudinaryUploadPreset: cloudinaryUploadPreset
  }
};
