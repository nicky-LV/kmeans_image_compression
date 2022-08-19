import {CubeIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import {fade} from "../animations";
import {CompressStatus} from "../types";

interface Props {
    compressStep: number,
    setCompressStatus: (status: CompressStatus) => void,
    setShowImgUpload: (status: boolean) => void
    uploadImage: () => void
}

export default function CompressButton(props: Props){
    return (
        <div className={`${props.compressStep === 1 ? "opacity-100" : "opacity-60"}`}>
            <motion.button
                initial="initial"
                animate="animate"
                variants={fade}
                disabled={props.compressStep === 0}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600"
                onClick={() => {
                    props.setCompressStatus(CompressStatus.PROCESSING);
                    props.setShowImgUpload(false);
                    props.uploadImage()
                }}
            >
                Compress
                <CubeIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </motion.button>
        </div>)
}