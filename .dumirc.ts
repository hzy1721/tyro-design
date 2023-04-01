import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Tyro Design',
    nav: [{ title: '文档', link: '/components' }],
    prefersColor: { default: 'light', switch: false },
    socialLinks: {
      github: 'https://github.com/hzy1721/tyro-design',
    },
  },
});
