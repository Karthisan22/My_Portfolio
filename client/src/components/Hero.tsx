import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Hi, I'm <span className="text-primary">Karthisan</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Computer Science Graduate passionate about building innovative and efficient solutions. 
                Proficient in full-stack development with experience in developing projects using modern technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/karthisan2929" 
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
                href="mailto:karthisan2929@gmail.com"
                className="text-slate-600 hover:text-primary transition-all hover:scale-110 duration-300"
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
              alt="Professional portrait" 
              className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 max-w-md w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
