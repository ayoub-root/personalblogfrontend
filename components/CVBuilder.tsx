import React, {useState} from "react";
import {myDefaultProfile} from "./utilis";

const CVBuilder: React.FC = () => {
    const [profile, setProfile] = useState(myDefaultProfile);

    const handleChange = (field: string, value: any) => {
        setProfile({...profile, [field]: value});
    };

    return (
        <div>
            <ProfileForm profile={profile} onChange={handleChange}/>
            <EducationForm educations={profile.educations} onChange={handleChange}/>
            <ExperienceForm
                experiences={profile.experiences}
                onChange={handleChange}
            />
            <SkillsForm skills={profile.skills} onChange={handleChange}/>
            <LanguagesForm languages={profile.languages} onChange={handleChange}/>
            <PublicationsForm
                publications={profile.publications}
                onChange={handleChange}
            />
            <MoreDetailsForm
                moreDetails={profile.moreDetails}
                onChange={handleChange}
            />
            <InterestsForm interests={profile.interests} onChange={handleChange}/>
            <button onClick={saveCV}>Save CV</button>
            <button onClick={exportPDF}>Export as PDF</button>
        </div>
    );
};

const ProfileForm: React.FC<{
    profile: any;
    onChange: (field: string, value: any) => void;
}> = ({profile, onChange}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange(e.target.name, e.target.value);
    };

    const handleArrayChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const values = e.target.value.split(",");
        onChange(field, values);
    };

    return (
        <div>
            <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="mobile"
                value={profile.mobile.join(",")}
                onChange={(e) => handleArrayChange(e, "mobile")}
            />
            <input
                type="text"
                name="emails"
                value={profile.emails.join(",")}
                onChange={(e) => handleArrayChange(e, "emails")}
            />
            <input
                type="text"
                name="addresses"
                value={profile.addresses.join(",")}
                onChange={(e) => handleArrayChange(e, "addresses")}
            />
            <textarea
                name="aboutme"
                value={profile.aboutme}
                onChange={handleChange}
            ></textarea>
            <input
                type="text"
                name="status"
                value={profile.status.title}
                onChange={(e) => onChange("status.title", e.target.value)}
            />
            <input
                type="text"
                name="cvUrl"
                value={profile.cvUrl}
                onChange={(e) => onChange("cvUrl", e.target.value)}
            />
            {/* Other profile fields */}
        </div>
    );
};

const EducationForm: React.FC<{
    educations: any[];
    onChange: (field: string, value: any) => void;
}> = ({educations, onChange}) => {
    const handleArrayChange = (index: number, field: string, value: string) => {
        const updatedEducations = [...educations];
        updatedEducations[index][field] = value.split(",");
        onChange("educations", updatedEducations);
    };

    return (
        <div>
            {educations.map((education, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={education.title}
                        onChange={(e) =>
                            onChange(`educations.${index}.title`, e.target.value)
                        }
                    />
                    <input
                        type="text"
                        value={education.schools}
                        onChange={(e) =>
                            onChange(`educations.${index}.schools`, e.target.value)
                        }
                    />
                    {/* Other education fields */}
                    <input
                        type="text"
                        value={education.descriptions.join(",")}
                        onChange={(e) =>
                            handleArrayChange(index, "descriptions", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        value={education.file}
                        onChange={(e) =>
                            onChange(`educations.${index}.file`, e.target.value)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

const ExperienceForm: React.FC<{
    experiences: any[];
    onChange: (field: string, value: any) => void;
}> = ({experiences, onChange}) => {
    const handleArrayChange = (index: number, field: string, value: string) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value.split(",");
        onChange("experiences", updatedExperiences);
    };

    return (
        <div>
            {experiences.map((experience, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={experience.title}
                        onChange={(e) =>
                            onChange(`experiences.${index}.title`, e.target.value)
                        }
                    />
                    <input
                        type="text"
                        value={experience.company}
                        onChange={(e) =>
                            onChange(`experiences.${index}.company`, e.target.value)
                        }
                    />
                    {/* Other experience fields */}
                    <input
                        type="text"
                        value={experience.descriptions.join(",")}
                        onChange={(e) =>
                            handleArrayChange(index, "descriptions", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        value={experience.projects.join(",")}
                        onChange={(e) =>
                            handleArrayChange(index, "projects", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        value={experience.techs.join(",")}
                        onChange={(e) => handleArrayChange(index, "techs", e.target.value)}
                    />
                    <input
                        type="text"
                        value={experience.file}
                        onChange={(e) =>
                            onChange(`experiences.${index}.file`, e.target.value)
                        }
                    />
                </div>
            ))}
        </div>
    );
};
// Similar form for skills
const SkillsForm: React.FC<{
    skills: any[];
    onChange: (field: string, value: any) => void;
}> = ({skills, onChange}) => {
    return (
        <div>
            {skills.map((skill, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={skill.title}
                        onChange={(e) => onChange(`skills.${index}.title`, e.target.value)}
                    />
                    <input
                        type="number"
                        value={skill.level}
                        onChange={(e) =>
                            onChange(`skills.${index}.level`, parseInt(e.target.value))
                        }
                    />
                </div>
            ))}
        </div>
    );
};

// Similar form for languages
const LanguagesForm: React.FC<{
    languages: any[];
    onChange: (field: string, value: any) => void;
}> = ({languages, onChange}) => {
    return (
        <div>
            {languages.map((language, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={language.title}
                        onChange={(e) =>
                            onChange(`languages.${index}.title`, e.target.value)
                        }
                    />
                    <input
                        type="number"
                        value={language.level}
                        onChange={(e) =>
                            onChange(`languages.${index}.level`, parseInt(e.target.value))
                        }
                    />
                </div>
            ))}
        </div>
    );
};

// Similar form for publications
const PublicationsForm: React.FC<{
    publications: any;
    onChange: (field: string, value: any) => void;
}> = ({publications, onChange}) => {
    return (
        <div>
            <input
                type="text"
                name="scholarLink"
                value={publications.scholarLink}
                onChange={(e) => onChange("publications.scholarLink", e.target.value)}
            />
            {publications.articles.map((article: any, index: number) => (
                <div key={index}>
                    <input
                        type="text"
                        value={article}
                        onChange={(e) =>
                            onChange(`publications.articles.${index}`, e.target.value)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

// Similar form for moreDetails
const MoreDetailsForm: React.FC<{
    moreDetails: any[];
    onChange: (field: string, value: any) => void;
}> = ({moreDetails, onChange}) => {
    return (
        <div>
            {moreDetails.map((detail, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={detail.title}
                        onChange={(e) =>
                            onChange(`moreDetails.${index}.title`, e.target.value)
                        }
                    />
                    <textarea
                        value={detail.description}
                        onChange={(e) =>
                            onChange(`moreDetails.${index}.description`, e.target.value)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

// Similar form for interests
const InterestsForm: React.FC<{
    interests: string[];
    onChange: (field: string, value: any) => void;
}> = ({interests, onChange}) => {
    return (
        <div>
            {interests.map((interest, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={interest}
                        onChange={(e) => onChange(`interests.${index}`, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

// Similar forms for skills, languages, publications, moreDetails, and interests

const saveCV = () => {
    // Implement logic to save the CV data
};

const exportPDF = () => {
    // Implement logic to export the CV as PDF
};

export default CVBuilder;
