import { ChangeEventHandler } from "react";

interface inputType {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    value:string
}
export default function Textarea({ label, placeholder, onChange,value }: inputType) {

    return (
        <div className="mt-6">
    <label htmlFor={label} className="block mb-2 text-sm font-medium text-[#ECECEC]">{label}</label>
    <textarea 
        onChange={onChange} 
        value={value} 
        placeholder={placeholder} 
        id={label} 
        className="bg-[#212121] border border-gray-600 text-[#ECECEC] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-x min-h-[200px] overflow-auto"
    />
</div>
    )
}




