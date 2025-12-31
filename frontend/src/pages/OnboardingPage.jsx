import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import Logo from "../components/Logo";
import { LANGUAGES } from "../constants";
import { motion } from "framer-motion";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen items-center justify-center p-4 bg-base-100 relative overflow-hidden flex">


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3">Complete Your Profile</h1>
            <p className="text-base-content/60 text-lg">Tell us more about yourself to find the perfect language partners</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">


              <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="size-40 rounded-full bg-base-300 overflow-hidden ring-4 ring-white/10 shadow-2xl transition-all duration-300 group-hover:ring-primary/50">
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-base-300 to-base-200">
                        <CameraIcon className="size-12 text-base-content/30" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer" onClick={handleRandomAvatar} title="Generate Random Avatar">
                    <ShuffleIcon className="size-5" />
                  </div>
                </div>
                <button type="button" onClick={handleRandomAvatar} className="btn btn-ghost btn-sm text-primary hover:bg-primary/10">
                  <ShuffleIcon className="size-4 mr-2" />
                  Randomize Avatar
                </button>
              </div>


              <div className="lg:col-span-8 space-y-6">


                <div className="form-control hover-glow p-1 rounded-xl transition-all">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="input input-lg glass-input w-full rounded-xl"
                    placeholder="e.g. John Doe"
                  />
                </div>


                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">Bio</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formState.bio}
                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                    className="textarea textarea-lg glass-input h-32 w-full rounded-xl resize-none leading-relaxed"
                    placeholder="Tell others about your interests, goals, and what languages you love..."
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-base-content/80">Native Language</span>
                    </label>
                    <select
                      name="nativeLanguage"
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="select select-lg glass-input w-full rounded-xl"
                    >
                      <option value="" disabled>Select Language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()} className="bg-base-300">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>


                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">Location</span>
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-4 size-5 text-primary" />
                    <input
                      type="text"
                      name="location"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="input input-lg glass-input w-full pl-12 rounded-xl"
                      placeholder="City, Country"
                    />
                  </div>
                </div>


                <div className="pt-4">
                  <button className="btn btn-primary btn-lg w-full rounded-xl shadow-lg hover:shadow-primary/40 bg-gradient-to-r from-primary to-indigo-600 border-none transition-all duration-300 hover:scale-[1.01]" disabled={isPending} type="submit">
                    {!isPending ? (
                      <>
                        <div className="size-6 mr-2">
                          <Logo className="w-full h-full animate-[spin_10s_linear_infinite]" />
                        </div>
                        Complete Profile
                      </>
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin size-6 mr-2" />
                        Saving Profile...
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default OnboardingPage;
