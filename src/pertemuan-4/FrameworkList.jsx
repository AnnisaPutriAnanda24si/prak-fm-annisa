import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Menggunakan Grid agar layout lebih rapi di layar lebar */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        className="group flex flex-col justify-between border border-gray-100 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:-translate-y-56 transition-all duration-300"
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