import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle, Heart, Mail, Sparkles, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ForgotPassword() {
  const [showFlashMessage, setShowFlashMessage] = useState(false);

  const { flash } = usePage().props as any;

  const { data, setData, post, processing, errors, status } = useForm({
    email: '',
  });

  useEffect(() => {
    if (flash?.success || flash?.error || status) {
      setShowFlashMessage(true);
      const timer = setTimeout(() => setShowFlashMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64 opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48 opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-20">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">Inveet</h1>
          <p className="text-foreground/70 mt-2">Your Digital Wedding Journey</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Flash Messages */}
            {showFlashMessage && (flash?.success || status) && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {status || flash.success}
              </div>
            )}

            {showFlashMessage && flash?.error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                {flash.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 border-2 transition-all duration-300 ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'
                    }`}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full btn-hero group"
                size="lg"
                disabled={processing}
              >
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                {processing ? 'Sending Reset Link...' : 'Send Reset Link'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center pt-4">
              <p className="text-muted-foreground">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Landing */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
