import { Plugin, UserConfig } from 'vite';

const sokuGames = (): Plugin => {
  return {
    name: '@soku-games/vite-plugin',
    config: (config, { mode }) => {
      if (!config.build) config.build = {};
      Object.assign(config.build, <UserConfig['build']>{
        outDir: `./dist-${mode}`,
        rollupOptions: {
          input: `./src/${mode}.ts`,
          output: [{
            name: 'index',
            entryFileNames: 'index.iife.js',
            format: 'iife',
          }, {
            entryFileNames: 'index.cjs.js',
            format: 'cjs',
          }, {
            entryFileNames: 'index.esm.js',
            format: 'esm',
          }],
          external: ['@soku-games/core'],
        },
      });

      return config;
    },
  };
};

export default sokuGames;