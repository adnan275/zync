import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UsersIcon, VideoIcon } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-5xl mx-auto text-center space-y-10 relative z-10"
            >

                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative bg-base-100/80 backdrop-blur-md p-8 rounded-full border border-white/10 shadow-2xl">
                            <VideoIcon className="size-20 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/20 to-white animate-gradient-x">
                        Boundless <br /> Connections
                    </h1>
                    <p className="text-xl md:text-2xl text-base-content/60 max-w-2xl mx-auto leading-relaxed font-light">
                        Experience video calls and language exchange reimagined. <br />
                        <span className="text-primary/80 font-medium">Crystal clear. Instant. Global.</span>
                    </p>
                </div>

                <div className="pt-4">
                    <Link to="/friends" className="btn btn-primary btn-lg h-14 px-8 rounded-full gap-3 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300 border-none bg-gradient-to-r from-primary to-indigo-600 text-white text-lg">
                        Start Connecting
                        <div className="bg-white/20 p-1 rounded-full">
                            <CheckCircleIcon className="size-4" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
                    <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group text-left">
                        <div className="p-3 bg-primary/10 w-fit rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                            <UsersIcon className="size-8 text-primary" />
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Find Partners</h3>
                        <p className="text-base-content/60 leading-relaxed">Discover people appearing for the same native language.</p>
                    </div>

                    <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group text-left">
                        <div className="p-3 bg-secondary/10 w-fit rounded-2xl mb-4 group-hover:bg-secondary/20 transition-colors">
                            <VideoIcon className="size-8 text-secondary" />
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Instant Video</h3>
                        <p className="text-base-content/60 leading-relaxed">Start meetings instantly with high - quality video and audio.</p>
                    </div>

                    <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group text-left">
                        <div className="p-3 bg-accent/10 w-fit rounded-2xl mb-4 group-hover:bg-accent/20 transition-colors">
                            <MapPinIcon className="size-8 text-accent" />
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">Global Reach</h3>
                        <p className="text-base-content/60 leading-relaxed">Connect with learners from every corner of the world.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;
