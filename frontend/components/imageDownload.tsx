import {DownloadIcon} from "@heroicons/react/outline";
import Image from "next/image";
import {useEffect, useState} from "react";

interface Props {
    file: any
}

export default function ImageDownload(props: Props){
    const [imageH, setImageH] = useState<number>(0);
    const [imageW, setImageW] = useState<number>(0);
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        const imageContainer = document.getElementById("image-container")
        // @ts-ignore
        setImageH(imageContainer.clientHeight)
        // @ts-ignore
        setImageW(imageContainer.clientWidth)
    }, [])

    return (
        <div className="bg-white h-full rounded-lg shadow-md flex flex-col justify-between">
            <div className="py-4 px-6 h-16 border-b flex flex-row items-center justify-center">
                <p className="text-md font-bold text-center">Download</p>
            </div>

            <div className="flex flex-row justify-center items-center h-2/3 w-full">
                <div id="image-container" className="p-12 w-full h-full">
                    {imageH > 0 && imageW > 0 && <Image
                        id="output-image"
                        src={`/output_images/${props.file.name}`}
                        height={imageH}
                        width={imageW}
                    />}
                </div>
            </div>

            <div className="py-4 px-6 w-full">
                <a href={`/output_images/${props.file.name}`} download>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full"
                    >
                        <DownloadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Download
                    </button>
                </a>
            </div>
        </div>
    )
}