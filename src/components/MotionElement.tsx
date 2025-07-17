import type {FC, ReactNode} from "react";
import {motion} from "framer-motion";

interface Props {
    duration?: number,
    children: ReactNode,
}

const MotionElement: FC<Props> = ({duration = 0.54, children}) => {
    return (
        <motion.div initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration}}>
            {children}
        </motion.div>
    );
};

export default MotionElement;