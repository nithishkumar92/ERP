
import React, { useState } from 'react';
import { Team, Worker, Role } from '../../types';
import { MOCK_WORKERS } from '../../services/mockData';
import { ChevronLeft, ChevronRight, Calendar, Users, TrendingUp, Download, ShieldCheck } from 'lucide-react';

interface Props {
  teamInfo: Team;
}

const Report: React.FC<Props> = ({ teamInfo }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  
  const teamWorkers = MOCK_WORKERS.filter(w => w.teamId === teamInfo.id);

  // Simulated reporting logic for the current or previous weeks
  const getWeekRangeLabel = () => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay() + (weekOffset * 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    return `${start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  // Mocked attendance data calculation
  const reportData = teamWorkers.map(w => {
    const daysWorked = 5; // Hardcoded for visual consistency with screenshot
    const grossWage = daysWorked * w.dailyRate;
    const advanceTaken = w.id === 'W1' ? 500 : 0;
    const netPay = grossWage - advanceTaken;

    return {
      ...w,
      daysWorked,
      grossWage,
      advanceTaken,
      netPay
    };
  });

  const totals = reportData.reduce((acc, curr) => ({
    gross: acc.gross + curr.grossWage,
    advances: acc.advances + curr.advanceTaken,
    net: acc.net + curr.netPay,
    days: acc.days + curr.daysWorked
  }), { gross: 0, advances: 0, net: 0, days: 0 });

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 print:p-0 print:space-y-4">
      {/* Report Header Section */}
      <div className="flex flex-col gap-4 print:hidden">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Team Report</h2>
        
        {/* Professional Week Selector */}
        <div className="flex items-center justify-between bg-white px-2 py-2 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setWeekOffset(prev => prev - 1)}
            className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 active:scale-90 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3 font-bold text-slate-700">
            <Calendar size={18} className="text-indigo-500" />
            <span className="text-sm uppercase tracking-widest">{getWeekRangeLabel()}</span>
          </div>
          <button 
            onClick={() => setWeekOffset(prev => prev + 1)}
            disabled={weekOffset >= 0}
            className={`p-3 rounded-xl transition-all ${weekOffset >= 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 active:scale-90 hover:bg-slate-50'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Summary Section - Centered/Grid style as per screenshot */}
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Gross Wage</p>
          <h4 className="text-4xl font-black text-slate-900 tracking-tighter">₹{totals.gross}</h4>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-indigo-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Total Days</p>
          </div>
          <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{totals.days}</h4>
        </div>
      </div>

      {/* Professional Payout Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Worker</th>
                <th className="px-4 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Days</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Net Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reportData.map(w => (
                <tr key={w.id} className="active:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900 tracking-tight">{w.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{w.role}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-base font-black text-slate-600">{w.daysWorked}d</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-base font-black text-slate-900">₹{w.netPay}</span>
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">Adv: ₹{w.advanceTaken}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-600">
                <td colSpan={2} className="px-6 py-6 text-[11px] font-black text-indigo-100 uppercase tracking-[0.2em]">Weekly Net Payable</td>
                <td className="px-6 py-6 text-right text-xl font-black text-white tracking-tighter">₹{totals.net}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Professional Export Action */}
      <div className="pt-2 print:hidden">
        <button 
          onClick={handleExportPDF}
          className="w-full py-5 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black uppercase text-xs tracking-[0.25em] flex items-center justify-center gap-3 shadow-sm active:scale-[0.98] active:bg-slate-50 transition-all"
        >
          <Download size={18} strokeWidth={3} className="text-indigo-600" />
          Export Report as PDF
        </button>
        
        <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
          <ShieldCheck size={14} className="text-slate-400" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Verified Team Log • ID {teamInfo.id}</p>
        </div>
      </div>

      {/* Print-only Footer */}
      <div className="hidden print:block border-t border-slate-100 pt-8 mt-12 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">ConstructPro ERP Automated Field Report</p>
      </div>
    </div>
  );
};

export default Report;
