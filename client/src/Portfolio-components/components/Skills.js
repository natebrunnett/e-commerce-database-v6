import React from 'react'
import { Cursor, Typewriter } from 'react-simple-typewriter'
import Skill from './Skill';
import reactNativeLogo from '../media/react-native-logo.png'
import mongoDbLogo from '../media/MongoDB_White.png'
import gitLogo from '../media/git-bash.svg'
import nodeLogo from '../media/nodeJS-v1.png'

function Skills() {
  return (
    <div className="flex justify-center flex-col items-center gap-5 mt-4 pb-3 bg-[rgb(36,36,36)]">
        <h1 className="text-blue-600 font-bold text-4xl text-center italic mb-3 mt-3 ">Skills</h1>
        <div className="grid grid-cols-3 gap-5 bg-[rgb(36,36,36)] ">
            <Skill exampleTest="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" text="JavaScript"/>
            <Skill exampleTest="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" text="React"/>
            <Skill exampleTest="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" text="CSS"/>
            <Skill exampleTest={mongoDbLogo} text="MongoDb"/>
            <Skill exampleTest="https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png" text="HTML"/>
            <Skill exampleTest={reactNativeLogo} text="React Native "/>
            <Skill exampleTest={nodeLogo} text="NodeJS" />
            <Skill exampleTest={gitLogo} text="Git bash" />
            <Skill exampleTest="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" text="Tailwindcss" />
          </div>
      </div>
  )
}

export default Skills