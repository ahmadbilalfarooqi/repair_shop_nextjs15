const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, {
  org: "pavaversse",
  project: "javascript-nextjs",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs

  hideSourceCode: true, // Can be used to hide the source bundle
  disableLogger: true, // Can be used to disable the Sentry CLI logs
});

export default nextConfig;
