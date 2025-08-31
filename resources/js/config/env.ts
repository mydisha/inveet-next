// Frontend environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_APP_URL || 'http://localhost:8001',
    timeout: 10000,
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Inveet',
    version: '1.0.0',
  },
  
  // Feature Flags
  features: {
    googleAuth: true,
    fileUpload: true,
    realTimeUpdates: false,
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  
  // File Upload
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 10,
  },
  
  // Validation
  validation: {
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    url: {
      maxLength: 50,
      allowedChars: /^[a-z0-9-]+$/,
    },
  },
  
  // Timezones (Indonesian)
  timezones: [
    { value: 'WIB', label: 'WIB (Western Indonesian Time)', offset: '+7' },
    { value: 'WITA', label: 'WITA (Central Indonesian Time)', offset: '+8' },
    { value: 'WIT', label: 'WIT (Eastern Indonesian Time)', offset: '+9' },
  ],
  
  // Event Types
  eventTypes: [
    { value: 'akad', label: 'Akad Nikah', icon: '💒' },
    { value: 'resepsi', label: 'Resepsi', icon: '🎉' },
    { value: 'unduh-mantu', label: 'Unduh Mantu', icon: '🎁' },
    { value: 'engagement', label: 'Engagement', icon: '💍' },
    { value: 'pre-wedding', label: 'Pre-Wedding', icon: '📸' },
    { value: 'custom', label: 'Custom Event', icon: '✨' },
  ],
  
  // Design Categories
  designCategories: [
    { value: 'Traditional', label: 'Traditional', color: 'bg-blue-100 text-blue-800' },
    { value: 'Contemporary', label: 'Contemporary', color: 'bg-purple-100 text-purple-800' },
    { value: 'Romantic', label: 'Romantic', color: 'bg-pink-100 text-pink-800' },
    { value: 'Vintage', label: 'Vintage', color: 'bg-amber-100 text-amber-800' },
    { value: 'Destination', label: 'Destination', color: 'bg-green-100 text-green-800' },
    { value: 'Rustic', label: 'Rustic', color: 'bg-orange-100 text-orange-800' },
  ],
};

// Export individual config sections for easier imports
export const { api, app, features, pagination, upload, validation, timezones, eventTypes, designCategories } = config;

export default config;
