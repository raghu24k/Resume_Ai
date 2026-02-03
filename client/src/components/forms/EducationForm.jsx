import { useDispatch } from 'react-redux';
import { updateLocalResume } from '../../features/resumes/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ resume }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        const newEducation = {
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
        };

        dispatch(updateLocalResume({
            education: [...(resume.education || []), newEducation]
        }));
    };

    const handleRemove = (index) => {
        const newEducation = [...(resume.education || [])];
        newEducation.splice(index, 1);
        dispatch(updateLocalResume({ education: newEducation }));
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newEducation = [...(resume.education || [])];
        newEducation[index] = { ...newEducation[index], [name]: value };
        dispatch(updateLocalResume({ education: newEducation }));
    };

    return (
        <div className="space-y-6">
            {(resume.education || []).map((edu, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-300 uppercase">Education {index + 1}</h4>
                        <button
                            onClick={() => handleRemove(index)}
                            className="text-red-400 hover:text-red-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            name="school"
                            value={edu.school}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="School / University"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Degree"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={edu.fieldOfStudy}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Field of Study"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="startDate"
                            value={edu.startDate}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Start Year"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            name="endDate"
                            value={edu.endDate}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="End Year"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Education</span>
            </button>
        </div>
    );
};

export default EducationForm;