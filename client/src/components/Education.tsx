import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const { ref, isVisible } = useScrollAnimation();

  const educationData = [
    {
      degree: "BE Computer Science And Engineering",
      institution: "Chartered College of Engineering and Technology",
      period: "2021 - 2025",
      grade: "CGPA: 7.53",
      side: "left"
    },
    {
      degree: "MSc",
      institution: "SKV Hr.Sec. School",
      period: "2018 - 2020",
      grade: "Percentage: 63%",
      side: "right"
    },
    {
      degree: "SSLC",
      institution: "Government High School",
      period: "2017 - 2018",
      grade: "Percentage: 75%",
      side: "left"
    }
  ];

  return (
    <section id="education" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">Education</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full hidden lg:block"></div>

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${edu.side === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-full lg:w-1/2 ${edu.side === 'left' ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'}`}>
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{edu.degree}</h3>
                      <p className="text-primary font-medium mb-2">{edu.institution}</p>
                      <p className="text-slate-600 mb-2">{edu.period}</p>
                      <p className="text-slate-600">{edu.grade}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg items-center justify-center z-10">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>

                {/* Spacer for other side */}
                <div className="hidden lg:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
