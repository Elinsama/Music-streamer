import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	proxy: {
		'/music': {
			target: 'http://localhost:3000',
			changeOrigin: true,
			secure: false,
			rewrite: (path) => console.log("hello", path)
		},
	}
};

export default config;
