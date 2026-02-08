import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  BarChart3,
  RefreshCcw,
  BookOpen,
  Award,
  Zap,
  LayoutDashboard,
  Settings,
  LogOut,
  Target,
  Trophy,
  Calendar,
  Search,
  ChevronDown,
  Star,
  TrendingUp,
  Map,
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  Layers
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// UI Components
const SidebarItem = ({ icon: Icon, label, active, onClick, disabled }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
        : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <header className="mb-8">
    <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
    <p className="text-slate-500 mt-1">{subtitle}</p>
  </header>
);

const SplashView = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 animate-in fade-in duration-700">
    <div className="max-w-md w-full text-center space-y-10">
      <div className="flex flex-col items-center gap-4">
         <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20">
            <Zap size={48} fill="white" />
         </div>
         <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Leap<span className="text-indigo-600">.</span></h1>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 space-y-6">
         <h2 className="text-2xl font-bold text-white">Signed Out Successfully</h2>
         <p className="text-slate-400">Keep up the momentum! You were 5 days ahead of your Band 7.5 target.</p>
         <button
           onClick={() => window.location.reload()}
           className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/10"
         >
           Sign Back In
         </button>
      </div>

      <p className="text-slate-500 text-sm">© 2024 Leap Scholar. All rights reserved.</p>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('dashboard');
  const [loopStep, setLoopStep] = useState(1); // 1: Video, 2: Question, 3: Feedback
  const [activeLessonIndex, setActiveLessonIndex] = useState(0); // Sequence within the loop
  const [completedToday, setCompletedToday] = useState(0);
  const [isComebackMode, setIsComebackMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);


  // State for Goal Setting
  const [targetScore, setTargetScore] = useState(7.5);
  const [examDate, setExamDate] = useState("24 Oct 2024");

  // State for Settings
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  // Feature 1: The Sequence Data (Video -> Question -> Video -> Question)
const microLessons = [
  {
    id: 1,
    title: "The 'Not Given' Threshold",
    description: "Learn how the examiner differentiates a 'False' statement from 'Not Given'.",
    videoSrc: "/videos/lesson1.mp4",
    duration: 70,
    questions: [
      {
        question: "The city council approved the construction of the new bridge after public protests.",
        options: ["True", "False", "Not Given"],
        correct: "Not Given",
      },
      {
        question: "The research found that students who exercised regularly performed better in mathematics.",
        options: ["True", "False", "Not Given"],
        correct: "Not Given",
      },
      {
        question: "The company reduced employee working hours to improve job satisfaction.",
        options: ["True", "False", "Not Given"],
        correct: "False",
      }
    ]
  },
  {
    id: 2,
    title: "Evidence vs Inference",
    description: "Avoid assuming information not explicitly stated.",
    videoSrc: "/videos/lesson2.mp4",
    duration: 65,
    questions: [
      {
        question: "The digital catalog is more popular than books.",
        options: ["True", "False", "Not Given"],
        correct: "Not Given",
      }
    ]
  }
];
const bandTrendData = [
  { week: 'Week 1', score: 5.5 },
  { week: 'Week 2', score: 6.0 },
  { week: 'Week 3', score: 5.8 },
  { week: 'Week 4', score: 6.5 },
  { week: 'Week 5', score: 7.0 },
  { week: 'Week 6', score: 6.8 },
  { week: 'Week 7', score: 7.5 },
];




  const dailyTasks = [
    { id: 1, title: "70s Masterclass: 'Not Given' Trap", duration: "2 Loops", type: "Reading", done: completedToday > 0, icon: <BookOpen size={18} /> },
    { id: 2, title: "Common Mistake: Subject-Verb", duration: "3m", type: "Writing", done: completedToday > 1, icon: <Zap size={18} /> },
    { id: 3, title: "Speaking: Daily Prompt", duration: "5m", type: "Speaking", done: completedToday > 2, icon: <PlayCircle size={18} /> }
  ];



  const handleNextInSequence = () => {
    if (activeLessonIndex < microLessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setLoopStep(1);
      setSelectedAnswer(null);
    } else {
      finishTotalTask();
    }
  };

  const finishTotalTask = () => {
    setCompletedToday(prev => prev + 1);
    setLoopStep(1);
    setActiveLessonIndex(0);
    setSelectedAnswer(null);
    setView('dashboard');
  };

  const toggleComeback = () => {
    setIsComebackMode(!isComebackMode);
    setCompletedToday(0);
    setView('dashboard');
  };

  const handleLogout = () => setIsLoggedOut(true);
  const handleLogin = () => {
    setIsLoggedOut(false);
    setView('dashboard');
  };

  // UI Components
  const SidebarItem = ({ icon: Icon, label, active, onClick, disabled }) => (
    <div 
      onClick={!disabled ? onClick : undefined}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
          : disabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );

  const SectionHeader = ({ title, subtitle }) => (
    <header className="mb-8">
      <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
      <p className="text-slate-500 mt-1">{subtitle}</p>
    </header>
  );

  const DashboardView = () => (
    <div className="animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, Arjun! 👋</h1>
          <p className="text-slate-500 mt-1">Here is your personalized roadmap for today.</p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Calendar size={18} />
              </div>
              <h2 className="font-bold text-slate-800">Daily Micro-Tasks</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Est. Time: {isComebackMode ? '10 mins' : '15 mins'}
            </span>
          </div>

          <div className="divide-y divide-slate-50">
            {dailyTasks.slice(0, isComebackMode ? 2 : 3).map((task) => (
              <div 
                key={task.id}
                onClick={() => !task.done && setView('learning_loop')}
                className={`group flex items-center gap-6 p-6 transition-all ${
                  task.done 
                    ? 'bg-slate-50/50' 
                    : 'hover:bg-indigo-50/30 cursor-pointer'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  task.done ? 'bg-green-100 text-green-600' : 'bg-white border-2 border-slate-100 text-indigo-600 shadow-sm'
                }`}>
                  {task.done ? <CheckCircle2 size={24} /> : task.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </h3>
                    {!task.done && (
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Next
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <Clock size={12} /> {task.duration}
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{task.type}</span>
                  </div>
                </div>

                {!task.done && (
                  <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors">
                    Start <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-slate-800 rounded-2xl">
            <RefreshCcw size={32} className="text-indigo-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">Prototype Sandbox</h3>
            <p className="text-slate-400 text-sm mt-1">Test how the application adapts to user behavior like drop-offs.</p>
          </div>
          <button 
            onClick={toggleComeback}
            className="whitespace-nowrap bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            {isComebackMode ? "Switch to Regular Mode" : "Trigger Comeback Mode"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Prep Status</h3>
            <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${isComebackMode ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
              {isComebackMode ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
              {isComebackMode ? 'Catch-Up' : 'On Track'}
            </div>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Course Completion
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {isComebackMode ? '33%' : '72%'}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-indigo-50">
              <div 
                style={{ width: isComebackMode ? '33%' : '72%' }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-1000"
              />
            </div>
          </div>
          
          <p className="text-sm text-slate-500 leading-relaxed">
            {isComebackMode 
              ? "You've been away for 4 days. We've optimized your schedule to focus on core concepts first." 
              : "Great consistency! You are 5 days ahead of your target schedule for Band 7.5."}
          </p>
        </section>

        <section className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-100">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-indigo-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Daily Streak</span>
            </div>
            <div className="text-4xl font-black mb-2">{isComebackMode ? '0' : '12'} Days</div>
            <p className="text-indigo-100 text-sm">Finish today to unlock your weekend "Streak Freeze" credit!</p>
          </div>
          <Zap className="absolute -right-4 -bottom-4 text-indigo-500 opacity-30" size={120} />
        </section>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <BarChart3 size={18} className="text-indigo-600" /> Skill Heatmap
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(28)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-sm ${
                  i < 18 ? 'bg-indigo-600' : i < 22 ? 'bg-indigo-200' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

const LearningLoopView = () => {
  const currentLesson = microLessons[activeLessonIndex];
  const currentQuestion = currentLesson.questions[questionIndex];
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col animate-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors"
          onClick={() => {
            setView('dashboard');
            setLoopStep(1);
            setActiveLessonIndex(0);
            setQuestionIndex(0);
          }}
        >
          <ChevronRight size={18} className="rotate-180" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Exit Study Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">
            Lesson {activeLessonIndex + 1} of {microLessons.length}
          </span>
          <div className="flex gap-1">
            {microLessons.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full ${
                  i <= activeLessonIndex ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col flex-1">

        {/* ========== VIDEO STEP ========== */}
        {loopStep === 1 && (
          <div className="flex-1 flex flex-col p-10">
            <video
              src={currentLesson.videoSrc}
              autoPlay
              muted
              controls
              onEnded={() => {
                setLoopStep(2);
                setQuestionIndex(0);
              }}
              className="w-full aspect-video rounded-3xl bg-black"
            />

            <div className="mt-10 max-w-2xl">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {currentLesson.title}
              </h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed font-medium">
                {currentLesson.description}
              </p>
              <button
                onClick={() => {
                  setLoopStep(2);
                  setQuestionIndex(0);
                }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Skip to Questions
              </button>
            </div>
          </div>
        )}

        {/* ========== QUESTION STEP ========== */}
        {loopStep === 2 && (
          <div className="flex-1 flex flex-col p-10 animate-in slide-in-from-bottom duration-500">
            <div className="bg-indigo-50/50 rounded-3xl p-10 mb-10 border border-indigo-100/50 text-center">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">
                Practice Question
              </span>

              <p className="text-slate-800 text-2xl font-serif italic leading-relaxed mb-6">
                {currentQuestion.question}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt}
                  disabled={answerSelected}
                  onClick={() => {
                    if (!answerSelected) {
                      setSelectedAnswer(opt);
                      setIsCorrect(opt === currentQuestion.correct);
                      setShowFeedback(true);
                      setAnswerSelected(true);
                    }
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all text-center font-bold text-lg ${
                    showFeedback
                      ? opt === currentQuestion.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : opt === selectedAnswer && !isCorrect
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answerSelected && (
              <div className="mt-8 text-center">
                <p className={`text-lg font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect. The correct answer is highlighted in green.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setAnswerSelected(false);

                    if (questionIndex < currentLesson.questions.length - 1) {
                      setQuestionIndex(q => q + 1);
                    } else {
                      if (activeLessonIndex < microLessons.length - 1) {
                        setActiveLessonIndex(i => i + 1);
                        setLoopStep(1);
                      } else {
                        finishTotalTask();
                      }
                    }
                  }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


  const SplashView = () => (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="max-w-md w-full text-center space-y-10">
        <div className="flex flex-col items-center gap-4">
           <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20">
              <Zap size={48} fill="white" />
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Leap<span className="text-indigo-600">.</span></h1>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 space-y-6">
           <h2 className="text-2xl font-bold text-white">Signed Out Successfully</h2>
           <p className="text-slate-400">Keep up the momentum! You were 5 days ahead of your Band 7.5 target.</p>
           <button 
             onClick={handleLogin}
             className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/10"
           >
             Sign Back In
           </button>
        </div>
        
        <p className="text-slate-500 text-sm">© 2024 Leap Scholar. All rights reserved.</p>
      </div>
    </div>
  );

const SettingsView = () => (
  <div className="animate-in fade-in duration-500 space-y-8">
    <SectionHeader title="Settings" subtitle="Customize your learning experience." />
    <div className="max-w-2xl bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-10">
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Notifications</label>
        <div className="flex items-center gap-4">
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="w-5 h-5" />
          <span className="text-slate-800">Enable notifications</span>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Email Updates</label>
        <div className="flex items-center gap-4">
          <input type="checkbox" checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} className="w-5 h-5" />
          <span className="text-slate-800">Receive email updates</span>
        </div>
      </div>
    </div>
  </div>
);

if (isLoggedOut) return <SplashView />;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {view === 'logout' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Sign Out?</h2>
            <p className="text-slate-500 mb-8 font-medium">Are you sure you want to end your session? Your current progress is saved.</p>
            <div className="space-y-3">
              <button onClick={handleLogout} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100">Yes, Sign Out</button>
              <button onClick={() => setView('dashboard')} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-72 bg-white border-r border-slate-100 p-8 flex flex-col hidden lg:flex shrink-0">
        <div className="flex items-center gap-3 mb-12 px-4 cursor-pointer" onClick={() => { setView('dashboard'); setLoopStep(1); setActiveLessonIndex(0); }}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Zap size={24} fill="white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Leap<span className="text-indigo-600">.</span></span>
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
          <SidebarItem icon={BookOpen} label="Course Modules" active={view === 'modules'} onClick={() => setView('modules')} />
          <SidebarItem icon={PlayCircle} label="Practice Sets" active={view === 'practice'} onClick={() => setView('practice')} />
          <SidebarItem icon={BarChart3} label="Skill Analytics" active={view === 'analytics'} onClick={() => setView('analytics')} />
          <SidebarItem icon={Target} label="Goal Setting" active={view === 'goal'} onClick={() => setView('goal')} />
          <SidebarItem icon={Award} label="Certificates" active={view === 'certificates'} onClick={() => setView('certificates')} />
        </nav>
        <div className="pt-8 mt-8 border-t border-slate-100 space-y-1">
          <SidebarItem icon={Settings} label="Settings" active={view === 'settings'} onClick={() => setView('settings')} />
          <SidebarItem icon={LogOut} label="Sign Out" active={view === 'logout'} onClick={() => setView('logout')} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-20">
          <div className="flex items-center gap-4">
             <div className="text-sm font-bold text-slate-400">Prep Progress: <span className="text-indigo-600">Band {completedToday > 0 ? '7.0' : '6.5'} Estimator</span></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 120}`} alt="user" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">+12</div>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900">AiChan</p>
                  <p className="text-[10px] font-bold text-slate-400">ID: #44021</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform" onClick={() => setView('settings')}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="profile" />
               </div>
            </div>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto custom-scrollbar transition-all ${view === 'learning_loop' ? 'bg-slate-100/50 p-12' : 'p-10'}`}>
          {view === 'dashboard' && <DashboardView />}
          {view === 'learning_loop' && <LearningLoopView />}
          {view === 'modules' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <SectionHeader title="Course Modules" subtitle="Master the four pillars of IELTS with focused video loops." />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {['Reading', 'Writing', 'Listening', 'Speaking'].map((module, i) => (
                  <div key={module} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all group cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><BookOpen size={24} /></div>
                    <h3 className="text-xl font-bold text-slate-800">{module}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-slate-400">{12 + i * 4} Lessons</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{60 + i * 10}% Done</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3"><div className="bg-indigo-600 h-full rounded-full" style={{ width: `${60 + i * 10}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {view === 'practice' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <SectionHeader title="Practice Sets" subtitle="Challenge yourself with full mock tests or section-specific drills." />
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr><th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Test Name</th><th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th><th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</th><th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Best Score</th><th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3, 4].map(i => (
                      <tr key={i} className="hover:bg-indigo-50/20 transition-colors group">
                        <td className="px-6 py-5 font-bold text-slate-800">IELTS Full Mock Test #{i}</td>
                        <td className="px-6 py-5 text-sm text-slate-500">Full Academic</td>
                        <td className="px-6 py-5 text-sm"><span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${i % 2 === 0 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{i % 2 === 0 ? 'Intermediate' : 'Expert'}</span></td>
                        <td className="px-6 py-5 font-bold text-indigo-600">{7.0 + (i * 0.5) % 1.5} Band</td>
                        <td className="px-6 py-5 text-right"><button className="text-slate-400 group-hover:text-indigo-600 transition-colors"><PlayCircle size={20} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {view === 'analytics' && (
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
    <TrendingUp size={18} className="text-indigo-600" />
    Band Score Trend
  </h3>

  {/* IMPORTANT: fixed height */}
  <div style={{ width: '100%', height: 260 }}>
    <ResponsiveContainer>
      <LineChart data={bandTrendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="week" />
        <YAxis domain={[5, 8]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

          )}
          {view === 'goal' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <SectionHeader title="Goal Setting" subtitle="Define your target band and exam timeline to adjust the Momentum Engine." />
              <div className="max-w-2xl bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-10">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Target Band Score</label>
                  <div className="flex items-center gap-8">
                    <input type="range" min="4" max="9" step="0.5" value={targetScore} onChange={(e) => setTargetScore(e.target.value)} className="flex-1 h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    <span className="text-4xl font-black text-indigo-600">{targetScore}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Exam Date</label>
                    <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" value={examDate} readOnly className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 font-bold text-slate-800 outline-none" /></div>
                  </div>
                  <div className="space-y-4"><label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Prep Intensity</label><div className="flex bg-slate-50 p-1.5 rounded-2xl"><button className="flex-1 py-3 bg-white shadow-sm rounded-xl text-xs font-bold text-indigo-600">Daily</button><button className="flex-1 py-3 text-xs font-bold text-slate-400">Weekend Warrior</button></div></div>
                </div>
                <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100">Apply & Recalculate Roadmap</button>
              </div>
            </div>
          )}
          {view === 'certificates' && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <SectionHeader title="Certificates & Badges" subtitle="Celebrate your progress and share your achievements." />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[{ title: "7-Day Streak Master", desc: "Maintained a daily micro-prep habit for one week.", color: "bg-orange-100 text-orange-600" }, { title: "Reading Specialist", desc: "Completed all Advanced Reading Modules with 80% accuracy.", color: "bg-blue-100 text-blue-600" }, { title: "Writing Pro", desc: "Achieved a predicted Band 7.5 in Writing Task 2.", color: "bg-indigo-100 text-indigo-600" }].map((c, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${c.color}`}><Award size={40} /></div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{c.title}</h3>
                    <p className="text-sm text-slate-500 mb-6">{c.desc}</p>
                    <button className="text-indigo-600 font-bold text-sm flex items-center gap-2 hover:underline">View Certificate <ChevronRight size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {view === 'settings' && <SettingsView />}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }`}} />
    </div>
  );
};

export default App;