import type {FC, ReactNode} from "react";
import {motion} from "framer-motion";

interface Props {
    duration?: number,
    children: ReactNode,
    zIndex?: number | "auto",
}

const MotionElement: FC<Props> = ({duration = 0.36, zIndex = "auto", children}) => {
    return (
        <motion.div initial={{opacity: 0, scale: 0, zIndex: zIndex}}
                    animate={{opacity: 1, scale: 1, zIndex: zIndex}}
                    transition={{duration}}>
            {children}
        </motion.div>
    );
};

export default MotionElement;