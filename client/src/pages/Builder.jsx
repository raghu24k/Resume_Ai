import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getResumeById, updateLocalResume, updateResume, analyzeResume } from '../features/resumes/resumeSlice';
import { Loader2, Save, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

// Components
import PersonalForm from '../components/forms/PersonalForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import ResumePreview from '../components/ResumePreview';
import AnalysisModal from '../components/AnalysisModal';

const Builder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentResume, isLoading, isError, message, isAnalyzing, analysisResult } = useSelector(
        (state) => state.resumes
    );

    const [activeSection, setActiveSection] = useState(0);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    const sections = [
        { title: "Personal Details", component: PersonalForm },
        { title: "Experience", component: ExperienceForm },
        { title: "Education", component: EducationForm },
        { title: "Skills", component: SkillsForm },
        { title: "Projects", component: ProjectsForm },
    ];

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getResumeById(id));
    }, [dispatch, id, isError, message]);

    const handleSave = () => {
        dispatch(updateResume({ id: currentResume._id, resumeData: currentResume }));
        toast.success("Resume Saved!");
    }

    const handleAnalyze = async () => {
        // Save first ensuring we analyze the latest version
        await dispatch(updateResume({ id: currentResume._id, resumeData: currentResume }));
        setIsAnalysisOpen(true);
        dispatch(analyzeResume(currentResume._id));
    };

    if (isLoading || !currentResume) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            </div>
        )
    }

    const ActiveComponent = sections[activeSection].component;

    return (
        <div className="min-h-[calc(100vh-64px)] flex text-white relative">
            <AnalysisModal
                isOpen={isAnalysisOpen}
                onClose={() => setIsAnalysisOpen(false)}
                analysis={analysisResult}
                isLoading={isAnalyzing}
            />

            {/* Left Sidebar - Navigation */}
            <div className="w-64 bg-black/20 border-r border-white/10 p-4 hidden lg:block">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Sections</h3>
                <div className="space-y-2">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSection(index)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeSection === index
                                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Middle - Form Editor */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-64px)]">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">{sections[activeSection].title}</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAnalyze}
                                className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-violet-500/20"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Analyze AI</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>

                    {/* The Form Component */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <ActiveComponent resume={currentResume} />
                    </div>
                </div>
            </div>

            {/* Right - Live Preview */}
            <div className="w-[500px] bg-gray-900 border-l border-white/10 hidden xl:block overflow-y-auto max-h-[calc(100vh-64px)]">
                <div className="p-8 transform scale-[0.6] origin-top">
                    <ResumePreview resume={currentResume} />
                </div>
            </div>
        </div>
    );
};

export default Builder;
