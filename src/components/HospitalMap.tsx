import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { hospitals, bloodGroupLabels, getBloodStatus, getOverallStatus, type BloodGroup, type Hospital } from '@/data/hospitals';
import { Droplets } from 'lucide-react';

const statusColors = {
  critical: '#dc2626',
  stable: '#c8cdd3',
  surplus: '#eab308',
};

function BloodRow({ label, units, status }: { label: string; units: number; status: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 rounded-md" 
         style={{ backgroundColor: status === 'critical' ? 'rgba(220,38,38,0.12)' : status === 'surplus' ? 'rgba(234,179,8,0.1)' : 'rgba(200,205,211,0.06)' }}>
      <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{label}</span>
      <span className="text-sm font-bold tabular-nums" style={{ color: statusColors[status as keyof typeof statusColors] }}>
        {units} <span className="text-[10px] font-normal" style={{ color: '#64748b' }}>units</span>
      </span>
    </div>
  );
}

function HospitalPopup({ hospital }: { hospital: Hospital }) {
  const overall = getOverallStatus(hospital);
  const groups: BloodGroup[] = ['O_pos', 'O_neg', 'A_pos', 'A_neg', 'B_pos', 'B_neg', 'AB_pos', 'AB_neg'];

  return (
    <div className="min-w-[260px] max-w-[300px] p-4">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: statusColors[overall] + '22', border: `1px solid ${statusColors[overall]}44` }}>
          <Droplets size={16} style={{ color: statusColors[overall] }} />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight" style={{ color: '#e2e8f0', fontFamily: 'Space Grotesk' }}>{hospital.name}</h3>
          <p className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>
            {hospital.pincode !== 'Unknown' ? `PIN: ${hospital.pincode}` : 'Bengaluru'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-3 py-2 px-3 rounded-lg" 
           style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.6))', border: '1px solid rgba(100,116,139,0.2)' }}>
        <span className="text-[11px] uppercase tracking-wider" style={{ color: '#64748b' }}>Total Stock</span>
        <span className="text-lg font-bold" style={{ color: statusColors[overall], fontFamily: 'Space Grotesk' }}>
          {hospital.Total_Units}
        </span>
      </div>

      <div className="space-y-1">
        {groups.map((g) => (
          <BloodRow key={g} label={bloodGroupLabels[g]} units={hospital[g]} status={getBloodStatus(hospital[g])} />
        ))}
      </div>

      <div className="mt-3 flex gap-4 text-[10px]" style={{ color: '#475569' }}>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#dc2626' }} /> Critical ≤20</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#c8cdd3' }} /> Stable</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#eab308' }} /> Surplus ≥100</span>
      </div>
    </div>
  );
}

function MapBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = hospitals.map(h => [h.lat, h.lng] as [number, number]);
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [map]);
  return null;
}

export default function HospitalMap() {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[12.988, 77.56]}
        zoom={14}
        className="w-full h-full"
        zoomControl={true}
        style={{ background: 'hsl(220 20% 4%)' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapBounds />
        {hospitals.map((hospital) => {
          const status = getOverallStatus(hospital);
          const color = statusColors[status];
          return (
            <CircleMarker
              key={hospital.id}
              center={[hospital.lat, hospital.lng]}
              radius={status === 'critical' ? 10 : 7}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                weight: 2,
                opacity: 0.9,
              }}
              className={status === 'critical' ? 'marker-critical' : status === 'surplus' ? 'marker-surplus' : ''}
            >
              <Popup>
                <HospitalPopup hospital={hospital} />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
