import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/outline";
import HowItWorks from "./howItWorks";
import {useState} from "react";
import Steps from "./steps";
import {AnimatePresence} from "framer-motion";
import Compress from "./compress";
import CompressButton from "../compressButton";
import axios from "axios";
import {CompressStatus} from "../../types";

interface Props {
    setShowImgUpload: (bool: boolean) => void,
    setShowImgDownload: (bool: boolean) => void,
    file: any,
    compressStep: number,
    removeFile: () => void,
    ogFileSize: number | null
}

export default function UploadCard(props: Props){
    const [step, setStep] = useState<number>(0);
    const [showCompressBtn, setShowCompressBtn] = useState<boolean>(false);
    const [compressStatus, setCompressStatus] = useState<CompressStatus>(CompressStatus.UNREADY);
    const [outputSize, setOutputSize] = useState<number | null>(null);
    const [k, setK] = useState<number>(2);

    function uploadImage(){
        if (props.file !== null) {
            const formData = new FormData()
            formData.append('file', props.file, props.file.name)

            axios.post(`http://0.0.0.0:8000/uploadImage/${k}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        // note: size is in bytes
                        const {filename, height, width, size} = res.data;
                        setOutputSize(size);
                        setCompressStatus(CompressStatus.COMPLETE);
                        props.setShowImgDownload(true);
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col justify-between">
            {/* Steps */}
            <Steps step={step} />

            <AnimatePresence exitBeforeEnter>
                {step === 0 && <HowItWorks />}
                {step === 1 && <Compress
                    setK={(k: number) => setK(() => k)}
                    ogFileSize={props.ogFileSize}
                    outputSize={outputSize}
                    compressStatus={compressStatus}
                    compressStep={props.compressStep}
                    file={props.file}
                    setShowCompressBtn={(bool) => setShowCompressBtn(bool)}/>}

            </AnimatePresence>


            <div className={`${step === 0 ? "justify-end": "justify-between"} py-4 px-6 border-t flex flex-row items-center`}>
                {step > 0 && <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-100 text-gray-500"
                    onClick={() => {
                        setStep((prevState) => prevState - 1);
                        setCompressStatus(CompressStatus.UNREADY);
                        props.setShowImgUpload(false);
                        props.setShowImgDownload(false);
                        props.removeFile();
                    }}
                >
                    <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    {compressStatus === CompressStatus.COMPLETE ? "Restart" : "Back"}
                </button>}
                {step < 1 && <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600"
                    onClick={() => {
                        setStep((prevState) => prevState + 1);
                        props.setShowImgUpload(true);
                    }}
                >
                    Next
                    <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>}

                {step === 1 && showCompressBtn && (compressStatus !== CompressStatus.COMPLETE && compressStatus !== CompressStatus.PROCESSING) && <CompressButton
                    compressStep={props.compressStep}
                    setCompressStatus={(status: CompressStatus) => setCompressStatus(status)}
                    setShowImgUpload={(bool: boolean) => props.setShowImgUpload(bool)}
                    uploadImage={() => uploadImage()}
                />}
            </div>
        </div>
    )
}