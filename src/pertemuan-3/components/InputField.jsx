export default function( {label, type, placeholder} ){
    return (
        <div className="mb-3">
            <label className="block text-green-700 font-medium mb-1">
                {label}
            </label>
            <input 
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border-gray-300 rounded" />
        </div>
    )
}