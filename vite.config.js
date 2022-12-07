import { viteStaticCopy } from 'vite-plugin-static-copy';

export default {
    base: './',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/form/form.html',
                    dest: '',
                },
            ],
        }),
    ],
};
