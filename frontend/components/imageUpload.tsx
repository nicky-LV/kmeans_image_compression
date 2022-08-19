import axios from "axios";
import {CloudUploadIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";

interface Props {
    selectFile: (file: any) => void
}

export default function ImageUpload(props: Props){

    return (
        <div
            className="flex justify-center items-center w-full">
            <label htmlFor="dropzone-file"
                   className="flex flex-col justify-center items-center w-full h-64 bg-white rounded-lg border border-gray-300 border-dashed cursor-pointer ">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <CloudUploadIcon className="text-blue-600 h-8 w-8 my-2" />
                    <p className="mb-2 text-sm text-gray-500"><span
                        className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPEG</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => props.selectFile(e.target.files[0])} />
            </label>
        </div>
    )
}