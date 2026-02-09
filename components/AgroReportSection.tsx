import React from 'react';
import { GeneratedReport, DeepScanScores, AgroIndex } from '../types';
import { AlertTriangle, TrendingDown, CheckCircle2, HelpCircle, Activity, FileText } from 'lucide-react';

interface AgroReportSectionProps {
    report: GeneratedReport;
}

export const AgroReportSection: React.FC<AgroReportSectionProps> = ({ report }) => {
    const { agroIndices, deepScanScores, profileContext } = report;

    if (!agroIndices && !deepScanScores) return null;

    return (
        <div className="space-y-12 mb-16 animate-fade-in">

            {/* 1. Deep Scan Scores */}
            {deepScanScores && (
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Deep Scan Analysis</h2>
                                <p className="text-slate-400">
                                    Operational maturity assessment based on {profileContext?.operatingModel || 'your setup'} & {profileContext?.complianceLevel || 'compliance'}.
                                </p>
                            </div>
                            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium backdrop-blur-sm">
                                {profileContext?.agroSubSector} Sector
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(deepScanScores.pillars).map(([key, score]) => {
                                const conf = deepScanScores.confidence[key as keyof typeof deepScanScores.confidence];
                                return (
                                    <div key={key} className="bg-white/5 rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="capitalize font-bold text-lg text-slate-200">{key}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${conf === 'High' ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'}`}>
                                                {conf} Conf.
                                            </span>
                                        </div>
                                        <div className="relative h-4 bg-slate-800 rounded-full mb-4 overflow-hidden">
                                            <div
                                                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${score > 70 ? 'bg-teal-500' : score > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                style={{ width: `${score}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-4xl font-bold">{score}</span>
                                            <span className="text-sm text-slate-400 mb-1">/ 100</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Top Profit Leaks (Indices) */}
            {agroIndices && agroIndices.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Critical Profit Leaks</h2>
                            <p className="text-slate-500">Specific verified drains on your margin</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {agroIndices.map((idx) => (
                            <div key={idx.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                                {/* Left: Indicator */}
                                <div className="w-full md:w-2 bg-red-500 md:h-auto h-2"></div>

                                {/* Content */}
                                <div className="p-8 flex-1">
                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                                {idx.title}
                                                <span className="text-sm font-normal text-slate-400 px-2 py-1 bg-gray-100 rounded-md">
                                                    Pillar: {idx.pillar}
                                                </span>
                                            </h3>
                                            <p className="text-slate-600 mt-2 text-lg">{idx.meaning}</p>
                                        </div>
                                        <div className="text-right">
                                            {idx.detectedCost && (
                                                <div className="inline-block bg-red-50 text-red-700 font-bold px-4 py-3 rounded-xl border border-red-100 animate-pulse-slow">
                                                    {idx.detectedCost}
                                                    <div className="text-[10px] text-red-400 uppercase tracking-widest mt-1">Est. Loss</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-100">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                            <div className="text-sm text-slate-700">
                                                <strong>Silent Cost:</strong> {idx.silentCost}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-slate-400" /> Manager Mirror Questions
                                        </h4>
                                        <div className="space-y-3">
                                            {idx.mirrorQuestions.slice(0, 3).map((q, i) => (
                                                <div key={i} className="flex gap-3 items-start text-slate-600 text-sm group-hover:text-slate-900 transition-colors">
                                                    <span className="text-teal-500 font-bold">?</span>
                                                    {q}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};
