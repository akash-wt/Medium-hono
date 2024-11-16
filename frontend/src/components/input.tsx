import { ChangeEventHandler } from "react";

interface inputType {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    value:string
}
export default function Input({ label, placeholder, onChange,value }: inputType) {

    return (
        <div className="mt-6">
    <label htmlFor={label} className="block mb-2 text-sm font-medium text-[#ECECEC]">{label}</label>
    <input 
        onChange={onChange} 
        value={value} 
        placeholder={placeholder} 
        type="text" 
        id={label} 
        className="bg-[#212121] border border-gray-600 text-[#ECECEC] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
</div>
    )
}




