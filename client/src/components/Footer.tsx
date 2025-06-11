import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Karthisan M</div>
          <p className="text-slate-400 mb-6">Computer Science Graduate & Developer</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="www.linkedin.com/in/karthis22gem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110 duration-300"
            >
              <Linkedin size={32} />
            </a>
            <a 
              href="https://github.com/karthisan22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110 duration-300"
            >
              <Github size={32} />
            </a>
            <a 
              href="mailto:karthim978789@gmail.com"
              className="text-slate-400 hover:text-white transition-all hover:scale-110 duration-300"
            >
              <Mail size={32} />
            </a>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400">&copy; 2024 Karthisan M. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
