import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, User, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Query SheetDB for the username in the "Credentials" sheet
      const response = await fetch(`https://sheetdb.io/api/v1/zp3euuhbbzs6w/search?username=${encodeURIComponent(username)}&sheet=Credentials`);
      
      if (!response.ok) {
        throw new Error("Failed to connect to database");
      }
      
      const data = await response.json();
      
      // Check if user exists and password matches
      if (data && data.length > 0) {
        const userRecord = data[0];
        
        // Exact match check
        if (userRecord.password === password) {
          toast.success("Login successful! Welcome back.");
          // TODO: Add redirect or state update here for successful login
        } else {
          toast.error("Invalid credentials. Please try again.");
        }
      } else {
        // Username not found
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Could not verify credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md relative z-10">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] -z-10" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden">
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-inner p-2.5">
                <img src={logo} alt="Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <h1 className="font-extrabold tracking-tight mb-2 leading-tight">
                <span className="text-3xl sm:text-4xl block mb-1">Rotaract</span>
                <span className="text-primary text-[14px] sm:text-lg whitespace-nowrap tracking-wide">Club of Sinhgad College Of Pharmacy</span>
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 relative z-10">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-bold text-foreground/80">Username</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="Enter your username" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-background/50 border-black/10 dark:border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-bold text-foreground/80">Password</Label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline" onClick={(e) => { e.preventDefault(); toast.info("Please contact the website administrator to reset your password."); }}>Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-background/50 border-black/10 dark:border-white/10 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl transition-all font-medium tracking-widest placeholder:tracking-normal"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all mt-6 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center relative z-10">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
