import React from 'react';
import { ResumeData } from '../types';

interface PreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: PreviewProps) {
  const { heading, objective, skills, experience, projects, education, activities, languages } = data;

  const validLinks = heading.links.filter(l => l.label && l.url);
  const validExperiences = experience.filter(e => e.company || e.designation);
  const validProjects = projects.filter(p => p.name || p.overview);
  const splitTextToPoints = (text: string) => text.split('\n').filter(p => p.trim().length > 0);
  const hasEducation = education.institution || education.degree;

  return (
    <div id="resume-preview-container" className="w-full bg-[#ffffff] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] print:shadow-none print:w-full print:max-w-none mx-auto print:mx-0 font-sans text-[#000000] max-w-[794px] min-h-[1122px] flex flex-col p-10 md:p-14 leading-tight">
      
      {/* Heading section */}
      <header className="mb-4 border-b pb-4 border-[rgba(0,0,0,0.1)] text-center">
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{heading.fullName || "YOUR NAME"}</h1>
        <p className="text-sm font-medium text-[#374151] mt-1">{heading.designation || "YOUR DESIGNATION"}</p>
        
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-[#4b5563]">
           {heading.phone && <span>{heading.phone}</span>}
           {(heading.phone && heading.email) && <span>•</span>}
           {heading.email && <span>{heading.email}</span>}
           {(heading.address && (heading.phone || heading.email)) && <span>•</span>}
           {heading.address && <span>{heading.address}</span>}
        </div>

        {validLinks.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
            {validLinks.map((link, idx) => (
              <React.Fragment key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-[#00008B] underline font-medium hover:text-blue-600 transition-colors">
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      <div className="flex-1 space-y-6 overflow-hidden">
        {/* Career Objective */}
        {objective && (
          <section>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Career Objective</h2>
            <p className="text-xs md:text-[13px] text-justify leading-relaxed">{objective}</p>
          </section>
        )}

        {/* Skills */}
        {(skills.technical || skills.interpersonal) && (
          <section>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {skills.technical && (
                <div>
                  <p className="text-xs md:text-[13px]"><span className="font-bold">Technical:</span> {skills.technical}</p>
                </div>
              )}
              {skills.interpersonal && (
                <div>
                  <p className="text-xs md:text-[13px]"><span className="font-bold">Interpersonal:</span> {skills.interpersonal}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {validExperiences.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Professional Experience</h2>
            <div className="space-y-4">
              {validExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xs md:text-sm font-bold">{exp.designation}{exp.designation && exp.company && ' - '}{exp.company}</h3>
                    <span className="text-xs italic font-medium whitespace-nowrap ml-4">{exp.duration}</span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc leading-relaxed pl-5 space-y-0.5 marker:text-[#4b5563] text-xs md:text-[13px]">
                      {splitTextToPoints(exp.responsibilities).map((point, i) => (
                        <li key={i} className="pl-1 relative">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
           <section>
             <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Projects</h2>
             <div className="space-y-4">
               {validProjects.map(proj => (
                 <div key={proj.id} className="relative">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-xs md:text-sm font-bold">{proj.name}</h3>
                      <div className="flex gap-2 text-xs">
                        {proj.liveLink && (
                          <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-[#00008B] underline italic hover:text-blue-600">Live Link</a>
                        )}
                        {proj.githubClient && (
                          <a href={proj.githubClient} target="_blank" rel="noreferrer" className="text-[#00008B] underline italic hover:text-blue-600">Client</a>
                        )}
                        {proj.githubServer && (
                          <a href={proj.githubServer} target="_blank" rel="noreferrer" className="text-[#00008B] underline italic hover:text-blue-600">Server</a>
                        )}
                      </div>
                    </div>
                    {proj.overview && <p className="text-xs text-[#374151] italic mb-1">{proj.overview}</p>}
                    
                    {proj.features && (
                      <ul className="list-disc leading-relaxed pl-5 space-y-0.5 mt-1 marker:text-[#4b5563] text-xs md:text-[13px]">
                        {splitTextToPoints(proj.features).map((point, i) => (
                          <li key={i} className="pl-1">{point}</li>
                        ))}
                      </ul>
                    )}
                 </div>
               ))}
             </div>
           </section>
        )}

        {/* Education */}
        {hasEducation && (
          <section>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Education</h2>
            <div className="flex justify-between">
              <p className="text-xs md:text-[13px]"><span className="font-bold">{education.degree}</span>{education.institution ? `, ${education.institution}` : ''}{education.cgpa ? ` (CGPA: ${education.cgpa})` : ''}</p>
              <p className="text-xs italic">{education.duration}</p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Languages */}
          {languages.filter(l => l.language).length > 0 && (
            <section>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Language</h2>
              <p className="text-xs md:text-[13px]">
                {languages.filter(l => l.language).map((l, i, arr) => (
                  <span key={l.id}>
                    {l.language} {l.proficiency ? `(${l.proficiency})` : ''}
                    {i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </section>
          )}

          {/* Extra-curricular activities */}
          {activities && (
            <section>
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-[#000000] mb-3 pb-1.5">Activities</h2>
              <ul className="list-disc leading-relaxed pl-5 space-y-0.5 marker:text-[#4b5563] text-xs md:text-[13px]">
                  {splitTextToPoints(activities).map((point, i) => (
                    <li key={i} className="pl-1">{point}</li>
                  ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
