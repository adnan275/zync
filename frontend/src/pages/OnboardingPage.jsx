import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon, UploadIcon } from "lucide-react";
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

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

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
    console.log('Randomize clicked');
    const idx = Math.floor(Math.random() * 1000);
    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`;

    console.log('Setting avatar to:', randomAvatar);
    setFormState(prev => {
      console.log('Previous state:', prev);
      const newState = { ...prev, profilePic: randomAvatar };
      console.log('New state:', newState);
      return newState;
    });
    setUploadedFileName("");
    toast.success("Random profile picture generated!");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, PNG, GIF, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({ ...prev, profilePic: reader.result }));
      setUploadedFileName(file.name);
      setIsUploading(false);
      toast.success('Profile picture uploaded!');
    };
    reader.onerror = () => {
      toast.error('Failed to upload image');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
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
            <div className="flex flex-col items-center space-y-6 pb-8 border-b border-white/5">
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
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <LoaderIcon className="size-8 text-white animate-spin" />
                  </div>
                )}
              </div>

              {uploadedFileName && (
                <p className="text-xs text-base-content/60 truncate max-w-full text-center">
                  📁 {uploadedFileName}
                </p>
              )}

              <div className="flex gap-3 w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isPending}
                  className="btn btn-primary btn-sm flex-1 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  <UploadIcon className="size-4 mr-2" />
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  disabled={isUploading || isPending}
                  className="btn btn-ghost btn-sm flex-1 text-primary hover:bg-primary/10 rounded-xl transition-all"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Randomize
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              <p className="text-xs text-base-content/50 text-center">
                JPG, PNG, GIF or WebP • Max 5MB
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
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
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default OnboardingPage;
