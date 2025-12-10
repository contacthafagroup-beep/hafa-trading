'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Failed to create account. Please try again.');
      }
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length >= 6 ? 'strong' : password.length >= 4 ? 'medium' : 'weak';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="space-y-1 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center"
              >
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
              <p className="text-muted-foreground">
                Join Hafa Trading and start chatting with our team
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: passwordStrength === 'strong' ? '100%' : passwordStrength === 'medium' ? '66%' : '33%',
                            backgroundColor: passwordStrength === 'strong' ? '#22c55e' : passwordStrength === 'medium' ? '#eab308' : '#ef4444'
                          }}
                          className="h-full"
                        />
                      </div>
                      <span className={
                        passwordStrength === 'strong' ? 'text-green-600' : 
                        passwordStrength === 'medium' ? 'text-yellow-600' : 
                        'text-red-600'
                      }>
                        {passwordStrength === 'strong' ? 'Strong' : passwordStrength === 'medium' ? 'Medium' : 'Weak'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-20"
                      required
                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {confirmPassword && (
                        <>
                          {password === confirmPassword ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          )}
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.div>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
