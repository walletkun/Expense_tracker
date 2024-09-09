'use client';

import {motion} from "framer-motion";


const page = () => {
  return (
    <div className='grid place-items-center min-h-screen'>

      <motion.div
        className="grid grid-cols-3col-start-2">
          Hello World
        </motion.div>
    </div>
  )
}

export default page