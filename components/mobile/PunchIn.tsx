
import React, { useState, useEffect } from 'react';
import { Team, Site, Worker } from '../../types';
import { MOCK_SITES, MOCK_WORKERS } from '../../services/mockData';
import { isWithinRadius } from '../../utils/geo';
import { MapPin, CheckCircle2, XCircle, Camera, RefreshCw, Loader2, ShieldCheck, UserCheck } from 'lucide-react';

interface Props {
  teamInfo: Team;
}

const PunchIn: React.FC<Props> = ({ teamInfo }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified' | 'denied'>('scanning');
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPunching, setIsPunching] = useState(false);
  const [message, setMessage] = useState('');

  const teamWorkers = MOCK_WORKERS.filter(w => w.teamId === teamInfo.id);

  const verifyLocation = () => {
    setStatus('scanning');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const foundSite = MOCK_SITES.find(site => 
            isWithinRadius(latitude, longitude, site.latitude, site.longitude, site.radiusMeters)
          );

          setTimeout(() => {
            if (foundSite) {
              setCurrentSite(foundSite);
              setStatus('verified');
            } else {
              setCurrentSite(null);
              setStatus('denied');
            }
          }, 1200); // Visual delay for realism
        },
        () => setStatus('denied'),
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    verifyLocation();
  }, []);

  const handlePunchIn = () => {
    if (!selectedWorker) return;
    setIsPunching(true);
    setTimeout(() => {
      setIsPunching(false);
      setMessage("Punched in successfully!");
      setSelectedWorker('');
      setPhoto(null);
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Geofence Verification Visualizer */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Security Check</h3>
            <h2 className="text-xl font-extrabold text-slate-900">
              {status === 'scanning' ? 'Verifying Site...' : 
               status === 'verified' ? 'Site Verified' : 'Location Restricted'}
            </h2>
          </div>
          <button onClick={verifyLocation} className="p-2 bg-slate-50 text-slate-500 rounded-xl hover:rotate-180 transition-transform duration-500">
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center py-4 relative">
          {status === 'scanning' ? (
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full radar-ring"></div>
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full radar-ring [animation-delay:0.5s]"></div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-indigo-100 z-10 animate-pulse">
                <MapPin className="text-indigo-600" size={32} />
              </div>
            </div>
          ) : status === 'verified' ? (
            <div className="w-full">
               <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 animate-in zoom-in-95 duration-300">
                 <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <ShieldCheck size={28} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active Access</p>
                    <p className="text-sm font-extrabold text-slate-800">{currentSite?.name}</p>
                 </div>
               </div>
            </div>
          ) : (
            <div className="w-full bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-4 animate-in shake duration-500">
               <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-100">
                  <XCircle size={28} />
               </div>
               <div>
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">Access Blocked</p>
                  <p className="text-[11px] font-medium text-slate-600">You are outside the 300m work zone.</p>
               </div>
            </div>
          )}
        </div>
      </section>

      {status === 'verified' && (
        <section className="space-y-5 animate-in slide-in-from-bottom-6 duration-700">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  <UserCheck size={14} className="text-indigo-500" />
                  Morning Roll Call
                </label>
                <select 
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none shadow-inner"
                >
                  <option value="">-- Select Team Member --</option>
                  {teamWorkers.map(w => (
                    <option key={w.id} value={w.id}>{w.name} • {w.role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Documentation</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-active:scale-90 transition-transform">
                      <Camera size={20} className="text-indigo-600" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Capture Photo</span>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) setPhoto(URL.createObjectURL(e.target.files[0]));
                    }} />
                  </label>
                  {photo ? (
                    <div className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md">
                      <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                      <p className="text-[10px] text-slate-300 font-bold uppercase">No Preview</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={!selectedWorker || isPunching}
                onClick={handlePunchIn}
                className={`w-full py-5 rounded-2xl text-white font-black tracking-widest uppercase transition-all shadow-xl shadow-indigo-200 ${
                  isPunching ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97]'
                }`}
              >
                {isPunching ? <Loader2 className="animate-spin mx-auto" /> : 'Confirm Attendance'}
              </button>
            </div>
          </div>
        </section>
      )}

      {message && (
        <div className="fixed bottom-28 left-5 right-5 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 z-50">
          <div className="bg-emerald-500 p-1.5 rounded-full">
            <CheckCircle2 size={16} />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider">{message}</p>
        </div>
      )}
    </div>
  );
};

export default PunchIn;
