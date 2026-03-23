import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  User,
  FileText,
  ScrollText,
  MessageSquare,
  Search,
  Globe,
  Trophy,
  BookOpen,
} from "lucide-react";
import { toolsConfig } from "@/lib/config/tools";

const tools = toolsConfig.map((t) => ({
  name: t.name,
  desc: t.longDesc,
  icon: t.icon,
  href: t.href,
  phase: t.phase,
}));

const benefits = [
  "No account required — start right away",
  "Your data stays in your browser",
  "Skills flow into your resume automatically",
  "Export resumes and cover letters as PDF",
  "100% free, forever",
];

const phaseColors: Record<string, string> = {
  "Know Yourself": "bg-primary-50 text-primary-700",
  "Market Your Brand": "bg-blue-50 text-blue-700",
  "Prove Yourself": "bg-purple-50 text-purple-700",
};

const cardHeaderGradient: Record<string, string> = {
  "Know Yourself": "card-header-green",
  "Market Your Brand": "card-header-blue",
  "Prove Yourself": "card-header-purple",
};

const phases = ["Know Yourself", "Market Your Brand", "Prove Yourself"] as const;

const phaseData = [
  {
    name: "Know Yourself",
    tagline: "Discover your strengths.",
    desc: "Identify your skills, values, and goals. Build your personal brand and elevator pitch before applying anywhere.",
    tools: ["Skills Inventory", "Work Values", "Focus Goals", "Power Statement"],
    gradientClass: "phase-gradient-green",
    textColor: "text-primary-800",
  },
  {
    name: "Market Your Brand",
    tagline: "Stand out from the crowd.",
    desc: "Build your resume, practice interviews, craft cover letters, and search strategically. Your brand statement flows into every tool.",
    tools: ["Resume Builder", "Cover Letters", "Interview Prep", "Job Search"],
    gradientClass: "phase-gradient-blue",
    textColor: "text-blue-700",
  },
  {
    name: "Prove Yourself",
    tagline: "Land the job and thrive.",
    desc: "Track every application, follow up on time, and prepare for your first 90 days. Nothing falls through the cracks.",
    tools: ["Contact Log", "Workplace Success", "Self-Evaluation"],
    gradientClass: "phase-gradient-purple",
    textColor: "text-purple-700",
  },
];

