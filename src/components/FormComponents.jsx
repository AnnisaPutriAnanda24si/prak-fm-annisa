    import React from 'react';

export function InputField({ label, type = "text", placeholder, value, onChange, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2 outline-none focus:border-hijau transition-all text-sm" 
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export function SelectField({ label, options = [], value, onChange, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select 
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2 outline-none focus:border-hijau bg-white transition-all text-sm"
        {...props}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export function TextAreaField({ label, placeholder, value, onChange, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea 
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2 outline-none focus:border-hijau transition-all text-sm rows=3" 
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}