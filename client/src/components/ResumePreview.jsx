import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ResumePreview = ({ resume }) => {
    if (!resume) return null;

    const { personalInfo } = resume;

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] shadow-2xl origin-top">
            {/* Header */}
            <div className="mb-8 border-b-2 border-gray-800 pb-4">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{personalInfo?.summary}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-3 h-3" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Education */}
                {resume.education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">Education</h2>
                        <div className="space-y-4">
                            {resume.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between font-bold">
                                        <h3>{edu.school}</h3>
                                        <span>{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <p className="italic">{edu.degree} in {edu.fieldOfStudy}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {resume.experience?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">Experience</h2>
                        <div className="space-y-4">
                            {resume.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between font-bold">
                                        <h3>{exp.company}</h3>
                                        <span>{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="italic mb-1">{exp.position}</p>
                                    <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resume.projects?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">Projects</h2>
                        <div className="space-y-4">
                            {resume.projects.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between font-bold">
                                        <h3>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" className="text-blue-600 text-sm hover:underline">View Project</a>}
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mb-1">{proj.technologies}</p>
                                    <p className="text-sm">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume.skills?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">
                                    {skill.name} <span className="text-xs text-gray-500 ml-1">({skill.level})</span>
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </div>
    );
};

export default ResumePreview;