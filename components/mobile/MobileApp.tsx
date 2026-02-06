
import React, { useState } from 'react';
import { Team } from '../../types';
import { LogOut, MapPin, Navigation, Wallet, ClipboardList, Briefcase } from 'lucide-react';
import PunchIn from './PunchIn';
import PunchOut from './PunchOut';
import Advance from './Advance';
import Report from './Report';

interface Props {
  teamInfo: Team;
  onLogout: () => void;
}

const MobileApp: React.FC<Props> = ({ teamInfo, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'punchin' | 'punchout' | 'advance' | 'report'>('punchin');

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 relative overflow-hidden">
      {/* Premium Header */}
      <header className="glass sticky top-0 z-50 border-b border-slate-200/60 safe-area-top">
        <div className="px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">{teamInfo.name}</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{teamInfo.category}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-28 pt-2">
        <div className="px-5">
          {activeTab === 'punchin' && <PunchIn teamInfo={teamInfo} />}
          {activeTab === 'punchout' && <PunchOut teamInfo={teamInfo} />}
          {activeTab === 'advance' && <Advance teamInfo={teamInfo} />}
          {activeTab === 'report' && <Report teamInfo={teamInfo} />}
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] glass border border-slate-200/50 rounded-[2rem] shadow-2xl shadow-slate-300/50 flex justify-between items-center px-2 py-2 z-50">
        <TabButton 
          active={activeTab === 'punchin'} 
          onClick={() => setActiveTab('punchin')} 
          icon={<Navigation size={22} />} 
          label="In" 
        />
        <TabButton 
          active={activeTab === 'punchout'} 
          onClick={() => setActiveTab('punchout')} 
          icon={<MapPin size={22} />} 
          label="Out" 
        />
        <TabButton 
          active={activeTab === 'advance'} 
          onClick={() => setActiveTab('advance')} 
          icon={<Wallet size={22} />} 
          label="Advance" 
        />
        <TabButton 
          active={activeTab === 'report'} 
          onClick={() => setActiveTab('report')} 
          icon={<ClipboardList size={22} />} 
          label="Report" 
        />
      </nav>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 gap-1 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'
    }`}
  >
    {icon}
    <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-slate-400'}`}>
      {label}
    </span>
  </button>
);

export default MobileApp;
