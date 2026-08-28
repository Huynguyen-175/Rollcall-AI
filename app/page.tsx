'use client';

import { useRef, useState } from 'react';
import { Camera, ChevronRight, Crosshair, ImagePlus, Radio, Settings2, Sparkles, TimerReset, Upload, X } from 'lucide-react';

const officialGameplayImage = '/tft-gameplay.jpg';

const targets = [{ name: 'Kog’Maw 2★', done: true }, { name: 'Vi 2★', done: false }, { name: 'Frontline upgrade', done: false }];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<'normal' | 'fast'>('normal');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [analysisText, setAnalysisText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [personalApiKey, setPersonalApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'coach' | 'api'>('coach');
  function choose(file?: File) {
    if (!file || !file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    setAnalyzed(false);
    setErrorText('');
    const reader = new FileReader();
    reader.onload = () => setImageData(typeof reader.result === 'string' ? reader.result : null);
    reader.readAsDataURL(file);
  }
  async function analyze() {
    if (!imageData || analyzing) return;
    setAnalyzing(true); setAnalyzed(false); setErrorText('');
    try {
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: imageData, mode, apiKey: personalApiKey || undefined }) });
      const payload = await response.json() as { analysis?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || 'Analysis failed.');
      setAnalysisText(payload.analysis || 'No decision returned.');
      setAnalyzed(true);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : 'Analysis failed.');
    } finally { setAnalyzing(false); }
  }
  return (
    <main className="min-h-screen bg-[#080b12] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#080b12]/90 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_30px_rgba(124,92,255,.3)]"><Crosshair size={19}/></div><div><p className="text-[15px] font-extrabold tracking-tight">ROLLCALL <span className="text-cyan-300">AI</span></p><p className="text-[9px] font-semibold uppercase tracking-[.23em] text-slate-500">Live TFT Copilot</p></div></div>
        <div className="flex items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1.5 text-[11px] font-bold text-emerald-300 sm:flex"><Radio size={12}/> LIVE SESSION</span><button onClick={() => setActiveTab('api')} aria-label="Personal API key" className="rounded-lg border border-white/8 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"><Settings2 size={17}/></button></div>
      </div></header>
      <div className="mx-auto flex max-w-[1500px] gap-2 px-4 pt-4 sm:px-6"><button onClick={() => setActiveTab('coach')} className={`rounded-lg px-4 py-2 text-xs font-extrabold ${activeTab === 'coach' ? 'bg-violet-500 text-white' : 'border border-white/10 text-slate-400'}`}>TFT Coach</button><button onClick={() => setActiveTab('api')} className={`rounded-lg px-4 py-2 text-xs font-extrabold ${activeTab === 'api' ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 text-slate-400'}`}>Personal API key</button></div>
      {activeTab === 'api' && <div className="mx-auto max-w-[1500px] px-4 pt-4 sm:px-6"><section className="rounded-2xl border border-cyan-300/20 bg-[#0d111b] p-5"><h1 className="text-lg font-extrabold">Use your own OpenAI API key</h1><p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">Your key stays in this browser tab, is sent only when you analyze a screenshot, and is never saved to GitHub or the site. Refreshing the page clears it.</p><label className="mt-4 block text-xs font-bold text-slate-300" htmlFor="personal-api-key">OpenAI API key</label><input id="personal-api-key" type="password" value={personalApiKey} onChange={(e) => setPersonalApiKey(e.target.value)} placeholder="sk-…" autoComplete="off" className="mt-2 w-full max-w-xl rounded-lg border border-white/10 bg-black/30 px-3 py-3 font-mono text-sm text-white outline-none focus:border-cyan-300/60"/><p className="mt-3 text-[11px] text-amber-200/80">Only use a key you created and control. OpenAI usage and billing apply to your account.</p></section></div>}
      {activeTab === 'api' && <div className="mx-auto max-w-[1500px] px-4 pt-3 sm:px-6"><button onClick={() => setActiveTab('coach')} className="text-xs font-bold text-cyan-300 hover:text-white">← Back to TFT Coach</button></div>}
      {activeTab === 'coach' && <>
      <div className="mx-auto grid max-w-[1500px] gap-4 p-4 sm:p-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,.75fr)]">
        <section className="space-y-4"><div className="rounded-2xl border border-white/8 bg-[#0d111b] p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><Camera className="text-violet-400" size={18}/><h1 className="text-lg font-extrabold">Shop Screenshot Decision Mode</h1></div><p className="mt-1 text-xs text-slate-500">Drop your screen. Get the next move before the timer runs out.</p></div><div className="flex rounded-lg bg-black/30 p-1 text-[10px] font-extrabold uppercase tracking-wider"><button onClick={() => setMode('normal')} className={`rounded-md px-3 py-1.5 transition ${mode === 'normal' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>Normal</button><button onClick={() => setMode('fast')} className={`rounded-md px-3 py-1.5 transition ${mode === 'fast' ? 'bg-amber-400 text-slate-950' : 'text-slate-500'}`}>Fast</button></div></div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => choose(e.target.files?.[0])}/>
          <div onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => {e.preventDefault(); choose(e.dataTransfer.files?.[0]);}} className="group relative grid min-h-[360px] cursor-pointer place-items-center overflow-hidden rounded-xl border border-dashed border-violet-400/35 bg-[#070a10] transition hover:border-cyan-300/65">
            {preview ? <img src={preview} alt="Selected TFT screenshot" className="absolute inset-0 h-full w-full bg-black/40 object-contain"/> : <>
              <img src={officialGameplayImage} alt="Official Teamfight Tactics gameplay board" className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-55"/>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,16,.34),rgba(7,10,16,.82)),radial-gradient(circle_at_50%_42%,rgba(8,11,18,.08),rgba(8,11,18,.76))]"/>
              <div className="relative z-10 max-w-sm px-5 text-center"><div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/25 bg-[#090c14]/80 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,.18)] backdrop-blur-md transition group-hover:scale-105"><ImagePlus size={28}/></div><p className="text-lg font-extrabold text-white drop-shadow-lg">Drop a TFT screenshot here</p><p className="mt-1 text-xs font-medium text-slate-300">Shop, board, carousel, augments, or opponent</p><span className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#090c14]/75 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md"><Upload size={14}/> Choose screenshot</span></div>
              <a href="https://teamfighttactics.leagueoflegends.com/en-us/news/riot-games/teamfight-tactics-mobile-update/" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="absolute bottom-3 right-3 z-10 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[9px] font-semibold text-slate-300 backdrop-blur-md transition hover:text-white">Official TFT gameplay · Riot Games</a>
            </>}
            {preview && <button onClick={(e) => {e.stopPropagation(); setPreview(null); setImageData(null); setAnalyzed(false); setErrorText(''); if (inputRef.current) inputRef.current.value = '';}} className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white"><X size={15}/></button>}
          </div>
          <button onClick={analyze} disabled={!preview || analyzing} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3.5 text-sm font-extrabold shadow-[0_12px_40px_rgba(112,79,255,.22)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"><Sparkles size={17}/>{analyzing ? 'Reading board state…' : mode === 'fast' ? 'Analyze — FAST NOW' : 'Analyze next move'}<ChevronRight size={16}/></button>
        </div><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{[['42','GOLD'],['7','LEVEL'],['4-1','STAGE'],['58','HP'],['2W','STREAK']].map(([v,l],i)=><div key={l} className="rounded-xl border border-white/8 bg-[#0d111b] px-4 py-3"><p className={`text-xl font-black ${i===0?'text-amber-300':''}`}>{v}</p><p className="mt-0.5 text-[9px] font-bold tracking-[.18em] text-slate-600">{l}</p></div>)}</div></section>
        <aside className="space-y-4"><div className="overflow-hidden rounded-2xl border border-violet-400/20 bg-[#0d111b]"><div className="flex items-center justify-between border-b border-white/8 bg-violet-500/8 px-5 py-4"><div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-violet-400"/><h2 className="text-xs font-extrabold uppercase tracking-[.18em]">Do now</h2></div><span className="text-[10px] font-bold text-slate-500">BOARD: <b className="text-emerald-300">STRONG</b></span></div><div className="space-y-3 p-5">
          {!analyzed && !analyzing && <div className="py-9 text-center"><TimerReset className="mx-auto mb-3 text-slate-700" size={30}/><p className="text-sm font-bold text-slate-400">Your call appears here</p><p className="mt-1 text-xs text-slate-600">Upload a screenshot to start coaching.</p></div>}
          {analyzing && <div className="space-y-3 py-5">{[90,70,82,55].map(w=><div key={w} className="h-10 animate-pulse rounded-lg bg-white/5" style={{width:`${w}%`}}/>)}</div>}
          {errorText && <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-4 text-sm font-semibold text-rose-200"><p className="text-[10px] font-extrabold uppercase tracking-widest text-rose-300">Analysis unavailable</p><p className="mt-1">{errorText}</p></div>}
          {analyzed && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[.04] p-4"><p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">Vision model decision</p><pre className="whitespace-pre-wrap font-sans text-sm font-bold leading-7 text-slate-100">{analysisText}</pre></div>}
        </div></div>
        <div className="rounded-2xl border border-white/8 bg-[#0d111b] p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-xs font-extrabold uppercase tracking-[.18em]">Roll-down targets</h2><span className="text-[10px] text-slate-600">1 / 3 hit</span></div><div className="space-y-2">{targets.map(t=><div key={t.name} className="flex items-center gap-3 rounded-lg bg-white/[.025] p-3"><span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${t.done?'bg-emerald-400 text-slate-950':'border border-white/15 text-slate-600'}`}>{t.done?'✓':''}</span><span className={`text-xs font-bold ${t.done?'text-slate-500 line-through':'text-slate-300'}`}>{t.name}</span></div>)}</div></div>
        <div className="rounded-2xl border border-white/8 bg-[#0d111b] p-5"><h2 className="text-xs font-extrabold uppercase tracking-[.18em]">Economy path</h2><div className="mt-4 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/10 text-lg font-black text-amber-300">42g</div><ChevronRight className="text-slate-700"/><div><p className="text-sm font-extrabold">Hold 30g floor</p><p className="text-[11px] text-slate-500">Rebuild to 50g after stable</p></div></div></div></aside>
      </div>
      </>}
    </main>
  );
}

function Decision({label,value,tone,note}:{label:string;value:string;tone:'green'|'red'|'violet'|'muted';note?:string}) { const colors={green:'text-emerald-300 bg-emerald-400/10',red:'text-rose-300 bg-rose-400/10',violet:'text-violet-300 bg-violet-400/10',muted:'text-slate-400 bg-white/5'}; return <div className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-black/15 p-3"><div className="flex items-center gap-3"><span className={`w-14 rounded-md px-2 py-1 text-center text-[9px] font-black tracking-widest ${colors[tone]}`}>{label}</span><span className="text-sm font-extrabold">{value}</span></div>{note&&<span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-300">{note}</span>}</div>; }
