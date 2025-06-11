import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Computer science workspace" 
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-slate-900">Passionate Developer & Problem Solver</h3>
            
            <p className="text-slate-600 leading-relaxed">
              I am a recent Computer Science graduate with a strong foundation in software development, 
              passionate about building innovative and efficient solutions. My academic journey has 
              equipped me with problem-solving skills I'm eager to contribute to a dynamic organization.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              With experience in both frontend and backend technologies, I enjoy creating impactful 
              software solutions that make a difference. I'm always learning and adapting to new 
              technologies in this ever-evolving field.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="text-center p-6 bg-slate-50">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">6+</div>
                  <div className="text-slate-600">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-slate-50">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">4+</div>
                  <div className="text-slate-600">Certifications</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
