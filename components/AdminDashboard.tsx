
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CreditCard, 
  ShieldAlert, 
  FileText, 
  History, 
  Settings, 
  Database,
  Edit,
  Save,
  Check,
  X,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { MOCK_ADMIN_USERS, MOCK_PRICING_RULES, MOCK_AUDIT_LOGS, MOCK_CONTENT_SNIPPETS } from '../data/adminMockData';
import { PricingRule, ContentSnippet, UserAdminView } from '../types';

interface AdminDashboardProps {
   initialTab?: 'users' | 'pricing' | 'cms' | 'audit';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialTab = 'users' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // -- State --
  const [userSearch, setUserSearch] = useState('');
  const [pricingRules, setPricingRules] = useState<PricingRule[]>(MOCK_PRICING_RULES);
  const [snippets, setSnippets] = useState<ContentSnippet[]>(MOCK_CONTENT_SNIPPETS);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  
  // -- Actions --
  const handlePriceChange = (id: string, newAmount: number) => {
     setPricingRules(prev => prev.map(r => r.id === id ? { ...r, amount: newAmount } : r));
     setEditingRule(null);
  };

  const filteredUsers = MOCK_ADMIN_USERS.filter(u => 
     u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
     u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // -- Renderers --

  const UserManagement = () => (
     <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <div className="relative w-96">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                 type="text" 
                 placeholder="Search users by name or email..." 
                 className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:ring-black focus:border-black"
                 value={userSearch}
                 onChange={e => setUserSearch(e.target.value)}
              />
           </div>
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filters
           </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">LTV</th>
                    <th className="px-6 py-4">Risk Score</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <img src={user.avatar} className="w-8 h-8 rounded-full" />
                             <div>
                                <div className="font-bold text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 capitalize">{user.role}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase 
                             ${user.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                             {user.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 font-mono">${user.ltv}</td>
                       <td className="px-6 py-4">
                          {user.riskScore && user.riskScore > 50 ? (
                             <span className="text-red-600 font-bold flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> {user.riskScore}</span>
                          ) : (
                             <span className="text-green-600 font-bold">{user.riskScore || 0}</span>
                          )}
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                             <MoreHorizontal className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  );

  const PricingEngine = () => (
     <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" /> Geo-Pricing Engine (PPP)
           </h3>
           <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                 <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Tier / Region</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Edit</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {pricingRules.map(rule => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 font-bold capitalize">{rule.product.replace('_', ' ')}</td>
                       <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                             Tier {rule.tier}
                          </span>
                          <span className="text-gray-500 text-xs ml-2">{rule.regionGroup}</span>
                       </td>
                       <td className="px-6 py-4">
                          {editingRule === rule.id ? (
                             <div className="flex items-center gap-2">
                                <input 
                                   type="number" 
                                   className="w-20 border-gray-300 rounded p-1 text-sm" 
                                   defaultValue={rule.amount}
                                   onBlur={(e) => handlePriceChange(rule.id, parseFloat(e.target.value))}
                                   autoFocus
                                />
                                <span className="text-xs font-bold text-gray-500">{rule.currency}</span>
                             </div>
                          ) : (
                             <span className="font-mono font-bold text-gray-900">{rule.amount} {rule.currency}</span>
                          )}
                       </td>
                       <td className="px-6 py-4">
                          {rule.isActive ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => setEditingRule(rule.id)} className="text-blue-600 hover:text-blue-800 font-bold text-xs">
                             Edit
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  );

  const AuditLog = () => (
     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
           <h3 className="font-bold text-gray-900">System Audit Log</h3>
        </div>
        <table className="w-full text-sm text-left">
           <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                 <th className="px-6 py-4">Timestamp</th>
                 <th className="px-6 py-4">Actor</th>
                 <th className="px-6 py-4">Action</th>
                 <th className="px-6 py-4">Target</th>
                 <th className="px-6 py-4">Details</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {MOCK_AUDIT_LOGS.map(log => (
                 <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.timestamp}</td>
                    <td className="px-6 py-4">
                       <span className="font-bold text-gray-900 block">{log.actorName}</span>
                       <span className="text-xs text-gray-500 capitalize">{log.actorRole}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-700">{log.action}</td>
                    <td className="px-6 py-4 text-gray-600">{log.targetResource} / {log.targetId}</td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">
                       {JSON.stringify(log.changes || log.metadata)}
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
     </div>
  );

  const CMS = () => (
     <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
           <h3 className="font-bold text-gray-900 text-xl">Truth Snippets (RAG Source)</h3>
           <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
              + New Snippet
           </button>
        </div>
        <div className="grid gap-4">
           {snippets.map(snip => (
              <div key={snip.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                       <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold uppercase">{snip.pillar}</span>
                       <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase">{snip.band}</span>
                       <span className="text-xs text-gray-400 font-mono">{snip.textKey}</span>
                    </div>
                    <button className="text-gray-400 hover:text-black"><Edit className="w-4 h-4" /></button>
                 </div>
                 <p className="text-gray-800 text-sm leading-relaxed font-medium">"{snip.content}"</p>
                 <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-2">
                    Last updated: {snip.lastUpdated}
                 </div>
              </div>
           ))}
        </div>
     </div>
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-full font-sans text-slate-900">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
             <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded">Super Admin</span>
           </div>
           <p className="text-gray-500">Manage users, pricing, and system integrity.</p>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
             { id: 'users', label: 'Users', icon: Users },
             { id: 'pricing', label: 'Pricing', icon: CreditCard },
             { id: 'cms', label: 'Content', icon: Database },
             { id: 'audit', label: 'Audit Log', icon: History }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-fade-in">
         {activeTab === 'users' && <UserManagement />}
         {activeTab === 'pricing' && <PricingEngine />}
         {activeTab === 'cms' && <CMS />}
         {activeTab === 'audit' && <AuditLog />}
      </div>
    </div>
  );
};

export default AdminDashboard;
