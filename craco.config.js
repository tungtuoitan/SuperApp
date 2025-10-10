import path from 'path';

export default {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Fix source-map-loader issues with MUI
      if (env === 'development') {
        webpackConfig.module.rules.forEach((rule) => {
          if (rule.enforce === 'pre' && rule.use) {
            rule.use.forEach((useEntry) => {
              if (useEntry.loader && useEntry.loader.includes('source-map-loader')) {
                useEntry.exclude = [
                  /node_modules\/@mui/,
                  /node_modules\/@emotion/,
                  /node_modules\/react-scripts/,
                ];
              }
            });
          }
        });
      }

      // Ignore missing source maps warnings
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ];

      return webpackConfig;
    },
  },
};