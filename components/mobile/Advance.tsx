
import React, { useState } from 'react';
import { Team, Advance as AdvanceType } from '../../types';
import { MOCK_WORKERS } from '../../services/mockData';
import { Plus, User, ReceiptText, IndianRupee, History, LayoutGrid } from 'lucide-react';

interface Props {
  teamInfo: Team;
}

const Advance: React.FC<Props> = ({ teamInfo }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [workerId, setWorkerId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  
  const [advances, setAdvances] = useState<AdvanceType[]>([
    { id: 'A1', workerId: 'W1', teamId: 'T1', amount: 500, date: new Date().toISOString(), reason: 'Household' },
    { id: 'A2', workerId: 'W3', teamId: 'T1', amount: 200, date: new Date().toISOString(), reason: 'Travel' },
  ]);

  const teamWorkers = MOCK_WORKERS.filter(w => w.teamId === teamInfo.id);
  const totalWeekly = advances.reduce((sum, a) => sum + a.amount, 0);

  const handleAdd = () => {
    if (!workerId || !amount) return;
    const newAdvance: AdvanceType = {
      id: 'A' + Date.now(),
      workerId,
      teamId: teamInfo.id,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      reason
    };
    setAdvances([newAdvance, ...advances]);
    setShowAdd(false);
    setWorkerId('');
    setAmount('');
    setReason('');
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Redesigned Simplified Cap Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{teamInfo.name}</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Team Disbursement Cap</p>
          </div>
          
          <div className="mt-6 flex flex-col gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-400">₹</span>
              <h2 className="text-5xl font-black tracking-tighter text-slate-900">{totalWeekly.toLocaleString()}</h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <History size={12} className="text-emerald-500" />
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{advances.length} Transactions Issued</p>
            </div>
          </div>

          <button 
            onClick={() => setShowAdd(true)}
            className="mt-8 w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all font-black uppercase text-xs tracking-[0.2em]"
          >
            <Plus size={18} strokeWidth={3} />
            Add New Advance
          </button>
        </div>
      </div>

      {/* Tabular Column Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-indigo-500" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">Recent Disbursements</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50">
                  <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Worker</th>
                  <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Purpose</th>
                  <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Amount</th>
                  <th className="px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {advances.length > 0 ? (
                  advances.map(adv => {
                    const worker = teamWorkers.find(w => w.id === adv.workerId);
                    return (
                      <tr key={adv.id} className="active:bg-slate-50 transition-colors">
                        <td className="px-5 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">{worker?.name}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{worker?.role}</span>
                          </div>
                        </td>
                        <td className="px-5 py-5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                            {adv.reason || 'General'}
                          </span>
                        </td>
                        <td className="px-5 py-5 text-right">
                          <span className="text-sm font-black text-rose-500 tabular-nums">-₹{adv.amount}</span>
                        </td>
                        <td className="px-5 py-5 text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">
                            {new Date(adv.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      No Records to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Overlay for New Advance */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
            
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-black text-slate-900">New Advance</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Fund Allocation Request</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select Beneficiary</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <select 
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-bold appearance-none shadow-inner transition-all text-slate-900"
                  >
                    <option value="">Choose worker...</option>
                    {teamWorkers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Disbursement Amount</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 group-focus-within:text-indigo-500 transition-colors">₹</div>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-black text-xl shadow-inner transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Expense Detail</label>
                <div className="relative group">
                  <ReceiptText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Travel, Family..."
                    className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 font-bold shadow-inner transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={handleAdd}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all uppercase tracking-[0.25em]"
                >
                  Confirm Payout
                </button>
                <button 
                  onClick={() => setShowAdd(false)}
                  className="w-full bg-transparent text-slate-400 font-black py-3 rounded-2xl active:scale-[0.98] transition-all uppercase tracking-[0.25em] text-[10px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advance;
