import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useState } from "react";

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimateSkills(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const skills = [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ];

  return (
    <section id="skills" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">Skills & Technologies</h2>
          <p className="text-slate-600 mt-4">Technologies I work with</p>
        </motion.div>

        {/* Horizontal scrolling skills */}
        <div className="relative">
          <div className="flex space-x-8 animate-scroll">
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: (index % skills.length) * 0.1 }}
                className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:border-primary/20 group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional skills info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600">
            Constantly learning and exploring new technologies to stay current with industry trends
          </p>
        </motion.div>
      </div>
    </section>
  );
}
