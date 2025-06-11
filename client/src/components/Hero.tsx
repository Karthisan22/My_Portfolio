import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import karthiiImage from "./img/karthii.jpg";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile photo - smaller and positioned to the side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <img 
              src={karthiiImage} 
              alt="Professional portrait" 
              className="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-white"
            />
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Hi, I'm <span className="text-primary">Karthisan</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl">
                Computer Science Graduate passionate about building innovative and efficient solutions. 
                Proficient in full-stack development with experience in developing projects using modern technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
                asChild
              >
                <a href="https://drive.google.com/file/d/1mY9T1ZiwgefXVP1Zy_r46JX5jCSEO64x/view?usp=drive_link" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex space-x-6 justify-center lg:justify-start">
              <a 
                href="www.linkedin.com/in/karthis22gem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-all hover:scale-110 duration-300"
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a 
                href="https://github.com/karthisan22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-all hover:scale-110 duration-300"
              >
                <Github className="h-8 w-8" />
              </a>
              <a 
                href="mailto:karthim978789@gmail.com"
                className="text-slate-600 hover:text-primary transition-all hover:scale-110 duration-300"
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
