import { useDispatch } from 'react-redux';
import { updateLocalResume } from '../../features/resumes/resumeSlice';

const PersonalForm = ({ resume }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Logic: Personal Info is nested, so we need to spread correctly
        dispatch(updateLocalResume({
            personalInfo: {
                ...resume.personalInfo,
                [name]: value
            }
        }));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={resume.personalInfo?.firstName || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={resume.personalInfo?.lastName || ''}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={resume.personalInfo?.email || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Professional Summary</label>
                <textarea
                    name="summary"
                    rows="4"
                    value={resume.personalInfo?.summary || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Briefly describe your professional background..."
                ></textarea>
            </div>
            {/* Add Phone, Address, Links etc */}
        </div>
    );
};

export default PersonalForm;
