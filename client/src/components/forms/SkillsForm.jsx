import { useDispatch } from 'react-redux';
import { updateLocalResume } from '../../features/resumes/resumeSlice';
import { Plus, Trash2, X } from 'lucide-react';

const SkillsForm = ({ resume }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        const newSkill = {
            name: '',
            level: 'Intermediate',
        };

        dispatch(updateLocalResume({
            skills: [...(resume.skills || []), newSkill]
        }));
    };

    const handleRemove = (index) => {
        const newSkills = [...(resume.skills || [])];
        newSkills.splice(index, 1);
        dispatch(updateLocalResume({ skills: newSkills }));
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newSkills = [...(resume.skills || [])];
        newSkills[index] = { ...newSkills[index], [name]: value };
        dispatch(updateLocalResume({ skills: newSkills }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                {(resume.skills || []).map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            name="name"
                            value={skill.name}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Skill (e.g. React.js)"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                        <select
                            name="level"
                            value={skill.level}
                            onChange={(e) => handleChange(e, index)}
                            className="bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <button
                            onClick={() => handleRemove(index)}
                            className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Skill</span>
            </button>
        </div>
    );
};

export default SkillsForm;