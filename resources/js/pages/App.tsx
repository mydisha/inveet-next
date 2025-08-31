import React from 'react';
import { usePage } from '@inertiajs/react';
import { routes } from '../routes';
import Landing from './landing';
import Login from './auth/login';
import ForgotPassword from './auth/forgot-password';
import Dashboard from './dashboard';
import Onboarding from './onboarding';
import CoupleInfo from './onboarding/couple-info';
import WeddingDetails from './onboarding/wedding-details';
import CustomUrl from './onboarding/custom-url';
import DesignSelection from './onboarding/design-selection';
import Activation from './onboarding/activation';

// Define the page props interface
interface PageProps {
  component: string;
  props?: any;
}

// Main App component that handles routing
export default function App() {
  const { component, props } = usePage<PageProps>();

  // Route mapping based on the component prop from Laravel
  const renderComponent = () => {
    switch (component) {
      case 'Landing':
        return <Landing {...props} />;
      
      case 'Auth/Login':
        return <Login {...props} />;
      
      case 'Auth/ForgotPassword':
        return <ForgotPassword {...props} />;
      
      case 'Dashboard':
        return <Dashboard {...props} />;
      
      case 'Onboarding':
        return <Onboarding {...props} />;
      
      case 'Onboarding/CoupleInfo':
        return <CoupleInfo {...props} />;
      
      case 'Onboarding/WeddingDetails':
        return <WeddingDetails {...props} />;
      
      case 'Onboarding/CustomUrl':
        return <CustomUrl {...props} />;
      
      case 'Onboarding/DesignSelection':
        return <DesignSelection {...props} />;
      
      case 'Onboarding/Activation':
        return <Activation {...props} />;
      
      default:
        // Default to landing page if no component specified
        return <Landing {...props} />;
    }
  };

  return (
    <div className="app">
      {renderComponent()}
    </div>
  );
}
