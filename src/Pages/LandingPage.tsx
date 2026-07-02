import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import Header from "../Components/landing/Header";
import Footer from "../Components/landing/Footer";
import BackgroundBlobs from "../Components/landing/BackgroundBlobs";
import GradientText from "../Components/landing/GradientText";
import AppMockup from "../Components/landing/AppMockup";
import FeatureCard from "../Components/landing/FeatureCard";
import AuthModal from "../Components/landing/AuthModal";

const features = [
  {
    icon: <BookOpen size={22} className="text-brand" />,
    title: "Course Management",
    description:
      "Organize materials, assignments, and quizzes in one intuitive workspace built for educators.",
  },
  {
    icon: <Users size={22} className="text-brand" />,
    title: "Role-Based Access",
    description:
      "Dedicated dashboards for admins, teachers, and students with tailored workflows for each role.",
  },
  {
    icon: <BarChart3 size={22} className="text-brand" />,
    title: "Progress Tracking",
    description:
      "Real-time insights into attendance, assignments, and course completion at a glance.",
  },
  {
    icon: <Shield size={22} className="text-brand" />,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with session management and role-based permissions built in.",
  },
  {
    icon: <MessageSquare size={22} className="text-brand" />,
    title: "Collaborative Learning",
    description:
      "Discussion boards and shared resources that keep students engaged and connected.",
  },
];

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "signup" || auth === "login") {
      setAuthMode(auth);
      setAuthOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-surface">
      <BackgroundBlobs variant="hero" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header onOpenAuth={openAuth} />

        <main className="flex-1">
          {/* Hero */}
          <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-header-bg)] px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="text-brand" />
              Modern learning, reimagined
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl">
              The smarter way to{" "}
              <GradientText as="span">manage education</GradientText>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              Campus brings together courses, students, and analytics in one
              beautiful platform — designed for admins, teachers, and learners
              alike.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="btn-gradient rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-500/25"
              >
                Get Started Free
              </button>
              <button
                type="button"
                onClick={() => openAuth("signup")}
                className="rounded-full border border-[var(--color-border)] bg-card px-8 py-3.5 text-base font-semibold text-heading backdrop-blur-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md dark:hover:bg-surface-alt"
              >
                Create Account
              </button>
            </div>

            <div className="mt-16 sm:mt-20">
              <AppMockup />
            </div>
          </section>

          {/* Features */}
          <section
            id="features"
            className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Features
              </p>
              <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">
                Everything you need to{" "}
                <GradientText as="span">teach & learn</GradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Powerful tools wrapped in a clean, distraction-free interface.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {features.slice(0, 3).map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
            <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
              {features.slice(3).map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default LandingPage;
