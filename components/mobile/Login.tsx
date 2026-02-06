
import React, { useState } from 'react';
import { MOCK_TEAMS } from '../../services/mockData';
import { Team } from '../../types';
import { Lock, User, HardHat, ShieldCheck, ChevronRight, Info, Construction } from 'lucide-react';

interface Props {
  onLogin: (team: Team) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock network delay for realism
    setTimeout(() => {
      const team = MOCK_TEAMS.find(t => t.id === teamId || t.name.toLowerCase() === teamId.toLowerCase());
      
      if (team && password === '1234') { // Mock auth
        onLogin(team);
      } else {
        setError('Verification failed. Please check credentials.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col justify-center relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* 1. Industrial Grid Background (Blueprint style) */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* 2. Film Grain / Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 3. Ambient Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto px-8 py-12 flex flex-col items-center">
        
        {/* Branding Header - Centered as requested */}
        <div className="flex flex-col items-center mb-10 text-center w-full">
          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 transition-all duration-500">
              <HardHat size={42} className="text-white drop-shadow-lg" />
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-white tracking-tighter mb-3">
            CONSTRUCT<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">PRO</span>
          </h1>
          
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Construction size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em]">Field Operations Core</span>
          </div>
        </div>

        {/* Login Card with even gaps and glassmorphism */}
        <div className="w-full bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] p-10 border border-white/10 card-entrance relative overflow-hidden group">
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white leading-tight">Team Portal</h2>
            <p className="text-sm font-medium text-slate-400 mt-2">Authorized Site Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Assigned ID</label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" size={20} />
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none font-bold text-white transition-all placeholder:text-slate-600"
                  placeholder="TEAM-01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Security Key</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4.5 bg-white/[0.05] border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none font-bold text-white transition-all placeholder:text-slate-600"
                  placeholder="••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-rose-400 bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 animate-in shake-error">
                <Info size={18} />
                <p className="text-xs font-bold uppercase tracking-wide">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full group relative overflow-hidden bg-white text-slate-950 font-black py-5 rounded-2xl shadow-2xl transition-all active:scale-[0.96] flex items-center justify-center uppercase tracking-[0.25em] ${isLoading ? 'opacity-80' : 'hover:bg-slate-100'}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? 'Decrypting...' : 'Initiate Session'}
                {!isLoading && <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />}
              </span>
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-6">
            <button type="button" className="text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors">Reset Key</button>
            <div className="w-1 h-1 bg-slate-700 rounded-full my-auto"></div>
            <button type="button" className="text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors">Support</button>
          </div>
        </div>

        {/* Footer info - Symmetrically spaced */}
        <div className="mt-14 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck size={16} className="text-indigo-500/50" />
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
              Encrypted Management Interface
            </p>
          </div>
          <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.1em]">
            Build: 2025.04.12 • Node-Alpha
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
