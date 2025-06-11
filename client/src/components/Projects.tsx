import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ExternalLink, Calendar, Github } from "lucide-react";

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Portfolio Website",
      description: "Created a portfolio website using HTML, CSS, and JavaScript. Features responsive design and modern UI elements.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["HTML", "CSS", "JavaScript"],
      period: "01/2023 - 02/2023",
      colors: ["bg-primary", "bg-secondary", "bg-blue-400"]
    },
    {
      title: "Cab Booking Management System",
      description: "Built a cab booking management system using ReactJS, CSS, and PHP for efficient transportation management.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["ReactJS", "PHP", "CSS"],
      period: "05/2023 - 06/2023",
      colors: ["bg-primary", "bg-secondary", "bg-blue-400"]
    },
    {
      title: "Inventory Management System",
      description: "Developed an inventory management system using ReactJS and MongoDB for efficient stock tracking and management.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["ReactJS", "MongoDB"],
      period: "07/2024 - 08/2024",
      colors: ["bg-primary", "bg-secondary"]
    },
    {
      title: "Health Bot",
      description: "Developed a Health Bot based on Python, Machine Learning, and Datasets for intelligent health assistance and recommendations.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "ML", "Datasets"],
      period: "10/2024 - 11/2024",
      colors: ["bg-primary", "bg-secondary", "bg-blue-400"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900">Featured Projects</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group relative bg-slate-50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <ExternalLink className="mx-auto mb-4" size={48} />
                      <p className="font-semibold">View Project</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">{project.title}</h3>
                  <p className="text-slate-600 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 ${project.colors[techIndex] || 'bg-slate-500'} text-white text-sm rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="mr-2" size={16} />
                    {project.period}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            className="hover:scale-105 transition-transform duration-300"
            asChild
          >
            <a href="https://github.com/karthisan22" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2" size={20} />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
