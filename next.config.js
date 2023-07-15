/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = withLess({
    lessLoaderOptions: {},
});

module.exports = nextConfig
