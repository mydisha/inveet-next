import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, router, useForm } from "@inertiajs/react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/register", {
            onSuccess: (page) => {
        // Registration successful, show success message and redirect
        console.log('Registration successful!', page);
        setSuccessMessage('Account created successfully! Redirecting to dashboard...');

        // CSRF token will be refreshed automatically by the server
        // No need to manually refresh here as the redirect will load a fresh page

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.visit('/dashboard', {
            method: 'get',
            onSuccess: () => {
              console.log('Redirected to dashboard successfully');
            }
          });
        }, 1500);
      },
      onError: (errors) => {
        console.error('Registration failed:', errors);
        setSuccessMessage(""); // Clear any success message
      },
      onFinish: () => {
        // This will be called regardless of success or error
        console.log('Registration request finished');
      }
    });
  };

  const handleGoogleRegister = () => {
    window.location.href = "/auth/google";
  };

  // Clear success message when component unmounts
  useEffect(() => {
    return () => {
      setSuccessMessage("");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10 flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background decorative elements matching landing page */}
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
          <div className="inline-flex items-center justify-center mb-4">
            <Link href="/">
              <img
                src="/inveet-logo.png"
                alt="Inveet.Id"
                className="h-12 w-auto hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              />
            </Link>
          </div>
          <p className="text-foreground/70 mt-2">Your Digital Wedding Journey</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-inter-semibold text-foreground">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-muted-foreground font-inter-normal">
              Start creating your beautiful wedding invitation
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-inter-medium">{successMessage}</p>
              </div>
            )}

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-800 transition-all duration-200 group rounded-lg"
              size="lg"
              onClick={handleGoogleRegister}
              disabled={processing || !!successMessage}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Sign up with Google
              </span>
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-inter-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 border-2 transition-all duration-300 border-border focus:border-primary focus:ring-primary/20"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-inter-medium">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-2 transition-all duration-300 border-border focus:border-primary focus:ring-primary/20"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-inter-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="pl-10 pr-10 border-2 transition-all duration-300 border-border focus:border-primary focus:ring-primary/20"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-foreground font-inter-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 border-2 transition-all duration-300 border-border focus:border-primary focus:ring-primary/20"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 mt-1"
                  checked={data.terms}
                  onChange={(e) => setData('terms', e.target.checked)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed font-inter-normal">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors font-inter-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors font-inter-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full btn-hero group font-inter-medium"
                size="lg"
                disabled={processing || !!successMessage}
              >
                {processing ? 'Creating Account...' : successMessage ? 'Redirecting...' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-muted-foreground font-inter-normal">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary/80 font-inter-medium transition-colors">
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
            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group inline-flex items-center font-inter-normal"
          >
            <ArrowRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
