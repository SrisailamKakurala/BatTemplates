import React, { useEffect, useState } from "react";
import TemplateCard from "@/components/templates/TemplateCard";
import { fetchTemplatesByIds } from "@/firebase/services/templateServices/fetchTemplates.service";
import { TemplatesAnalytics } from "@/constants/schema";

const TemplateAnalytics: React.FC<TemplatesAnalytics> = ({
    totalTemplates,
    approvedTemplates,
    pendingTemplates,
    mostPopular,
    mostLikedTemplates,
}) => {
    const [templates, setTemplates] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const ids = [
                mostPopular?.id,
                ...mostLikedTemplates.map((t) => t.id),
            ].filter((id) => id); // Remove any null/undefined

            if (ids.length > 0) {
                const fetchedTemplates = await fetchTemplatesByIds(ids);
                setTemplates(fetchedTemplates);
            }
        };
        fetchData();
    }, [mostPopular, mostLikedTemplates]);

    return (
        <div className="shadow-md flex flex-col gap-4 mt-5">
            <h2 className="text-xl font-bold text-primaryHover">Template Analytics</h2>

            <div className="border-4 border-primary md:p-6 p-2 rounded-lg">
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Total Templates */}
                    <div className="p-4 border-2 rounded-lg border-primary shadow-sm">
                        <h3 className="text-lg text-white">Total Templates</h3>
                        <p className="text-3xl font-bold text-blue-600">{totalTemplates}</p>
                    </div>

                    {/* Approved Templates */}
                    <div className="p-4 border-2 rounded-lg border-primary shadow-sm">
                        <h3 className="text-lg text-white">Approved Templates</h3>
                        <p className="text-3xl font-bold text-green-600">{approvedTemplates}</p>
                    </div>

                    {/* Pending Templates */}
                    <div className="p-4 border-2 rounded-lg border-primary shadow-sm">
                        <h3 className="text-lg text-white">Pending Templates</h3>
                        <p className="text-3xl font-bold text-red-600">{pendingTemplates}</p>
                    </div>
                </div>

                {/* Display Most Popular & Liked Templates */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-primaryHover mb-3">Most Popular & Liked Templates</h3>
                    <div className="grid md:grid-cols-3 gap-2">
                        {templates.length > 0 ? (
                            templates.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    id={template.id}
                                    title={template.title}
                                    description={template.description}
                                    likesCount={template.likes?.length}
                                    techStack={template.techStack}
                                    tags={template.tags}
                                    category={template.category}
                                    githubLink={template.githubLink}
                                    authorId={template.authorId}
                                />
                            ))
                        ) : (
                            <p className="text-primary text-center">No templates found.</p>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TemplateAnalytics;
