
// Define route types for better TypeScript support
export interface RouteParams {
  id?: string | number;
  slug?: string;
  [key: string]: any;
}

// Frontend routes configuration
export const routes = {
  // Public routes
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',

  // Dashboard routes
  dashboard: '/dashboard',

  // Backoffice routes
  backoffice: {
    dashboard: '/backoffice',
    users: '/backoffice/users',
    userDetail: (id: string | number) => `/backoffice/users/${id}`,
    userEdit: (id: string | number) => `/backoffice/users/${id}/edit`,
    orders: '/backoffice/orders',
    orderDetail: (id: string | number) => `/backoffice/orders/${id}`,
    feedbacks: '/backoffice/feedbacks',
    feedbackDetail: (id: string | number) => `/backoffice/feedbacks/${id}`,
    themes: '/backoffice/themes',
    themeDetail: (id: string | number) => `/backoffice/themes/${id}`,
    themeCreate: '/backoffice/themes/create',
    themeEdit: (id: string | number) => `/backoffice/themes/${id}/edit`,
    configurations: '/backoffice/configurations',
    configurationDetail: (id: string | number) => `/backoffice/configurations/${id}`,
    configurationCreate: '/backoffice/configurations/create',
  },

  // Onboarding routes
  onboarding: '/onboarding',
  onboardingCoupleInfo: '/onboarding/couple-info',
  weddingDetails: '/onboarding/wedding-details',
  customUrl: '/onboarding/custom-url',
  designSelection: '/onboarding/design-selection',
  activation: '/onboarding/activation',

  // Wedding management routes
  myWeddings: '/my-weddings',
  createWedding: '/weddings/create',
  editWedding: (id: string | number) => `/weddings/${id}/edit`,
  viewWedding: (id: string | number) => `/weddings/${id}`,
  weddingDetail: (id: string | number) => `/wedding/${id}`,
  previewWedding: (slug: string) => `/preview/${slug}`,
  designConfiguration: (id: string | number) => `/weddings/${id}/design-configuration`,
  coupleInfo: (id: string | number) => `/wedding/${id}/couple`,
  venueInfo: (id: string | number) => `/wedding/${id}/location-time`,

  // Guest management routes
  guestList: (weddingId: string | number) => `/wedding/${weddingId}/guests`,
  addGuest: (weddingId: string | number) => `/wedding/${weddingId}/guests/add`,
  editGuest: (weddingId: string | number, guestId: string | number) => `/wedding/${weddingId}/guests/${guestId}/edit`,

  // Package routes
  packages: '/packages',
  packageDetails: (id: string | number) => `/packages/${id}`,

  // Checkout routes
  checkout: '/checkout',
  checkoutPayment: '/checkout/payment',
  checkoutSuccess: '/checkout/success',

  // Order routes
  orders: '/orders',
  orderDetails: (id: string | number) => `/orders/${id}`,

  // Gallery routes
  gallery: '/gallery',

  // Music routes
  music: '/music',
  musicLibrary: '/music/library',
  musicUpload: '/music/upload',

  // Settings routes
  settings: '/settings',
  profile: '/profile',
  titleSettings: '/settings/title',

  // Admin routes
  admin: {
    dashboard: '/admin',
    users: '/admin/users',
    packages: '/admin/packages',
    orders: '/admin/orders',
    weddings: '/admin/weddings',
    invitations: '/admin/invitations',
  },

  // Error pages
  notFound: '/404',
  pageExpired: '/419'
};

