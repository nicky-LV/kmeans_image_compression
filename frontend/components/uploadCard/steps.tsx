import {motion, AnimatePresence} from 'framer-motion';
import {halfFadeOut} from "../../animations";

interface Props {
    step: number
}

export default function Steps(props: Props) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8 py-4 px-6 text-center border-b h-16">
                <li key="0" className="md:flex-1">
                    {/* Step 0 */}
                    <motion.div
                        id="step-0"
                        className="flex flex-col gap-1"
                        initial={props.step === 0 && "initial"}
                        animate={props.step === 1 && "animate"}
                        exit="exit"
                        variants={halfFadeOut}
                    >

                        <AnimatePresence exitBeforeEnter>
                            {props.step === 0 && <motion.div
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={halfFadeOut}
                                className="bg-blue-600 w-full h-1 rounded-lg">
                            </motion.div>}

                            {props.step === 1 && <motion.div
                                initial={{opacity: "50%"}}
                                animate={{opacity: "50%"}}
                                exit={{opacity: "0%"}}
                                className="bg-blue-600 w-full h-1 rounded-lg"
                            />}

                        </AnimatePresence>
                        <span className={`${props.step === 0 ? "opacity-100" : "opacity-50"} text-sm text-black mt-1 font-medium`}>How it works</span>
                    </motion.div>
                </li>

                <li key="1" className="md:flex-1">
                    {/* Step 1 */}
                    <div id="step-1" className={`${props.step === 1 ? "opacity-100" : "opacity-50"} flex flex-col gap-1`}>
                        <div className="bg-gray-400 w-full h-1 rounded-lg">
                            <AnimatePresence>
                                {props.step === 1 && <motion.div
                                    className="h-1 rounded-lg bg-blue-600"
                                    initial={{width: 0}}
                                    animate={{width: "100%", transition: {
                                            type: "linear",
                                            duration: 1
                                        }
                                    }}
                                    exit={{width: 0, transition: {
                                            type: "linear",
                                            duration: 1
                                        }
                                    }}
                                >

                                </motion.div>}
                            </AnimatePresence>
                        </div>
                        <span className="text-sm mt-1 text-black font-medium">Compress</span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}
