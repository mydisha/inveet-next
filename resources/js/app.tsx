import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import StructuredData from './components/StructuredData';

const appName = import.meta.env.VITE_APP_NAME || 'Inveet';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <StructuredData type="website" />
                <App {...props} />
            </>
        );
    },
    progress: {
        color: '#8B5CF6', // Purple color to match Inveet branding
    },
});
