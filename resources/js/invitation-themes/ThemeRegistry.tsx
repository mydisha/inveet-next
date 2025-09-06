import React from 'react';
import AutumnTheme from './themes/AutumnTheme';
import ClassicAutumnTheme from './themes/ClassicAutumnTheme';
import ClassyFlowerTheme from './themes/ClassyFlowerTheme';
import LuxeeEleganceTheme from './themes/LuxeeEleganceTheme';
import LuxeePremiumTheme from './themes/LuxeePremiumTheme';
import UniqueModernTheme from './themes/UniqueModernTheme';
import { autumnTheme } from './themes/autumn';
import { classicAutumnTheme } from './themes/classic-autumn';
import { classyFlowerTheme } from './themes/classy-flower';
import { classyGoldBlueTheme } from './themes/classy-gold-blue';
import { darkFlowerTheme } from './themes/dark-flower';
import { luxeeEleganceTheme } from './themes/luxee-elegance';
import { luxeePremiumTheme } from './themes/luxee-premium';
import { uniqueModernTheme } from './themes/unique-modern';
import { InvitationThemeProps } from './types';

export interface ThemeRegistryProps extends InvitationThemeProps {
  themeId: string;
}

const themeComponents = {
  'autumn': AutumnTheme,
  'classy-flower': ClassyFlowerTheme,
  'luxee-elegance': LuxeeEleganceTheme,
  'luxee-premium': LuxeePremiumTheme,
  'unique-modern': UniqueModernTheme,
  'classic-autumn': ClassicAutumnTheme,
  'classy-gold-blue': AutumnTheme, // Using AutumnTheme as base for now
  'dark-flower': AutumnTheme, // Using AutumnTheme as base for now
  // Add more themes here as they are created
};

const themeConfigs = {
  'autumn': autumnTheme,
  'classy-flower': classyFlowerTheme,
  'luxee-elegance': luxeeEleganceTheme,
  'luxee-premium': luxeePremiumTheme,
  'unique-modern': uniqueModernTheme,
  'classic-autumn': classicAutumnTheme,
  'classy-gold-blue': classyGoldBlueTheme,
  'dark-flower': darkFlowerTheme,
  // Add more theme configs here as they are created
};

export const getAvailableThemes = () => {
  return Object.values(themeConfigs);
};

export const getThemeConfig = (themeId: string) => {
  return themeConfigs[themeId as keyof typeof themeConfigs];
};

export const ThemeRegistry: React.FC<ThemeRegistryProps> = ({
  themeId,
  ...props
}) => {
  const ThemeComponent = themeComponents[themeId as keyof typeof themeComponents];

  if (!ThemeComponent) {
    console.error(`Theme "${themeId}" not found. Available themes:`, Object.keys(themeComponents));
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Theme Not Found</h1>
          <p className="text-gray-600">
            The theme "{themeId}" is not available. Please check the theme configuration.
          </p>
        </div>
      </div>
    );
  }

  return <ThemeComponent {...props} />;
};

export default ThemeRegistry;
