import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const _searchTerm = searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.description
                .toLowerCase()
                .includes(_searchTerm);

        const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];


    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Menggunakan Grid agar layout lebih rapi di layar lebar */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    name="searchTerm"
                    placeholder="Search framework..."
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <select
                    onChange={(e) => setSelectedTag(e.target.value)}
                    name="selectedTag"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                            {tag}
                        </option>
                    ))}

                </select>


                {filteredFrameworks.map((item, index) => (
                    <div
                        key={item.id}
                        className="group flex flex-col justify-between border border-gray-100 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:-translate-y-5 transition-all duration-300"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </h2>
                                <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                                    {item.details.releaseYear}
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-4">
                                {item.description}
                            </p>

                            <p className="text-sm text-gray-500 mb-6">
                                Developed by <span className="font-semibold text-gray-800">{item.details.developer}</span>
                            </p>
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                className="inline-block w-full text-center py-3 px-4 rounded-xl bg-gray-900 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
                                href={item.details.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Official Website
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}