import React from 'react';
import { ResumeData, LinkType, ExperienceType, ProjectType, LanguageType } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface FormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeForm({ data, onChange }: FormProps) {
  const updateHeading = (field: keyof ResumeData['heading'], value: string) => {
    onChange({ ...data, heading: { ...data.heading, [field]: value } });
  };

  const updateHeadingLinks = (links: LinkType[]) => {
    onChange({ ...data, heading: { ...data.heading, links } });
  };

  const updateSkills = (field: keyof ResumeData['skills'], value: string) => {
    onChange({ ...data, skills: { ...data.skills, [field]: value } });
  };

  const updateEducation = (field: keyof ResumeData['education'], value: string) => {
    onChange({ ...data, education: { ...data.education, [field]: value } });
  };

  const addLink = () => {
    updateHeadingLinks([...data.heading.links, { id: crypto.randomUUID(), label: '', url: '' }]);
  };

  const removeLink = (id: string) => {
    updateHeadingLinks(data.heading.links.filter(l => l.id !== id));
  };

  const updateLink = (id: string, field: keyof LinkType, value: string) => {
    updateHeadingLinks(data.heading.links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { id: crypto.randomUUID(), company: '', designation: '', duration: '', responsibilities: '' }]
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof ExperienceType, value: string) => {
    onChange({ ...data, experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [...data.projects, { id: crypto.randomUUID(), name: '', overview: '', liveLink: '', githubClient: '', githubServer: '', features: '' }]
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const updateProject = (id: string, field: keyof ProjectType, value: string) => {
    onChange({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const addLanguage = () => {
    onChange({ ...data, languages: [...data.languages, { id: crypto.randomUUID(), language: '', proficiency: '' }] });
  };

  const removeLanguage = (id: string) => {
    onChange({ ...data, languages: data.languages.filter(l => l.id !== id) });
  };

  const updateLanguage = (id: string, field: keyof LanguageType, value: string) => {
    onChange({ ...data, languages: data.languages.map(l => l.id === id ? { ...l, [field]: value } : l) });
  };

  const sectionHeaderClass = "text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 border-b border-white/5 pb-2";
  const labelClass = "text-[11px] text-gray-400 mb-1 block group-focus-within:text-indigo-400 transition-colors";
  const inputClass = "w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-[#e0e0e0] focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-gray-600";
  const btnAddClass = "text-[10px] uppercase tracking-[0.1em] font-bold flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded transition-colors";
  const itemContainerClass = "p-4 border border-white/10 rounded-lg bg-white/5 relative group space-y-3";

  return (
    <div className="w-full mx-auto p-6 space-y-10 print:hidden pb-32">
      
      {/* 1. Heading Part */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>1. Personal Information</h2>
        
        <div className="space-y-3">
          <div className="group">
            <label className={labelClass}>Full Name</label>
            <input type="text" value={data.heading.fullName} onChange={e => updateHeading('fullName', e.target.value)} className={inputClass} placeholder="John Doe" />
          </div>
          
          <div className="group">
            <label className={labelClass}>Designation</label>
            <input type="text" value={data.heading.designation} onChange={e => updateHeading('designation', e.target.value)} className={inputClass} placeholder="Junior React js developer" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className={labelClass}>Contact Number</label>
              <input type="text" value={data.heading.phone} onChange={e => updateHeading('phone', e.target.value)} className={inputClass} placeholder="+1 234 567 890" />
            </div>
            <div className="group">
              <label className={labelClass}>Email Address</label>
              <input type="email" value={data.heading.email} onChange={e => updateHeading('email', e.target.value)} className={inputClass} placeholder="john@example.com" />
            </div>
          </div>

          <div className="group">
            <label className={labelClass}>Present Address</label>
            <input type="text" value={data.heading.address} onChange={e => updateHeading('address', e.target.value)} className={inputClass} placeholder="123 Main St, City, Country" />
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className={labelClass}>Professional Profile Links</label>
              <button onClick={addLink} className={btnAddClass}>
                <Plus size={14} /> Add Link
              </button>
            </div>
            <div className="space-y-2">
              {data.heading.links.map(link => (
                <div key={link.id} className="flex gap-2 items-start group">
                  <input type="text" value={link.label} onChange={e => updateLink(link.id, 'label', e.target.value)} placeholder="Label (e.g. GitHub)" className={inputClass + ' w-1/3'} />
                  <input type="url" value={link.url} onChange={e => updateLink(link.id, 'url', e.target.value)} placeholder="URL (e.g. https://...)" className={inputClass} />
                  <button onClick={() => removeLink(link.id)} className="p-2 text-gray-500 hover:text-red-400 rounded-md hover:bg-white/5 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Career Objective */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>2. Career Objective</h2>
        <div className="group">
          <label className={labelClass}>Brief summary (2-3 sentences)</label>
          <textarea value={data.objective} onChange={e => onChange({ ...data, objective: e.target.value })} rows={3} className={inputClass + ' resize-none'} placeholder="Highlight your career goals and ambitions..."></textarea>
        </div>
      </section>

      {/* 3. Skills */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>3. Skills</h2>
        <div className="space-y-3">
          <div className="group">
            <label className={labelClass}>Technical Skills (Technologies/tools/libraries/languages)</label>
            <textarea value={data.skills.technical} onChange={e => updateSkills('technical', e.target.value)} rows={2} className={inputClass + ' resize-none'} placeholder="React Js, Tailwind, Node.js... (Comma separated)"></textarea>
          </div>
          <div className="group">
            <label className={labelClass}>Interpersonal Skills</label>
            <input type="text" value={data.skills.interpersonal} onChange={e => updateSkills('interpersonal', e.target.value)} className={inputClass} placeholder="Communication, Teamwork... (Comma separated)" />
          </div>
        </div>
      </section>

      {/* 4. Professional Experiences */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">4. Professional Experiences</h2>
          <button onClick={addExperience} className={btnAddClass}>
            <Plus size={14} /> Add Experience
          </button>
        </div>
        
        {data.experience.length === 0 && <p className="text-[11px] text-gray-500 italic">No experience added. It will be hidden if empty.</p>}
        
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className={itemContainerClass}>
              <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={16} /></button>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                     <label className={labelClass}>Company</label>
                     <input type="text" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" className={inputClass} />
                  </div>
                  <div className="group">
                     <label className={labelClass}>Duration</label>
                     <input type="text" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Jan 2023 - Present" className={inputClass} />
                  </div>
                </div>
                <div className="group">
                  <label className={labelClass}>Designation</label>
                  <input type="text" value={exp.designation} onChange={e => updateExperience(exp.id, 'designation', e.target.value)} placeholder="Software Engineer" className={inputClass} />
                </div>
                <div className="group">
                   <label className={labelClass}>Roles and Responsibilities (One per line)</label>
                   <textarea value={exp.responsibilities} onChange={e => updateExperience(exp.id, 'responsibilities', e.target.value)} rows={3} placeholder="Developed X...\nLed team Y..." className={inputClass + ' resize-none'}></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Projects */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">5. Projects (Min 2 recommended)</h2>
          <button onClick={addProject} className={btnAddClass}>
            <Plus size={14} /> Add Project
          </button>
        </div>

        <div className="space-y-6">
          {data.projects.map((proj, index) => (
            <div key={proj.id} className={itemContainerClass}>
              <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={16} /></button>
              
              <div className="space-y-3">
                <div className="group">
                   <label className={labelClass}>Project Name</label>
                   <input type="text" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} placeholder="Awesome Project" className={inputClass} />
                </div>
                <div className="group">
                   <label className={labelClass}>Project Overview (1-2 lines)</label>
                   <input type="text" value={proj.overview} onChange={e => updateProject(proj.id, 'overview', e.target.value)} placeholder="A platform for doing amazing things." className={inputClass} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="group">
                     <label className={labelClass}>Live Link</label>
                     <input type="url" value={proj.liveLink} onChange={e => updateProject(proj.id, 'liveLink', e.target.value)} placeholder="https://..." className={inputClass} />
                  </div>
                  <div className="group">
                     <label className={labelClass}>GitHub (Client)</label>
                     <input type="url" value={proj.githubClient} onChange={e => updateProject(proj.id, 'githubClient', e.target.value)} placeholder="https://..." className={inputClass} />
                  </div>
                  <div className="group">
                     <label className={labelClass}>GitHub (Server)</label>
                     <input type="url" value={proj.githubServer} onChange={e => updateProject(proj.id, 'githubServer', e.target.value)} placeholder="https://..." className={inputClass} />
                  </div>
                </div>

                <div className="group">
                   <label className={labelClass}>Major Features (3-4 points, One per line)</label>
                   <textarea value={proj.features} onChange={e => updateProject(proj.id, 'features', e.target.value)} rows={4} placeholder="Feature 1...\nFeature 2..." className={inputClass + ' resize-none'}></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Education */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>6. Education (Last one)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 group">
            <label className={labelClass}>Institution</label>
            <input type="text" value={data.education.institution} onChange={e => updateEducation('institution', e.target.value)} className={inputClass} placeholder="University Name" />
          </div>
          <div className="col-span-2 md:col-span-1 group">
            <label className={labelClass}>Degree Name</label>
            <input type="text" value={data.education.degree} onChange={e => updateEducation('degree', e.target.value)} className={inputClass} placeholder="B.Sc in Computer Science" />
          </div>
          <div className="group">
            <label className={labelClass}>Duration</label>
            <input type="text" value={data.education.duration} onChange={e => updateEducation('duration', e.target.value)} className={inputClass} placeholder="2018 - 2022" />
          </div>
          <div className="group">
            <label className={labelClass}>CGPA / GPA (Optional)</label>
            <input type="text" value={data.education.cgpa} onChange={e => updateEducation('cgpa', e.target.value)} className={inputClass} placeholder="X.XX / Y.YY" />
          </div>
        </div>
      </section>

      {/* 7. Extra-curricular activities */}
      <section className="space-y-4">
        <h2 className={sectionHeaderClass}>7. Extra-curricular activities (Optional)</h2>
        <div className="group">
          <label className={labelClass}>Mention activities and accomplishments (One per line)</label>
          <textarea value={data.activities} onChange={e => onChange({ ...data, activities: e.target.value })} rows={3} className={inputClass + ' resize-none'} placeholder="Winner of Hackathon XYZ...\nDebate champion..."></textarea>
        </div>
      </section>

      {/* 8. Language */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">8. Language</h2>
          <button onClick={addLanguage} className={btnAddClass}>
            <Plus size={14} /> Add Language
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.languages.map(lang => (
             <div key={lang.id} className={itemContainerClass + " flex gap-2 items-start !p-2 pr-8"}>
               <input type="text" value={lang.language} onChange={e => updateLanguage(lang.id, 'language', e.target.value)} placeholder="e.g. English" className={inputClass + ' w-1/2 !text-xs !py-1.5'} />
               <input type="text" value={lang.proficiency} onChange={e => updateLanguage(lang.id, 'proficiency', e.target.value)} placeholder="e.g. Fluent" className={inputClass + ' w-1/2 !text-xs !py-1.5'} />
               <button onClick={() => removeLanguage(lang.id)} className="absolute right-1 top-2.5 p-1 text-gray-500 hover:text-red-400 rounded transition-colors"><Trash2 size={14} /></button>
             </div>
          ))}
        </div>
      </section>

    </div>
  );
}
