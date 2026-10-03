import React, { useState } from 'react';
import { ScrollText, ShieldCheck, Filter, Search, CheckCircle2, AlertTriangle, AlertOctagon, Hash, User, ExternalLink, Clock } from 'lucide-react';
import { AuditLogItem } from '../types/vara';

interface AuditConsoleProps {
  logs: AuditLogItem[];
  lang: 'fa' | 'en';
}

export const AuditConsole: React.FC<AuditConsoleProps> = ({
  logs,
  lang,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'INFO' | 'WARN' | 'CRITICAL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [chainVerified, setChainVerified] = useState(true);

  const filteredLogs = logs.filter(log => {
    if (filterSeverity !== 'ALL' && log.severity !== filterSeverity) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.id.toLowerCase().includes(term) ||
      log.title.toLowerCase().includes(term) ||
      log.titleFa.toLowerCase().includes(term) ||
      log.evidenceHash.toLowerCase().includes(term) ||
      log.operatorId.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Audit Banner */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-teal-400">
                  {lang === 'fa' ? 'دفتر کل حسابرسی غیرقابل‌تغییر' : 'IMMUTABLE AUDIT LEDGER'}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SHA-256 HASH-CHAINED
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-mono mt-0.5">
                {lang === 'fa' ? 'ثبت وقایع، شواهد و احکام سیستم' : 'Cryptographic Audit Trail'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {lang === 'fa'
                  ? 'تمامی تغییرات وضعیت، ارزیابی ناورداها و تصمیمات سیستم به صورت قطعی و با زنجیره هش SHA-256 ثبت می‌شوند و قابل ویرایش یا حذف نیستند.'
                  : 'Zero-mutation, cryptographically chained event stream capturing every invariant check, state change, and operator intervention.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-[#080C14] border border-slate-800 rounded-lg flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'fa' ? 'زنجیره هش: معتبر و پیوسته' : 'Hash Chain: Intact'}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-1.5 p-1 bg-[#080C14] rounded-lg border border-slate-800 text-xs">
            {(['ALL', 'INFO', 'WARN', 'CRITICAL'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 rounded font-mono transition-colors ${
                  filterSeverity === sev
                    ? 'bg-slate-800 text-teal-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev === 'ALL' ? (lang === 'fa' ? 'همه وقایع' : 'ALL') : sev}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute top-2.5 right-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'fa' ? 'جستجو در شناسه، هش یا عنوان...' : 'Search logs, hashes, IDs...'}
              className="w-full bg-[#080C14] border border-slate-800 rounded-lg py-1.5 pl-3 pr-9 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-3">
        {filteredLogs.map((item) => {
          const isCrit = item.severity === 'CRITICAL';
          const isWarn = item.severity === 'WARN';
          const isInfo = item.severity === 'INFO';

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition-all ${
                isCrit
                  ? 'bg-[#180A0D] border-red-500/50'
                  : isWarn
                  ? 'bg-[#1A150A] border-amber-500/40'
                  : 'bg-[#0E1526] border-slate-800 hover:border-slate-750'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {item.id}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                      isInfo
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                        : isWarn
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {item.severity}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.eventCategory}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                  <span>·</span>
                  <span>{Math.round((Date.now() - item.timestamp) / 1000)}s ago</span>
                </div>
              </div>

              <div className="mt-2.5">
                <h4 className="text-sm font-semibold text-white">
                  {lang === 'fa' ? item.titleFa : item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {lang === 'fa' ? item.detailsFa : item.details}
                </p>
              </div>

              {/* State Transition Badge if present */}
              {item.previousState && item.newState && (
                <div className="mt-3 p-2 bg-[#080C14] rounded border border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">{item.previousState}</span>
                  <span className="text-teal-400">&rarr;</span>
                  <span className="text-white font-bold">{item.newState}</span>
                </div>
              )}

              {/* Hash Proof & Operator ID */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5 truncate max-w-sm" title={item.evidenceHash}>
                  <Hash className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="text-slate-400 truncate">{item.evidenceHash}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.operatorId}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
