
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Send, 
  AlertTriangle, 
  Search, 
  Filter, 
  BarChart2, 
  Download, 
  Plus, 
  CreditCard,
  PhoneCall,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ChevronRight,
  ShieldAlert,
  FileText,
  Activity,
  Zap,
  Grid,
  List
} from 'lucide-react';
import { PartnerClient, PartnerAlert } from '../types';
import { PARTNER_ALERT_RULES } from '../data/partnerAlertRules';

const PartnerDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'heatmap'>('list');
  const [credits, setCredits] = useState(150); 
  const [showSendModal, setShowSendModal] = useState(false);
  
  // -- Enhanced Mock Data with Drivers for Rule Testing --
  const clients: PartnerClient[] = [
     { 
        id: 'c1', name: 'Kampala Logistics', company: 'Kampala Logistics Ltd', industry: 'Logistics', country: 'UG', 
        overallHealth: 45, criticalPillar: 'Fuel', lastAssessedDate: 'Oct 24', status: 'needs_call', 
        pillarScores: { engine: 60, fuel: 12, voice: 50, brain: 70, pulse: 40, shield: 30, tribe: 50 },
        drivers: { no_cash_buffer: true, overdue_invoices: 'high' } 
     },
     { 
        id: 'c2', name: 'TechFlow', company: 'TechFlow Inc', industry: 'SaaS', country: 'US', 
        overallHealth: 82, criticalPillar: 'Tribe', lastAssessedDate: 'Oct 20', status: 'stable', 
        pillarScores: { engine: 85, fuel: 90, voice: 80, brain: 85, pulse: 75, shield: 80, tribe: 65 },
        drivers: {}
     },
     { 
        id: 'c3', name: 'Apex Retail', company: 'Apex Retail Group', industry: 'Retail', country: 'KE', 
        overallHealth: 60, criticalPillar: 'Voice', lastAssessedDate: 'Oct 15', status: 'active', 
        pillarScores: { engine: 70, fuel: 65, voice: 25, brain: 60, pulse: 55, shield: 70, tribe: 60 },
        drivers: { no_followup_system: true }
     },
     { 
        id: 'c4', name: 'Green Agro', company: 'Green Agro Co', industry: 'Agriculture', country: 'NG', 
        overallHealth: 30, criticalPillar: 'Shield', lastAssessedDate: 'Oct 10', status: 'needs_call', 
        pillarScores: { engine: 40, fuel: 35, voice: 30, brain: 40, pulse: 30, shield: 15, tribe: 20 },
        drivers: { no_contracts: true, no_sops: true }
     },
     { 
        id: 'c5', name: 'Swift Movers', company: 'Swift Movers', industry: 'Logistics', country: 'UG', 
        overallHealth: 55, criticalPillar: 'Engine', lastAssessedDate: 'Oct 28', status: 'active', 
        pillarScores: { engine: 28, fuel: 60, voice: 55, brain: 60, pulse: 50, shield: 50, tribe: 55 },
        drivers: { no_sops: true } 
     }
  ];

  // -- Alert Evaluation Engine --
  const [alerts, setAlerts] = useState<PartnerAlert[]>([]);

  useEffect(() => {
    const generatedAlerts: PartnerAlert[] = [];
    clients.forEach(client => {
      PARTNER_ALERT_RULES.forEach(rule => {
        if (rule.trigger(client)) {
          generatedAlerts.push({
            id: `alert_${client.id}_${rule.id}`,
            clientId: client.id,
            clientName: client.name,
            type: rule.id,
            severity: rule.severity,
            message: rule.titleTemplate.replace('{Client}', client.name).replace('{CriticalPillar}', client.criticalPillar),
            action: rule.action,
            date: 'Just now'
          });
        }
      });
    });
    // Sort by severity (Critical first)
    generatedAlerts.sort((a, b) => a.severity === 'critical' ? -1 : 1);
    setAlerts(generatedAlerts);
  }, []);

  // -- Helpers --
  const getScoreColor = (score: number) => {
     if (score >= 70) return 'bg-green-500';
     if (score >= 40) return 'bg-amber-500';
     return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
     switch(status) {
        case 'needs_call': return <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><PhoneCall className="w-3 h-3" /> Call Now</span>;
        case 'stable': return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Stable</span>;
        case 'active': return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Active</span>;
        default: return <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">New</span>;
     }
  };

  // -- Components --

  const SendLinkModal = () => (
     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
           <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Send Diagnostic Link</h3>
              <button onClick={() => setShowSendModal(false)} className="text-gray-400 hover:text-black">✕</button>
           </div>
           <div className="p-6 space-y-4">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Client Email</label>
                 <input type="email" placeholder="client@example.com" className="w-full border-gray-300 rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Diagnostic Type</label>
                 <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border-2 border-black bg-gray-50 rounded-xl text-left">
                       <div className="font-bold text-sm">Quick Scan</div>
                       <div className="text-xs text-gray-500">1 Credit • 7 Mins</div>
                    </button>
                    <button className="p-3 border border-gray-200 rounded-xl text-left hover:border-gray-300">
                       <div className="font-bold text-sm">Deep Audit</div>
                       <div className="text-xs text-gray-500">5 Credits • 45 Mins</div>
                    </button>
                 </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2 border border-blue-100">
                 <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                 <p className="text-xs text-blue-800">
                    Link will include your branding. You will be notified when they complete it.
                 </p>
              </div>
           </div>
           <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">Balance: {credits} Credits</span>
              <button onClick={() => setShowSendModal(false)} className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800">
                 Send Link (-1 Credit)
              </button>
           </div>
        </div>
     </div>
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-full font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
               Partner Dashboard <span className="bg-brand-100 text-brand-800 text-xs px-2 py-1 rounded border border-brand-200 uppercase tracking-wider">Business Doctor</span>
            </h1>
            <p className="text-gray-500 mt-1">Monitoring <strong>{clients.length} clients</strong>. You have <strong>{alerts.length} urgent alerts</strong>.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold shadow-sm">
               Credits: <span className="text-brand-600">{credits}</span>
            </div>
            <button 
               onClick={() => setShowSendModal(true)}
               className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2 shadow-lg"
            >
               <Send className="w-4 h-4" /> Send Link
            </button>
         </div>
      </div>

      {/* Alerts Panel */}
      {alerts.length > 0 && (
         <div className="mb-8 space-y-2">
            {alerts.map(alert => (
               <div key={alert.id} className={`p-4 rounded-xl border flex items-center justify-between ${alert.severity === 'critical' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center gap-3">
                     {alert.severity === 'critical' ? <ShieldAlert className="w-5 h-5 text-red-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                     <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-gray-900">{alert.clientName}:</span>
                           <span className="text-gray-700">{alert.message}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Recommended: {alert.action}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-xs text-gray-500">{alert.date}</span>
                     <button className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50">View Client</button>
                  </div>
               </div>
            ))}
         </div>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-2">
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
               <input type="text" placeholder="Search clients..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black w-64" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 bg-white">
               <Filter className="w-4 h-4" /> Filter
            </button>
         </div>
         <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
               onClick={() => setActiveView('list')}
               className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${activeView === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            >
               <List className="w-4 h-4" /> List
            </button>
            <button 
               onClick={() => setActiveView('heatmap')}
               className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${activeView === 'heatmap' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            >
               <Grid className="w-4 h-4" /> Heatmap
            </button>
         </div>
      </div>

      {/* Views */}
      {activeView === 'list' ? (
         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-4">Client</th>
                     <th className="px-6 py-4">Industry</th>
                     <th className="px-6 py-4">Health Score</th>
                     <th className="px-6 py-4">Critical Pillar</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Last Check</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {clients.map(client => (
                     <tr key={client.id} className="hover:bg-gray-50 group">
                        <td className="px-6 py-4 font-bold text-gray-900">{client.name}</td>
                        <td className="px-6 py-4 text-gray-500">{client.industry}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getScoreColor(client.overallHealth)}`}></div>
                              <span className="font-bold">{client.overallHealth}/100</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-red-600 font-medium">{client.criticalPillar}</td>
                        <td className="px-6 py-4">{getStatusBadge(client.status)}</td>
                        <td className="px-6 py-4 text-gray-500">{client.lastAssessedDate}</td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full" title="View Report">
                                 <FileText className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full" title="More">
                                 <MoreHorizontal className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      ) : (
         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6">
            <div className="overflow-x-auto">
               <div className="grid grid-cols-8 gap-1 min-w-[800px]">
                  {/* Header Row */}
                  <div className="font-bold text-gray-500 text-xs p-2">Client</div>
                  {['Engine', 'Fuel', 'Voice', 'Brain', 'Pulse', 'Shield', 'Tribe'].map(p => (
                     <div key={p} className="font-bold text-gray-500 text-xs p-2 text-center uppercase">{p}</div>
                  ))}

                  {/* Rows */}
                  {clients.map(client => (
                     <React.Fragment key={client.id}>
                        <div className="text-sm font-bold text-gray-900 p-2 truncate border-b border-gray-50 flex items-center">{client.name}</div>
                        {['engine', 'fuel', 'voice', 'brain', 'pulse', 'shield', 'tribe'].map(key => {
                           // @ts-ignore
                           const score = client.pillarScores[key];
                           return (
                              <div key={key} className="p-1 border-b border-gray-50">
                                 <div className={`w-full h-8 rounded flex items-center justify-center text-xs font-bold text-white ${getScoreColor(score)}`}>
                                    {score}
                                 </div>
                              </div>
                           );
                        })}
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </div>
      )}

      {showSendModal && <SendLinkModal />}
    </div>
  );
};

export default PartnerDashboard;
