import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  FileText, 
  User,
  Clock
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  sprint: string;
  cohort: string;
  status: 'active' | 'certified' | 'at_risk' | 'dropped';
  progress: number; // 0-100
  attendance: { s1: boolean; s2: boolean };
  proofsSubmitted: number;
  lastActive: string;
}

const TrainerStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSprint, setFilterSprint] = useState('all');

  // Mock Data
  const students: Student[] = [
    {
      id: 'st_1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      sprint: 'Advanced SaaS Economics',
      cohort: 'Oct 2024',
      status: 'active',
      progress: 75,
      attendance: { s1: true, s2: false },
      proofsSubmitted: 2,
      lastActive: '2 hours ago'
    },
    {
      id: 'st_2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
      sprint: 'Advanced SaaS Economics',
      cohort: 'Oct 2024',
      status: 'at_risk',
      progress: 20,
      attendance: { s1: false, s2: false },
      proofsSubmitted: 0,
      lastActive: '3 days ago'
    },
    {
      id: 'st_3',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      sprint: 'AI Implementation Strategy',
      cohort: 'Nov 2024',
      status: 'active',
      progress: 45,
      attendance: { s1: true, s2: true },
      proofsSubmitted: 1,
      lastActive: '5 hours ago'
    },
    {
      id: 'st_4',
      name: 'Diana Prince',
      email: 'diana@example.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
      sprint: 'Advanced SaaS Economics',
      cohort: 'Sep 2024',
      status: 'certified',
      progress: 100,
      attendance: { s1: true, s2: true },
      proofsSubmitted: 3,
      lastActive: '1 week ago'
    },
    {
      id: 'st_5',
      name: 'Evan Wright',
      email: 'evan@example.com',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100',
      sprint: 'Global Supply Chain',
      cohort: 'Oct 2024',
      status: 'active',
      progress: 60,
      attendance: { s1: true, s2: false },
      proofsSubmitted: 1,
      lastActive: '1 day ago'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesSprint = filterSprint === 'all' || student.sprint === filterSprint;
    
    return matchesSearch && matchesStatus && matchesSprint;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'certified': return 'bg-green-100 text-green-700';
      case 'at_risk': return 'bg-red-100 text-red-700';
      case 'dropped': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExport = () => {
    if (filteredStudents.length === 0) {
      alert("No students to export.");
      return;
    }

    const headers = ['Name', 'Email', 'Sprint', 'Cohort', 'Status', 'Progress (%)', 'Proofs Submitted', 'Last Active'];
    const csvRows = [
      headers.join(','),
      ...filteredStudents.map(student => [
        `"${student.name}"`,
        `"${student.email}"`,
        `"${student.sprint}"`,
        `"${student.cohort}"`,
        `"${student.status}"`,
        student.progress,
        student.proofsSubmitted,
        `"${student.lastActive}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `student_roster_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMessageAll = () => {
    if (filteredStudents.length === 0) {
      alert("No students selected to message.");
      return;
    }
    
    // In a real app, this would open a modal or drawer
    const message = prompt(`Send a message to ${filteredStudents.length} students:\n\nType your message below:`);
    
    if (message) {
      // Simulate API call
      alert(`Message sent successfully to ${filteredStudents.length} students via email and in-app notification.`);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-bold text-gray-900">Student Roster</h1>
             <span className="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-wider rounded border border-brand-200">
               {students.length} Total
             </span>
           </div>
           <p className="text-gray-500">Track engagement, review proofs of work, and issue certifications.</p>
        </div>
        <div className="flex gap-2">
           <button 
              onClick={handleExport}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2"
           >
              <Download className="w-4 h-4" /> Export CSV
           </button>
           <button 
              onClick={handleMessageAll}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2"
           >
              <Mail className="w-4 h-4" /> Message All
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Active Learners</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">
               {students.filter(s => s.status === 'active').length}
            </h3>
            <div className="w-full bg-gray-100 rounded-full h-1 mt-3">
               <div className="bg-blue-600 h-1 rounded-full" style={{ width: '60%' }}></div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase">Avg Completion</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">65%</h3>
            <p className="text-xs text-green-600 mt-1 font-bold flex items-center gap-1">
               <TrendingUp className="w-3 h-3" /> +5% vs last cohort
            </p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase">At Risk</p>
            <h3 className="text-2xl font-bold text-red-600 mt-2">
               {students.filter(s => s.status === 'at_risk').length}
            </h3>
            <p className="text-xs text-red-500 mt-1 font-medium">Need intervention</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase">Certified</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">
               {students.filter(s => s.status === 'certified').length}
            </h3>
            <p className="text-xs text-gray-400 mt-1">Total graduates</p>
         </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-t-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Search students..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-black focus:border-black w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
            <select 
               className="border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-black focus:border-black bg-white"
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
            >
               <option value="all">All Statuses</option>
               <option value="active">Active</option>
               <option value="at_risk">At Risk</option>
               <option value="certified">Certified</option>
            </select>
            <select 
               className="border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-black focus:border-black bg-white"
               value={filterSprint}
               onChange={(e) => setFilterSprint(e.target.value)}
            >
               <option value="all">All Sprints</option>
               <option value="Advanced SaaS Economics">SaaS Economics</option>
               <option value="AI Implementation Strategy">AI Strategy</option>
               <option value="Global Supply Chain">Supply Chain</option>
            </select>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
         <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
               <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Sprint & Cohort</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Progress & Proofs</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                     <tr key={student.id} className="hover:bg-gray-50 group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={student.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                              <div>
                                 <div className="font-bold text-gray-900">{student.name}</div>
                                 <div className="text-xs text-gray-500">{student.email}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="font-medium text-gray-900">{student.sprint}</div>
                           <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {student.cohort}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(student.status)}`}>
                              {student.status.replace('_', ' ')}
                           </span>
                        </td>
                        <td className="px-6 py-4 w-64">
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium">{student.progress}% Complete</span>
                              <span className="text-gray-500 flex items-center gap-1">
                                 <FileText className="w-3 h-3" /> {student.proofsSubmitted} Proofs
                              </span>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div 
                                 className={`h-2 rounded-full ${student.status === 'at_risk' ? 'bg-red-500' : student.status === 'certified' ? 'bg-green-500' : 'bg-brand-600'}`} 
                                 style={{ width: `${student.progress}%` }}
                              ></div>
                           </div>
                           <div className="flex gap-2 mt-2">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${student.attendance.s1 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>S1</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${student.attendance.s2 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>S2</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                           {student.lastActive}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full" title="Message">
                                 <Mail className="w-4 h-4" />
                              </button>
                              {student.status === 'certified' ? (
                                 <button className="p-2 text-green-600 bg-green-50 rounded-full cursor-default" title="Certified">
                                    <Award className="w-4 h-4" />
                                 </button>
                              ) : (
                                 <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full" title="Issue Certificate">
                                    <Award className="w-4 h-4" />
                                 </button>
                              )}
                              <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full">
                                 <MoreHorizontal className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No students found matching your filters.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default TrainerStudents;