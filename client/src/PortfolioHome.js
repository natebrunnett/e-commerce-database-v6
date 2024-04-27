import React from 'react'
import Skills from './Portfolio-components/components/Skills';
import Header from'./Portfolio-components/components/Header';
import CyclicApps from './Portfolio-components/components/CyclicApps';
import {motion} from 'framer-motion';

function PortfolioHome() {
  return (
  
  <motion.div  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}    transition={{ duration: 1.15 }} >
    <main className='text-white bg-[rgb(36,36,36)]'>
      <Header />
      <Skills />
      <CyclicApps />
    </main>
  </motion.div>
  
  )
}

export default PortfolioHome