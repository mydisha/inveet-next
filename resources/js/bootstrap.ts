import axios from 'axios';

declare global {
    interface Window {
        axios: typeof axios;
        route: (name: string, params?: any) => string;
    }
}

window.axios = axios;

// Global route function
window.route = (name: string, params: any = {}) => {
  const routes: Record<string, string> = {
    'onboarding.couple-info.store': '/onboarding/couple-info',
    'profile.update': '/profile',
    'password.update': '/password',
    'preferences.update': '/preferences',
  };
  return routes[name] || '/';
};

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
