import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Video, 
  Users, 
  MessageSquare, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Mic, 
  Monitor, 
  Settings,
  ChevronLeft,
  AlertOctagon,
  LogOut
} from 'lucide-react';
import { User, SprintSession } from '../types';

interface LiveSessionRoomProps {
  user: User;
  onExit: () => void;
}

const LiveSessionRoom: React.FC<LiveSessionRoomProps> = ({ user, onExit }) => {
  // Mock Session Data
  const [session, setSession] = useState<SprintSession>({
    id: 'sess_1',
    sprintId: 'spr_1',
    partNumber: 2,
    title: 'Execution & Review',
    startsAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // Starts in 15 mins
    endsAt: new Date(Date.now() + 1000 * 60 * 105).toISOString(),
    timezone: 'UTC',
    status: 'scheduled',
    meetJoinUrl: 'https://meet.google.com/abc-defg-hij'
  });

  // Local State
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins in seconds
  const [sentinelTimer, setSentinelTimer] = useState<number>(30 * 60); // 30 mins after start
  const [activeTab, setActiveTab] = useState<'chat' | 'resources' | 'roster'>('chat');
  const [checks, setChecks] = useState({ audio: false, video: false, slides: false });
  const [isTrainer] = useState(user.role === 'trainer');

  useEffect(() => {
    const timer = setInterval(() => {
      // Countdown to start
      if (new Date(session.startsAt).getTime() > Date.now()) {
         setTimeLeft(Math.floor((new Date(session.startsAt).getTime() - Date.now()) / 1000));
      } else {
         // Session should be live
         setTimeLeft(0);
         // Start Sentinel Countdown if not live
         if (session.status !== 'live' && session.status !== 'completed' && session.status !== 'canceled') {
            setSentinelTimer(prev => Math.max(0, prev - 1));
         }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session.startsAt, session.status]);

  // Sentinel Trigger Simulation
  useEffect(() => {
     if (sentinelTimer === 0 && session.status === 'scheduled') {
        setSession(prev => ({ ...prev, status: 'no_show' }));
     }
  }, [sentinelTimer, session.status]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(Math.abs(seconds) / 60);
    const s = Math.abs(seconds) % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartSession = () => {
     if (checks.audio && checks.video) {
        setSession({ ...session, status: 'live', sessionStartedAt: new Date().toISOString() });
     }
  };

  const handleEndSession = () => {
     if (confirm("Are you sure you want to end the session for everyone?")) {
        setSession({ ...session, status: 'completed', endedAt: new Date().toISOString() });
     }
  };

  const renderTrainerConsole = () => (
     <div className="bg-gray-900 text-white p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-4">
           <div>
              <h2 className="font-bold text-lg">{session.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                 <span className="bg-gray-800 px-2 py-0.5 rounded">Part {session.partNumber}</span>
                 <span>{session.status === 'live' ? 'LIVE' : 'PRE-FLIGHT'}</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4">
           {session.status === 'scheduled' && (
              <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                 <div className="text-right">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                       <AlertOctagon className="w-3 h-3" /> Sentinel Active
                    </p>
                    <p className="text-xs text-gray-400">Auto-cancel in {formatTime(sentinelTimer)}</p>
                 </div>
                 <div className="h-8 w-px bg-gray-700"></div>
                 <button 
                    onClick={handleStartSession}
                    disabled={!checks.audio || !checks.video}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                    Start Session
                 </button>
              </div>
           )}
           {session.status === 'live' && (
              <button 
                 onClick={handleEndSession}
                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold transition-colors"
              >
                 End Session
              </button>
           )}
        </div>
     </div>
  );

  const renderPreFlightCheck = () => (
     <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
           <div className="p-8 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                 <Video className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pre-Flight Check</h2>
              <p className="text-gray-500 mt-2">Verify your setup before going live to avoid strikes.</p>
           </div>
           
           <div className="p-8 space-y-4">
              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${checks.audio ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <input type="checkbox" className="hidden" checked={checks.audio} onChange={() => setChecks({...checks, audio: !checks.audio})} />
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${checks.audio ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                    {checks.audio && <CheckCircle2 className="w-4 h-4" />}
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-gray-900 flex items-center gap-2"><Mic className="w-4 h-4" /> Audio Check</p>
                    <p className="text-xs text-gray-500">Confirm your microphone is capturing clear audio.</p>
                 </div>
              </label>

              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${checks.video ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                 <input type="checkbox" className="hidden" checked={checks.video} onChange={() => setChecks({...checks, video: !checks.video})} />
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${checks.video ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                    {checks.video && <CheckCircle2 className="w-4 h-4" />}
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-gray-900 flex items-center gap-2"><Monitor className="w-4 h-4" /> Video Check</p>
                    <p className="text-xs text-gray-500">Confirm your camera and lighting are professional.</p>
                 </div>
              </label>
           </div>

           <div className="p-6 bg-gray-50 border-t border-gray-200 text-center">
              {timeLeft > 0 ? (
                 <p className="text-sm text-gray-600 font-medium">Session starts in {formatTime(timeLeft)}</p>
              ) : (
                 <p className="text-sm text-green-600 font-bold">Session is ready to start!</p>
              )}
           </div>
        </div>
     </div>
  );

  const renderStudentWaiting = () => (
     <div className="flex-1 flex items-center justify-center bg-gray-900 p-8 text-white">
        <div className="text-center max-w-lg">
           <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-10 h-10 text-gray-400" />
           </div>
           <h2 className="text-3xl font-bold mb-4">Waiting for Host</h2>
           <p className="text-gray-400 mb-8">
              The session hasn't started yet. Please wait here. The room will unlock automatically when the trainer begins.
           </p>
           
           <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
              <div className="flex flex-col items-start">
                 <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Scheduled Start</span>
                 <span className="font-mono text-lg font-bold">{new Date(session.startsAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="h-8 w-px bg-gray-600"></div>
              <div className="flex flex-col items-start">
                 <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Status</span>
                 <span className="text-sm font-bold text-amber-400">On Time</span>
              </div>
           </div>

           {/* Sentinel Assurance */}
           <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldAlert className="w-4 h-4" />
              <span>Protected by Sentinel: If start delayed {'>'}30m, auto-refund triggers.</span>
           </div>
        </div>
     </div>
  );

  const renderCanceledState = () => (
     <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-red-200 p-8 text-center">
           <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900">Session Canceled</h2>
           <p className="text-gray-600 mt-2 mb-6">
              The trainer did not start the session within the 30-minute window. Sentinel has triggered an automatic refund.
           </p>
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-left">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Next Steps:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Full refund processed to original payment method.</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Strike issued to trainer.</li>
              </ul>
           </div>
           <button onClick={onExit} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800">
              Return to Dashboard
           </button>
        </div>
     </div>
  );

  const renderLiveInterface = () => (
     <div className="flex-1 flex overflow-hidden">
        {/* Main Stage (Embedded Meet Placeholder) */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
           <div className="text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                 <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Google Meet Embed</h3>
              <p className="text-gray-400 text-sm mb-6">Simulation: Meet iframe would load here.</p>
              <a 
                 href={session.meetJoinUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold inline-flex items-center gap-2"
              >
                 Open in New Window <Monitor className="w-4 h-4" />
              </a>
           </div>
           
           {/* In-Platform Overlays */}
           <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-mono border border-white/10">
              LIVE • 00:12:45
           </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
           <div className="flex border-b border-gray-200">
              {['chat', 'resources', 'roster'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'chat' && (
                 <div className="flex flex-col h-full justify-end">
                    <div className="space-y-4 mb-4">
                       <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                          <p className="text-xs font-bold text-gray-700">Sarah Jenkins</p>
                          <p className="text-sm text-gray-900">Welcome everyone! We'll start in 2 mins.</p>
                       </div>
                    </div>
                    <div className="relative">
                       <input type="text" placeholder="Type a message..." className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-black focus:border-black" />
                       <button className="absolute right-2 top-2 text-gray-400 hover:text-black">
                          <MessageSquare className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              )}
              {activeTab === 'resources' && (
                 <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Session Materials</h4>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                       <FileText className="w-5 h-5 text-indigo-600" />
                       <div>
                          <p className="text-sm font-bold text-gray-900">Workbook.pdf</p>
                          <p className="text-xs text-gray-500">3.2 MB</p>
                       </div>
                    </div>
                 </div>
              )}
              {activeTab === 'roster' && (
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                       <span>Participants</span>
                       <span>12/50</span>
                    </div>
                    {[1,2,3].map(i => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                          <span className="text-sm font-medium text-gray-900">Student {i}</span>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           {/* Safety Footer */}
           <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-600 bg-white border border-red-200 py-2 rounded hover:bg-red-50">
                 <AlertTriangle className="w-3 h-3" /> Report Audio/Video Issue
              </button>
           </div>
        </div>
     </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
       {/* Top Bar */}
       <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
             <button onClick={onExit} className="text-gray-500 hover:text-black">
                <ChevronLeft className="w-5 h-5" />
             </button>
             <span className="font-bold text-gray-900">ExecuStay Live</span>
          </div>
          <div className="flex items-center gap-4">
             {!isTrainer && (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                   <ShieldAlert className="w-3 h-3" />
                   Safety Protocol Active
                </div>
             )}
             <button onClick={onExit} className="text-gray-500 hover:text-red-600" title="Leave">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
       </header>

       {/* Content Area */}
       <div className="flex-1 flex flex-col">
          {session.status === 'no_show' ? renderCanceledState() : (
             <>
                {isTrainer && renderTrainerConsole()}
                
                {session.status === 'scheduled' && isTrainer && renderPreFlightCheck()}
                {session.status === 'scheduled' && !isTrainer && renderStudentWaiting()}
                {session.status === 'live' && renderLiveInterface()}
                {session.status === 'completed' && (
                   <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                         <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                         <h2 className="text-2xl font-bold text-gray-900">Session Completed</h2>
                         <button onClick={onExit} className="mt-6 text-brand-600 font-bold hover:underline">Return to Dashboard</button>
                      </div>
                   </div>
                )}
             </>
          )}
       </div>
    </div>
  );
};

export default LiveSessionRoom;
