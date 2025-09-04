import { Link, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Clock, Home, RefreshCw, Shield, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PageExpiredProps {
  status?: number;
  message?: string;
}

const PageExpired: React.FC<PageExpiredProps> = ({
  status = 419,
  message = "Sesi Anda telah berakhir"
}) => {
  const { flash } = usePage().props as any;
  const [showFlashMessage, setShowFlashMessage] = useState(false);

  useEffect(() => {
    if (flash?.error || flash?.message) {
      setShowFlashMessage(true);
      const timer = setTimeout(() => setShowFlashMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary-light/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements matching the app design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="shape-float-4 top-1/3 left-1/4 w-20 h-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
        <div className="particle top-1/4 left-1/4" style={{ animationDelay: '0s' }}></div>
        <div className="particle top-1/3 right-1/3" style={{ animationDelay: '1s' }}></div>
        <div className="particle bottom-1/3 right-1/4" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-20 max-w-2xl w-full space-y-8 text-center">
        {/* 419 Illustration with enhanced design */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/20 select-none animate-pulse">
            {status}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary-glow/40 rounded-full blur-xl animate-pulse-glow"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary-light/30 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                <Clock className="w-12 h-12 text-primary animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Flash Messages */}
        {showFlashMessage && (flash?.error || flash?.message) && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center max-w-md mx-auto mb-6">
            <AlertCircle className="w-5 h-5 mr-2" />
            {flash?.error || flash?.message}
          </div>
        )}

        {/* Error Message with enhanced typography */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              <span className="text-primary">Oops!</span> Sesi Berakhir
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {message}
            </p>
            <p className="text-sm text-muted-foreground/80">
              Halaman ini telah berakhir karena alasan keamanan. Silakan refresh halaman atau kembali ke beranda.
            </p>
          </div>

          {/* Security Info Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-left max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-light/30 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-inter-semibold text-foreground mb-2">
                  Mengapa ini terjadi?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ini adalah fitur keamanan yang melindungi data Anda. Sesi berakhir setelah periode tidak aktif untuk mencegah akses tidak sah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleRefresh}
            className="group inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-primary-foreground bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Halaman
          </button>

          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 border border-border text-base font-medium rounded-xl text-foreground bg-card hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="pt-6">
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center px-6 py-3 border border-border/50 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground bg-card/50 hover:bg-card focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Halaman Sebelumnya
          </button>
        </div>

        {/* Helpful Links with enhanced styling */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-6 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2 text-accent animate-pulse" />
            Atau coba kunjungi halaman populer:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/login"
              className="group text-primary hover:text-primary-glow hover:underline transition-all duration-300 flex items-center"
            >
              <Shield className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Masuk
            </Link>
            <Link
              href="/register"
              className="group text-primary hover:text-primary-glow hover:underline transition-all duration-300 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Daftar
            </Link>
            <Link
              href="/packages"
              className="group text-primary hover:text-primary-glow hover:underline transition-all duration-300 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Paket
            </Link>
            <Link
              href="/gallery"
              className="group text-primary hover:text-primary-glow hover:underline transition-all duration-300 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
              Galeri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageExpired;
