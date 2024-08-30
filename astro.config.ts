import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { makeLocalesConfig } from './config/locales';

import vercel from '@astrojs/vercel/serverless';

const VERCEL_PREVIEW_SITE =
	process.env.VERCEL_ENV !== 'production' &&
	process.env.VERCEL_URL &&
	`https://${process.env.VERCEL_URL}`;
const site = VERCEL_PREVIEW_SITE || 'https://vim.docsforall.com/';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		starlight({
			title: 'My Docs',
			defaultLocale: 'en',
			locales: makeLocalesConfig(),
			head: [
				// Add ICO favicon fallback for Safari.
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.ico',
						sizes: '32x32',
					},
				},
				{
					tag: 'script',
					attrs: {
						async: true,
						src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2130210715518535',
						crossorigin: 'anonymous',
					},
				},
			],
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			logo: {
				light: './src/assets/docsfa-logo.svg',
				dark: './src/assets/docsfa-logo-dark.svg',
				alt: 'Docs for All Logo',
				replacesTitle: true,
			},
			customCss: process.env.NO_GRADIENTS ? [] : ['./src/styles/landing.css'],
			components: {
				// SiteTitle: './src/components/starlight/SiteTitle.astro',
				// Head: './src/components/starlight/Head.astro',
			},
			sidebar: [
				{
					label: 'Learn Vim',
					autogenerate: {
						directory: 'learn-vim',
					},
				},
			],
		}),
	],
	output: 'server',
	adapter: vercel(),
});
