import { useDispatch } from 'react-redux';
import { updateLocalResume } from '../../features/resumes/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ resume }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        const newExperience = {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
        };

        dispatch(updateLocalResume({
            experience: [...(resume.experience || []), newExperience]
        }));
    };

    const handleRemove = (index) => {
        const newExperience = [...(resume.experience || [])];
        newExperience.splice(index, 1);
        dispatch(updateLocalResume({ experience: newExperience }));
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newExperience = [...(resume.experience || [])];
        newExperience[index] = { ...newExperience[index], [name]: value };
        dispatch(updateLocalResume({ experience: newExperience }));
    };

    return (
        <div className="space-y-6">
            {(resume.experience || []).map((exp, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-300 uppercase">Experience {index + 1}</h4>
                        <button
                            onClick={() => handleRemove(index)}
                            className="text-red-400 hover:text-red-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Company Name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="position"
                                value={exp.position}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Job Title"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Start Date"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="endDate"
                                value={exp.endDate}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="End Date"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                            />
                        </div>
                    </div>

                    <textarea
                        name="description"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Description of your role and achievements..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                    ></textarea>
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Experience</span>
            </button>
        </div>
    );
};

export default ExperienceForm;