// API endpoints configuration
export const apiEndpoints = {
  // Authentication
  auth: {
    login: '/api/login',
    register: '/api/register',
    logout: '/api/logout-api',
    forgotPassword: '/api/forgot-password',
    resetPassword: '/api/reset-password',
    verifyEmail: '/api/verify-email',
    resendVerification: '/api/email/verification-notification',
  },

  // User management
  user: {
    profile: '/api/user/profile',
    updateProfile: '/api/user/profile',
    findByEmail: '/api/user/find-by-email',
    updatePassword: '/api/user/password',
    confirmPassword: '/api/user/confirm-password',
  },

  // Settings management
  settings: {
    title: '/api/settings/title',
    updateTitle: (weddingId?: string | number) => weddingId ? `/api/settings/title/${weddingId}` : '/api/settings/title',
  },

  // Wedding management
  weddings: {
    index: '/api/weddings',
    store: '/api/weddings',
    show: (id: string | number) => `/api/weddings/${id}`,
    update: (id: string | number) => `/api/weddings/${id}`,
    destroy: (id: string | number) => `/api/weddings/${id}`,
    findBySlug: (slug: string) => `/api/weddings/slug/${slug}`,
    findByUserId: '/api/user/weddings',
    getDraftWeddings: '/api/user/weddings/drafts',
    publish: (id: string | number) => `/api/weddings/${id}/publish`,
    unpublish: (id: string | number) => `/api/weddings/${id}/unpublish`,
    activate: (id: string | number) => `/api/weddings/${id}/activate`,
    deactivate: (id: string | number) => `/api/weddings/${id}/deactivate`,
    markAsDraft: (id: string | number) => `/api/weddings/${id}/mark-draft`,
    findByThemeId: (themeId: string | number) => `/api/weddings/theme/${themeId}`,
    incrementView: (id: string | number) => `/api/weddings/${id}/increment-view`,
  },

  // Package management
  packages: {
    index: '/api/packages',
    show: (id: string | number) => `/api/packages/${id}`,
    getActive: '/api/packages/active',
    getRecommended: '/api/packages/recommended',
    getDiscounted: '/api/packages/discounted',
    calculatePrice: (id: string | number) => `/api/packages/${id}/calculate-price`,
    getStats: '/api/packages/stats',
    getByPriceRange: '/api/packages/price-range',
  },

  // Theme management
  themes: {
    index: '/api/themes',
    show: (id: string | number) => `/api/themes/${id}`,
    getActive: '/api/themes/active',
    findBySlug: (slug: string) => `/api/themes/slug/${slug}`,
  },

  // Order management
  orders: {
    index: '/api/orders',
    store: '/api/orders',
    show: (id: string | number) => `/api/orders/${id}`,
    update: (id: string | number) => `/api/orders/${id}`,
    destroy: (id: string | number) => `/api/orders/${id}`,
    findByUserId: '/api/user/orders',
    findByWeddingId: (weddingId: string | number) => `/api/weddings/${weddingId}/orders`,
    findByInvoiceNumber: (invoiceNumber: string) => `/api/orders/invoice/${invoiceNumber}`,
    findByPackageId: (packageId: string | number) => `/api/packages/${packageId}/orders`,
    markAsPaid: (id: string | number) => `/api/orders/${id}/mark-paid`,
    markAsVoid: (id: string | number) => `/api/orders/${id}/mark-void`,
    updateStatus: (id: string | number) => `/api/orders/${id}/status`,
    processPayment: (id: string | number) => `/api/orders/${id}/process-payment`,
    cancel: (id: string | number) => `/api/orders/${id}/cancel`,
  },

  // Special invitation management
  invitations: {
    index: '/api/invitations',
    store: '/api/invitations',
    show: (id: string | number) => `/api/invitations/${id}`,
    update: (id: string | number) => `/api/invitations/${id}`,
    destroy: (id: string | number) => `/api/invitations/${id}`,
    findByWeddingId: (weddingId: string | number) => `/api/weddings/${weddingId}/invitations`,
    findBySlug: (slug: string) => `/api/invitations/slug/${slug}`,
    createBulk: '/api/invitations/bulk',
    lock: (id: string | number) => `/api/invitations/${id}/lock`,
    unlock: (id: string | number) => `/api/invitations/${id}/unlock`,
    updatePassword: (id: string | number) => `/api/invitations/${id}/password`,
    removePassword: (id: string | number) => `/api/invitations/${id}/password`,
    getByWeddingIdAndActive: (weddingId: string | number) => `/api/weddings/${weddingId}/invitations/active`,
    toggleLock: (id: string | number) => `/api/invitations/${id}/toggle-lock`,
    validatePassword: (id: string | number) => `/api/invitations/${id}/validate-password`,
    getActive: '/api/invitations/active',
    getLocked: '/api/invitations/locked',
  },

  // Guest management
  guests: {
    index: '/api/guests',
    store: '/api/guests',
    show: (id: string | number) => `/api/guests/${id}`,
    update: (id: string | number) => `/api/guests/${id}`,
    destroy: (id: string | number) => `/api/guests/${id}`,
    findByWeddingId: (weddingId: string | number) => `/api/weddings/${weddingId}/guests`,
    createBulk: '/api/guests/bulk',
    export: (weddingId: string | number) => `/api/weddings/${weddingId}/guests/export`,
    deleteAll: (weddingId: string | number) => `/api/weddings/${weddingId}/guests/delete-all`,
  },

  // Music management
  music: {
    index: '/api/music',
    store: '/api/music',
    show: (id: string | number) => `/api/music/${id}`,
    update: (id: string | number) => `/api/music/${id}`,
    destroy: (id: string | number) => `/api/music/${id}`,
    upload: '/api/music/upload',
    findByUserId: '/api/user/music',
    getPredefined: '/api/music/predefined',
    getByCategory: (category: string) => `/api/music/category/${category}`,
    search: '/api/music/search',
  },

  // Admin routes
  admin: {
    users: {
      index: '/api/admin/users',
      store: '/api/admin/users',
      show: (id: string | number) => `/api/admin/users/${id}`,
      update: (id: string | number) => `/api/admin/users/${id}`,
      destroy: (id: string | number) => `/api/admin/users/${id}`,
      activate: (id: string | number) => `/api/admin/users/${id}/activate`,
      deactivate: (id: string | number) => `/api/admin/users/${id}/deactivate`,
      assignRole: (id: string | number) => `/api/admin/users/${id}/assign-role`,
      removeRole: (id: string | number) => `/api/admin/users/${id}/remove-role`,
      syncRoles: (id: string | number) => `/api/admin/users/${id}/sync-roles`,
    },
    packages: {
      store: '/api/admin/packages',
      update: (id: string | number) => `/api/admin/packages/${id}`,
      destroy: (id: string | number) => `/api/admin/packages/${id}`,
      toggleRecommendation: (id: string | number) => `/api/admin/packages/${id}/toggle-recommendation`,
      activate: (id: string | number) => `/api/admin/packages/${id}/activate`,
      deactivate: (id: string | number) => `/api/admin/packages/${id}/deactivate`,
      updateDiscount: (id: string | number) => `/api/admin/packages/${id}/discount`,
    },
    orders: {
      index: '/api/admin/orders',
      getPaid: '/api/admin/orders/paid',
      getPending: '/api/admin/orders/pending',
      getVoid: '/api/admin/orders/void',
    },
    weddings: {
      index: '/api/admin/weddings',
      getActive: '/api/admin/weddings/active',
      getPublished: '/api/admin/weddings/published',
    },
    invitations: {
      index: '/api/admin/invitations',
      getActive: '/api/admin/invitations/active',
      getLocked: '/api/admin/invitations/locked',
    },
  },

  // Backoffice API routes
  backoffice: {
    users: {
      index: '/backoffice/users',
      show: (id: string | number) => `/backoffice/users/${id}`,
      update: (id: string | number) => `/backoffice/users/${id}`,
      autoLogin: (id: string | number) => `/backoffice/users/${id}/auto-login`,
      activate: (id: string | number) => `/backoffice/users/${id}/activate`,
      deactivate: (id: string | number) => `/backoffice/users/${id}/deactivate`,
      statistics: '/backoffice/users/statistics',
    },
    orders: {
      index: '/backoffice/orders',
      show: (id: string | number) => `/backoffice/orders/${id}`,
      update: (id: string | number) => `/backoffice/orders/${id}`,
      markPaid: (id: string | number) => `/backoffice/orders/${id}/mark-paid`,
      markVoid: (id: string | number) => `/backoffice/orders/${id}/mark-void`,
      statistics: '/backoffice/orders/statistics',
    },
    feedbacks: {
      index: '/backoffice/feedbacks',
      show: (id: string | number) => `/backoffice/feedbacks/${id}`,
      update: (id: string | number) => `/backoffice/feedbacks/${id}`,
      toggleRecommendation: (id: string | number) => `/backoffice/feedbacks/${id}/toggle-recommendation`,
      toggleShowLanding: (id: string | number) => `/backoffice/feedbacks/${id}/toggle-show-landing`,
      destroy: (id: string | number) => `/backoffice/feedbacks/${id}`,
      statistics: '/backoffice/feedbacks/statistics',
    },
    themes: {
      index: '/backoffice/themes',
      store: '/backoffice/themes',
      show: (id: string | number) => `/backoffice/themes/${id}`,
      update: (id: string | number) => `/backoffice/themes/${id}`,
      toggleActive: (id: string | number) => `/backoffice/themes/${id}/toggle-active`,
      togglePublic: (id: string | number) => `/backoffice/themes/${id}/toggle-public`,
      destroy: (id: string | number) => `/backoffice/themes/${id}`,
      statistics: '/backoffice/themes/statistics',
    },
    configurations: {
      index: '/backoffice/configurations',
      store: '/backoffice/configurations',
      show: (id: string | number) => `/backoffice/configurations/${id}`,
      update: (id: string | number) => `/backoffice/configurations/${id}`,
      updateMultiple: '/backoffice/configurations/update-multiple',
      destroy: (id: string | number) => `/backoffice/configurations/${id}`,
      getGroups: '/backoffice/configurations/groups',
      getByGroup: (group: string) => `/backoffice/configurations/group/${group}`,
      getWebsiteSettings: '/backoffice/configurations/website-settings',
      initializeDefaults: '/backoffice/configurations/initialize-defaults',
    },
  },

  // Utility routes
  health: '/api/health',
};

// Helper function to build API URLs with parameters
export const buildApiUrl = (endpoint: string, params: Record<string, any> = {}): string => {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, String(value));
  });
  return url;
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string, params: Record<string, any> = {}): string => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8001';
  return `${baseUrl}${buildApiUrl(endpoint, params)}`;
};
