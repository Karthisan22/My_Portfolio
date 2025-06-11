import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Award, Trophy, CheckCircle } from "lucide-react";

export default function Certifications() {
  const { ref, isVisible } = useScrollAnimation();

  const certifications = [
    {
      title: "JavaScript for Beginners",
      type: "Offline Course",
      icon: "fab fa-js-square",
      color: "bg-yellow-500"
    },
    {
      title: "NodeJS",
      type: "Online Course",
      icon: "fab fa-node-js",
      color: "bg-green-500"
    },
    {
      title: "Oracle - Cloud Computing",
      type: "Online Certification",
      icon: "fas fa-cloud",
      color: "bg-red-500"
    },
    {
      title: "Basic SQL",
      type: "Online Course",
      icon: "fas fa-database",
      color: "bg-blue-500"
    }
  ];

  const zohoProgram = [
    "Experienced in ReactJS development",
    "Logical & Strategic design experience",
    "Project presentation through AMD AI Challenge Workshop"
  ];

  return (
    <section id="certifications" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">Certifications & Achievements</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">Professional Certifications</h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${cert.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Award className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{cert.title}</h4>
                          <p className="text-slate-600">{cert.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Zoho Program */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">Special Programs</h3>
            <Card className="bg-gradient-to-br from-primary to-secondary text-white">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="text-3xl" size={48} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Zoho's Young Creator Program</h4>
                  <p className="text-blue-100">Hands-on experience in ReactJS</p>
                </div>
                <div className="space-y-4">
                  {zohoProgram.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="text-blue-200 flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
