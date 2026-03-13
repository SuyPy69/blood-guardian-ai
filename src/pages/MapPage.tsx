import { Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HospitalMap from '@/components/HospitalMap';
import StatsBar from '@/components/StatsBar';

export default function MapPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Droplets className="text-primary" size={22} />
          <span className="text-lg font-bold font-display text-foreground tracking-tight">
            Blood<span className="text-primary">Link</span>
          </span>
        </button>
        <span className="text-xs text-muted-foreground font-mono">BENGALURU GRID • LIVE</span>
      </header>

      <StatsBar />

      {/* Map */}
      <div className="flex-1">
        <HospitalMap />
      </div>
    </div>
  );
}
