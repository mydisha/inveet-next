import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-wedding-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-gold rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Inveet</h1>
          <p className="text-gray-600 mt-2">Your Digital Wedding Journey</p>
        </div>

        {/* Reset Password Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isSubmitted ? 'Check Your Email' : 'Reset Your Password'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSubmitted 
                ? 'We\'ve sent you a password reset link' 
                : 'Enter your email address and we\'ll send you a link to reset your password'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white transition-colors"
                    size="lg"
                  >
                    Send Reset Link
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Remember your password?{' '}
                    <Link
                      href="/login"
                      className="text-rose-gold hover:text-rose-gold/80 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Reset link sent!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-500 text-sm">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white transition-colors"
                  >
                    Send Another Email
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center text-gray-600 hover:text-rose-gold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
