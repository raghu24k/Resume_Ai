import { useDispatch } from 'react-redux';
import { updateLocalResume } from '../../features/resumes/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ resume }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        const newProject = {
            name: '',
            description: '',
            link: '',
            technologies: '',
        };

        dispatch(updateLocalResume({
            projects: [...(resume.projects || []), newProject]
        }));
    };

    const handleRemove = (index) => {
        const newProjects = [...(resume.projects || [])];
        newProjects.splice(index, 1);
        dispatch(updateLocalResume({ projects: newProjects }));
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newProjects = [...(resume.projects || [])];
        newProjects[index] = { ...newProjects[index], [name]: value };
        dispatch(updateLocalResume({ projects: newProjects }));
    };

    return (
        <div className="space-y-6">
            {(resume.projects || []).map((project, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-300 uppercase">Project {index + 1}</h4>
                        <button
                            onClick={() => handleRemove(index)}
                            className="text-red-400 hover:text-red-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={project.name}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Project Name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            name="link"
                            value={project.link}
                            onChange={(e) => handleChange(e, index)}
                            placeholder="Link (Github/Live)"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    <input
                        type="text"
                        name="technologies"
                        value={project.technologies}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Technologies (e.g. React, Node, MongoDB)"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500"
                    />

                    <textarea
                        name="description"
                        rows="3"
                        value={project.description}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Description of the project..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                    ></textarea>
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
            >
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
            </button>
        </div>
    );
};

export default ProjectsForm;