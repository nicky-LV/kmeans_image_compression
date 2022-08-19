import UploadCard from "./uploadCard/uploadCard";
import {useState} from "react";
import ImageUpload from "./imageUpload";
import {motion, AnimatePresence} from "framer-motion";
import {fade, delayedFade} from "../animations";
import axios from "axios";
import ImageDownload from "./imageDownload";

export default function IndexMidSection(){
    const [showImgUpload, setShowImgUpload] = useState<boolean>(false);
    const [showImgDownload, setShowImgDownload] = useState<boolean>(false);
    const [file, setFile] = useState<any>(null);
    const [fileSize, setFileSize] = useState<number | null>(null);
    const [compressStep, setCompressStep] = useState<number>(0);

    function selectFile(selectedFile: any){
        // Call when file is selected (file input onChange)
        if (file == null){
            setFile(selectedFile)
            setCompressStep((prevState) => prevState + 1)
        }

        else {
            setFile(selectedFile)
        }

        setFileSize(selectedFile.size)
    }

    function removeFile(){
        setFile(null)
        setCompressStep((prevState) => prevState - 1)
    }

    return (
        <section className="bg-gray-100 h-full">
            <div className="mx-auto items-center justify-center max-w-4xl grid sm:grid-cols-2 grid-cols-1 h-full gap-12">

                <div className="h-2/3">
                    <UploadCard
                        ogFileSize={fileSize}
                        setShowImgUpload={(bool: boolean) => setShowImgUpload(bool)}
                        setShowImgDownload={(bool: boolean) => setShowImgDownload(bool)}
                        removeFile={() => removeFile()}
                        file={file}
                        compressStep={compressStep}
                    />
                </div>

                <div className="h-2/3 flex flex-col justify-center">
                    <AnimatePresence exitBeforeEnter>
                        {showImgUpload && <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={delayedFade}
                        >
                            <ImageUpload selectFile={(file: any) => selectFile(file)}/>

                        </motion.div>
                        }

                        {showImgDownload && <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="h-full"
                            variants={delayedFade}
                        >
                            <ImageDownload file={file}/>
                        </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>

        </section>
    )
}