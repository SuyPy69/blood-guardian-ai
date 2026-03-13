import { hospitals, getOverallStatus } from '@/data/hospitals';
import { Activity, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

export default function StatsBar() {
  const total = hospitals.length;
  const critical = hospitals.filter(h => getOverallStatus(h) === 'critical').length;
  const surplus = hospitals.filter(h => getOverallStatus(h) === 'surplus').length;
  const totalUnits = hospitals.reduce((s, h) => s + h.Total_Units, 0);

  const stats = [
    { label: 'Facilities', value: total, icon: MapPin, color: 'hsl(var(--foreground))' },
    { label: 'Critical', value: critical, icon: AlertTriangle, color: 'hsl(var(--blood-critical))' },
    { label: 'Surplus', value: surplus, icon: TrendingUp, color: 'hsl(var(--blood-surplus))' },
    { label: 'Total Units', value: totalUnits.toLocaleString(), icon: Activity, color: 'hsl(var(--foreground))' },
  ];

  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-card border-b border-border overflow-x-auto">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2 whitespace-nowrap">
          <s.icon size={14} style={{ color: s.color }} />
          <span className="text-xs text-muted-foreground">{s.label}</span>
          <span className="text-sm font-bold font-display" style={{ color: s.color }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
