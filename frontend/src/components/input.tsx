import { ChangeEventHandler } from "react";

interface inputType {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}
export default function Input({ label, placeholder, onChange }: inputType) {

    return (
        <div className="mt-6">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <input onChange={onChange} placeholder={placeholder} type="text" id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    )
}



