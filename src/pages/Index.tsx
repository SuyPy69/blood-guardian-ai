import { motion } from 'framer-motion';
import { Droplets, Map, Activity, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, hsl(0 72% 51% / 0.3), transparent 70%)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <Droplets className="text-primary" size={28} />
          <span className="text-xl font-bold font-display text-foreground tracking-tight">Blood<span className="text-primary">Link</span></span>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/map')} className="border-primary/30 text-primary hover:bg-primary/10">
          Open Grid Map
        </Button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Activity size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">Predictive Blood Logistics</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground max-w-4xl leading-[1.1] mb-6">
            48-Hour <span className="text-primary">Predictive</span> Blood Supply Grid
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transforming reactive crisis response into synchronized emergency logistics. 
            Real-time blood inventory tracking across Bengaluru's hospital network.
          </p>

          <div className="flex items-center gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/map')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-base px-8 py-6">
              <Map size={18} className="mr-2" />
              Launch Grid Map
            </Button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 max-w-4xl w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { icon: Activity, title: 'Predictive Analytics', desc: 'Anticipate shortages 48 hours before crisis peaks using environmental triggers.' },
            { icon: Map, title: 'Decentralized Grid', desc: 'Elevate isolated clinics into visible, data-active nodes across the network.' },
            { icon: Shield, title: 'ABDM Integration', desc: 'Scalable architecture connecting 2.2 lakh+ facilities with federated SQL backend.' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group">
              <f.icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
