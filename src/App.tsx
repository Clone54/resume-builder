import { useState } from 'react';
import { initialResumeState, ResumeData } from './types';
import { TopBar } from './components/TopBar';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);

  return (
    <div className="h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-sans overflow-hidden print:h-auto print:overflow-visible">
      <TopBar fullName={resumeData.heading.fullName} />
      
      <main className="flex-1 flex flex-col lg:flex-row print:block bg-[#1a1a1a] relative overflow-hidden print:overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08)_0%,transparent_70%)] pointer-events-none print:hidden"></div>
        
        {/* Form Section */}
        <aside className="relative z-10 w-full lg:w-[45%] xl:w-[40%] bg-[#0d0d0d] border-r border-white/10 overflow-y-auto h-full print:hidden shadow-2xl">
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </aside>
        
        {/* Preview Section */}
        <section className="relative z-0 w-full lg:w-[55%] xl:w-[60%] flex-1 h-full overflow-y-auto p-4 md:p-12 print:p-0 print:m-0 print:h-auto print:overflow-visible flex justify-center items-start pt-[5vh]">
          <ResumePreview data={resumeData} />
        </section>
      </main>
    </div>
  );
}
