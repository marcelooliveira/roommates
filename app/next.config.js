const webpack = require("webpack");
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

module.exports = {
  distDir: 'dist',
  webpack: config => {
    return config;
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    cloudinaryCloudName: cloudinaryCloudName,
    cloudinaryUploadPreset: cloudinaryUploadPreset
  }
};
