
import React, { useState, useEffect } from 'react';
import { Team, Site, Worker, Role } from '../../types';
import { MOCK_SITES, MOCK_WORKERS } from '../../services/mockData';
import { isWithinRadius } from '../../utils/geo';
// Fix: Added XCircle to the imports from lucide-react
import { ArrowUpFromLine, Camera, Loader2, CheckCircle2, MapPin, XCircle } from 'lucide-react';

interface Props {
  teamInfo: Team;
}

const PunchOut: React.FC<Props> = ({ teamInfo }) => {
  const [locationVerified, setLocationVerified] = useState<boolean | null>(null);
  const [nearbySites, setNearbySites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>('');
  const [selectedWorker, setSelectedWorker] = useState<string>('');
  const [isPunching, setIsPunching] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Simulated: only workers from this team who are currently "working"
  const workingWorkers = MOCK_WORKERS.filter(w => w.teamId === teamInfo.id);

  const checkSites = () => {
    setLocationVerified(null);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const available = MOCK_SITES.filter(s => 
          isWithinRadius(latitude, longitude, s.latitude, s.longitude, s.radiusMeters)
        );
        setNearbySites(available);
        setLocationVerified(available.length > 0);
      });
    }
  };

  useEffect(() => {
    checkSites();
  }, []);

  const handlePunchOut = () => {
    setIsPunching(true);
    setTimeout(() => {
      setIsPunching(false);
      setMessage("Punch-Out successful!");
      setSelectedWorker('');
      setSelectedSite('');
      setPhoto(null);
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ArrowUpFromLine className="text-indigo-600" />
          Evening Check-out
        </h2>

        {locationVerified === false ? (
          <div className="text-center py-8">
            <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-gray-600 font-medium">You are not near any project sites.</p>
            <button onClick={checkSites} className="mt-4 text-indigo-600 font-bold uppercase tracking-wider text-sm">Retry Geofence Check</button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Select Active Site</label>
              <select 
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              >
                <option value="">-- Choose Site --</option>
                {nearbySites.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {selectedSite && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Select Worker</label>
                  <select 
                    value={selectedWorker}
                    onChange={(e) => setSelectedWorker(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  >
                    <option value="">-- Choose Worker --</option>
                    {workingWorkers.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Completion Photo (Optional)</label>
                  <div className="flex gap-4 items-center">
                    <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl hover:bg-indigo-50 transition-colors cursor-pointer text-gray-500">
                      <Camera size={24} className="mb-1" />
                      <span className="text-xs font-medium">Capture Photo</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => {
                        if (e.target.files?.[0]) setPhoto(URL.createObjectURL(e.target.files[0]));
                      }} />
                    </label>
                    {photo && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  disabled={!selectedWorker || isPunching}
                  onClick={handlePunchOut}
                  className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 active:transform active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  {isPunching ? <Loader2 className="animate-spin" /> : 'COMPLETE PUNCH-OUT'}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {message && (
        <div className="bg-indigo-700 text-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">{message}</p>
        </div>
      )}
    </div>
  );
};

export default PunchOut;
