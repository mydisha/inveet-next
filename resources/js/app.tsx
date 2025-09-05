import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import StructuredData from './components/StructuredData';
import { forceRefreshCsrfToken, initializeCsrfToken } from './lib/auth';

const appName = import.meta.env.VITE_APP_NAME || 'Inveet';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Force refresh CSRF token for authenticated pages after login redirects
        const currentPath = window.location.pathname;
        const authRequiredPaths = ['/dashboard', '/my-weddings', '/wedding-invitations', '/profile', '/settings', '/orders', '/analytics', '/packages'];

        if (authRequiredPaths.some(path => currentPath.startsWith(path))) {
            // Force refresh CSRF token immediately for authenticated pages
            forceRefreshCsrfToken();
        } else {
            // For non-authenticated pages, just initialize normally
            initializeCsrfToken();
        }

        root.render(
            <>
                <StructuredData type="website" />
                <App {...props} />
            </>
        );
    },
    progress: {
        color: '#165d99', // Primary blue color to match system design
    },
});
