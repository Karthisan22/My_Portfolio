import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Code, Server, Laptop } from "lucide-react";
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

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "bg-primary",
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "ReactJS", level: 75 }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "bg-secondary",
      skills: [
        { name: "PHP", level: 85 },
        { name: "NodeJS", level: 75 },
        { name: "SQL", level: 80 },
        { name: "MongoDB", level: 70 }
      ]
    },
    {
      title: "Programming",
      icon: Laptop,
      color: "bg-blue-400",
      skills: [
        { name: "Python", level: 85 },
        { name: "C", level: 80 },
        { name: "Java", level: 75 },
        { name: "C++", level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">Skills & Technologies</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <category.icon className="text-white text-2xl" size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-700">{skill.name}</span>
                          <span className="text-slate-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`${category.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={animateSkills ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
