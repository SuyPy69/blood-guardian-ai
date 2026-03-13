import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, navigate directly to the dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
             style={{ background: 'radial-gradient(ellipse, hsl(0 72% 51% / 0.4), transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
             style={{ background: 'radial-gradient(ellipse, hsl(40 90% 55% / 0.3), transparent 70%)' }} />
      </div>

      {/* Left panel - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <Droplets className="text-primary" size={28} />
            </div>
            <span className="text-2xl font-bold font-display text-foreground tracking-tight">
              Blood<span className="text-primary">Link</span>
            </span>
          </div>

          <h2 className="text-4xl font-bold font-display text-foreground leading-tight mb-4">
            Predictive Blood Supply <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Transforming reactive crisis response into synchronized emergency logistics across Bengaluru's hospital network.
          </p>

          <div className="space-y-4">
            {[
              { label: '136+', desc: 'Hospitals Connected' },
              { label: '48hr', desc: 'Predictive Window' },
              { label: '2.2L+', desc: 'ABDM Facility Scale' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <span className="text-xl font-bold font-display text-primary w-16">{stat.label}</span>
                <span className="text-sm text-muted-foreground">{stat.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Droplets className="text-primary" size={24} />
            <span className="text-xl font-bold font-display text-foreground tracking-tight">
              Blood<span className="text-primary">Link</span>
            </span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg"
               style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="mb-6">
              <h1 className="text-2xl font-bold font-display text-foreground mb-1">
                {isSignUp ? 'Create account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Join the predictive blood logistics network' : 'Sign in to access the blood supply grid'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground text-sm">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Dr. Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-secondary border-border pl-4 h-11 text-foreground placeholder:text-muted-foreground focus:border-primary"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm">Email</Label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@hospital.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border pl-10 h-11 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground text-sm">Password</Label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border pl-10 pr-10 h-11 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </span>
            </div>
          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-6">
            Secured by ABDM protocols • BloodLink v1.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}
