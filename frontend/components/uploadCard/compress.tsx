import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {fade, stagger} from "../../animations";
import {CompressStatus} from "../../types";
import {BadgeCheckIcon} from "@heroicons/react/outline";

interface Props {
    setShowCompressBtn: (bool: boolean) => void,
    compressStep: number,
    file: any,
    compressStatus: CompressStatus,
    outputSize: number | null,
    ogFileSize: number | null,
    setK: (k: number) => void
}

export default function Compress(props: Props){
    const [k, setK] = useState<number>(8);

    useEffect(() => {
        if (props.compressStatus === CompressStatus.UNREADY){
            // Set initial value of slider
            document.getElementById("default-range").value = k
            props.setShowCompressBtn(true);
        }
    }, [])

    return (
        <AnimatePresence>
            {props.compressStatus === CompressStatus.UNREADY && <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
                variants={stagger}
            >
                <motion.div
                    key={1}
                    variants={fade}
                    className="flex flex-col gap-1 h-1/2 p-6 border-b">
                    <p className="text-sm font-bold uppercase text-gray-500">Step 1</p>
                    <p className="text-md text-black">Upload an image</p>
                    {props.file && <p className="text-md text-blue-600">{props.file.name}</p>}
                </motion.div>

                <div
                    className={`${props.compressStep === 1 ? "opacity-100" : "opacity-60 cursor-default disabled"} h-1/2`}>
                    <motion.div
                        key={2}
                        className="flex flex-col gap-1 h-full p-6"
                        variants={fade}
                    >
                        <p className="text-sm font-bold uppercase text-gray-500">Step 2</p>
                        <p className="text-md text-black">Choose number of colours in output image</p>

                        <div className="flex flex-row gap-3 items-center">
                            {/* todo: make this look better, fill left side with blue */}
                            <input
                                id="default-range"
                                type="range"
                                disabled={props.compressStep !== 1}
                                className={`${props.compressStep === 1 ? "cursor-pointer" : "cursor-default"} w-3/4 h-2 bg-gray-200 appearance-none rounded-lg bg-blue-600 my-2`}
                                min={1}
                                max={128}
                                onChange={(e) => {
                                    setK(Number(e.target.value));
                                    props.setK(Number(e.target.value));
                                }}

                            />
                            <p className="text-sm font-bold text-blue-600">{k}</p>
                        </div>

                        <p className="text-xs text-gray-500">(higher = more detail)</p>
                    </motion.div>
                </div>
            </motion.div>}

            {props.compressStatus === CompressStatus.PROCESSING && <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fade}
                className="flex flex-col h-full w-full justify-center items-center"
            >
                <div className="flex flex-row items-center gap-1">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>

                    <p className="text-md text-blue-600 font-semibold">Compressing</p>
                </div>
            </motion.div>}

            {props.compressStatus === CompressStatus.COMPLETE && <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fade}
                className="flex flex-col gap-2 h-full w-full justify-center items-center"
            >
                <div className="flex flex-row items-center gap-1 my-6">
                    <BadgeCheckIcon className="text-blue-600 h-7 w-7" />
                    <p className="text-md text-blue-600">Complete</p>
                </div>

                {props.ogFileSize && <p className="text-md text-black">Original filesize: <span className="font-bold">{props.ogFileSize / 1000}</span> <span className="text-xs uppercase text-gray-500">kb</span></p>}
                {props.outputSize && <p className="text-md text-black">Compressed filesize: <span className="font-bold text-blue-600 underline underline-offset-4">{props.outputSize / 1000}</span> <span className="text-xs text-gray-500 uppercase">kb</span></p>}

            </motion.div>}
        </AnimatePresence>
    )
}