/* Mini tool card data for the hero mockup */
const mockupTools = [
  { name: "Know Yourself", color: "bg-green-200" },
  { name: "Applications", color: "bg-blue-100" },
  { name: "Resumes", color: "bg-blue-200" },
  { name: "Interviews", color: "bg-blue-100" },
  { name: "Job Search", color: "bg-blue-200" },
  { name: "Social Media", color: "bg-blue-100" },
  { name: "Landing the Job", color: "bg-purple-100" },
  { name: "Contact Log", color: "bg-purple-200" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-dark/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="text-sm font-bold text-surface-dark">CR</span>
              </div>
              <span className="text-base font-semibold text-white">CareerReady</span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
              <Link href="#tools" className="rounded px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue">
                Tools
              </Link>
              <Link href="/resumes" className="rounded px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue">
                Resumes
              </Link>
              <Link href="/interviews" className="rounded px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue">
                Interviews
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="#tools"
              className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-blue-hover min-h-[44px] inline-flex items-center"
            >
              Open Toolkit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — dark blue gradient with decorative orbs */}
      <section className="hero-gradient relative overflow-hidden px-6 pb-16 pt-24 md:pb-24 md:pt-36">
        {/* Decorative orbs */}
        <div className="hero-orb-blue -left-48 -top-24" aria-hidden="true" />
        <div className="hero-orb-purple -right-32 top-16" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1120px] text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-[80px] md:leading-[0.95]">
            Your first job starts here.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
            8 free tools that walk you from figuring out your strengths to acing
            the interview. Work at your own pace, on your own schedule.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/know-yourself"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#tools"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              Explore the 8 tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* App preview mockup */}
          <div className="mx-auto mt-16 max-w-[820px]">
            <div className="rounded-xl border border-white/10 bg-white/5 p-1 shadow-2xl backdrop-blur-sm">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 rounded-t-lg bg-surface-lighter/50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-white/10 px-3 py-1 text-xs text-neutral-400">
                  careerready.pages.dev
                </div>
              </div>
              {/* Mini tool grid */}
              <div className="rounded-b-lg bg-white p-4">
                <div className="mb-3 text-left text-xs font-semibold text-neutral-800">Your Toolkit</div>
                <div className="grid grid-cols-4 gap-2">
                  {mockupTools.map((t) => (
                    <div key={t.name} className={`rounded-lg ${t.color} p-2.5`}>
                      <div className="h-1.5 w-6 rounded-full bg-black/10" />
                      <div className="mt-1.5 text-[10px] font-medium text-neutral-700 leading-tight">{t.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <p className="mt-10 text-sm text-slate-400">
            Based on a proven career readiness curriculum used by workforce development programs.
          </p>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="border-b border-neutral-150 bg-neutral-50 py-6">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-2 px-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2">
          {benefits.map((b) => (
            <span key={b} className="flex items-center gap-2 text-sm text-neutral-500">
              <CheckCircle className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Phase walkthrough — 3 visual blocks */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Three phases. One clear path.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
              Work through each phase in order, or jump to what you need. Your data flows between tools automatically.
            </p>
          </div>

          <div className="mt-16 space-y-16 md:space-y-24">
            {phaseData.map((phase, i) => (
              <div key={phase.name} className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Gradient visual block */}
                <div className={`aspect-[4/3] w-full max-w-md rounded-2xl ${phase.gradientClass} flex items-end p-6 md:w-1/2`}>
                  <div className="rounded-xl bg-white/80 p-4 backdrop-blur-sm shadow-lg w-full">
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Phase {i + 1}</div>
                    <div className="mt-1 text-sm font-bold text-neutral-800">{phase.name}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {phase.tools.map((tool) => (
                        <span key={tool} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Phase {i + 1}</div>
                  <h3 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">{phase.tagline}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-500">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="bg-neutral-50 py-24 md:py-32">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Everything you need, in the right order
            </h2>
            <p className="mt-4 text-lg text-neutral-500">
              Eight tools. Three phases. Work through them in order or jump to what you need.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Colored gradient header */}
                <div className={`${cardHeaderGradient[t.phase]} flex h-14 items-center justify-between px-5`}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/80 shadow-sm">
                    <t.icon className="h-4.5 w-4.5 text-neutral-700" />
                  </div>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 shadow-sm">
                    {t.phase}
                  </span>
                </div>
                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-neutral-900">{t.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[800px] px-6 text-center">
          <div className="text-5xl font-serif text-neutral-200" aria-hidden="true">&ldquo;</div>
          <blockquote className="-mt-4 text-2xl font-medium leading-relaxed text-neutral-800 md:text-3xl">
            Write your skills and brand statement once — they auto-fill your resume, cover letter, and interview prep.
          </blockquote>
          <p className="mt-6 text-sm font-medium text-neutral-400">How CareerReady connects your tools</p>
        </div>
      </section>

      {/* CTA Section — full width, dark blue */}
      <section className="hero-gradient relative overflow-hidden px-6 py-20 md:py-28">
        <div className="hero-orb-blue -right-48 -bottom-24" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[700px] text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Start with Know Yourself.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-300">
            The skills and brand statement you write there will auto-fill your resume, cover letter, and interview prep — so you only write them once.
          </p>
          <Link
            href="/know-yourself"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-blue px-8 py-4 text-base font-medium text-white transition-colors hover:bg-accent-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
          >
            Open Know Yourself <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer — dark */}
      <footer className="bg-surface-dark">
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
                  <span className="text-xs font-bold text-surface-dark">CR</span>
                </div>
                <span className="text-sm font-semibold text-white">CareerReady</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                8 free job prep tools for college graduates. No account needed, your data stays in your browser.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Core Tools</h4>
              <nav aria-label="Core Tools links" className="mt-3 flex flex-col gap-2">
                <Link href="/know-yourself" className="text-sm text-slate-400 hover:text-white transition-colors">Know Yourself</Link>
                <Link href="/resumes" className="text-sm text-slate-400 hover:text-white transition-colors">Resume Builder</Link>
                <Link href="/interviews" className="text-sm text-slate-400 hover:text-white transition-colors">Interview Prep</Link>
                <Link href="/applications" className="text-sm text-slate-400 hover:text-white transition-colors">Applications</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">More Tools</h4>
              <nav aria-label="More Tools links" className="mt-3 flex flex-col gap-2">
                <Link href="/job-search" className="text-sm text-slate-400 hover:text-white transition-colors">Job Search</Link>
                <Link href="/social-media" className="text-sm text-slate-400 hover:text-white transition-colors">Social Media</Link>
                <Link href="/landing-the-job" className="text-sm text-slate-400 hover:text-white transition-colors">Landing the Job</Link>
                <Link href="/contact-log" className="text-sm text-slate-400 hover:text-white transition-colors">Contact Log</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Get Started</h4>
              <nav aria-label="Get started links" className="mt-3 flex flex-col gap-2">
                <Link href="/know-yourself" className="text-sm text-slate-400 hover:text-white transition-colors">Begin with Know Yourself</Link>
                <Link href="/resumes/builder" className="text-sm text-slate-400 hover:text-white transition-colors">Build Your Resume</Link>
                <Link href="/interviews/common-questions" className="text-sm text-slate-400 hover:text-white transition-colors">Practice Interviews</Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-xs text-slate-500">
              100% free. No account required. Start your job search today.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
