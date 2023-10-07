/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig = withLess({
    lessLoaderOptions: {},
});

module.exports = nextConfig
