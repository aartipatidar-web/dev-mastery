import { useNavigate } from 'react-router-dom';
import { Code2, Rocket, Brain, Trophy, ChevronRight, Terminal, Zap, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languagesData } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';

const Index = () => {
  const navigate = useNavigate();
  const { getSolvedCount, getRecentSubmissions } = useProgress();

  const totalProblems = languagesData.reduce(
    (acc, lang) => acc + lang.chapters.reduce((a, ch) => a + ch.problems.length, 0), 
    0
  );

  const features = [
    {
      icon: Terminal,
      title: 'VS Code-Like Editor',
      description: 'Monaco Editor with syntax highlighting, autocomplete, and real-time error detection',
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Run your code and see results immediately with detailed test case analysis',
    },
    {
      icon: Target,
      title: 'Hidden Test Cases',
      description: 'Validate your solutions against hidden tests to ensure they truly work',
    },
    {
      icon: BookOpen,
      title: 'Structured Learning',
      description: 'Progress through chapters from basics to advanced data structures',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_hsl(var(--background)))]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-primary">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground">CodeMaster</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/progress')}>
              My Progress
            </Button>
            <Button variant="glow" onClick={() => navigate('/playground')}>
              Start Coding
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Rocket className="w-4 h-4" />
              <span>Master JavaScript & Python through practice</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              Learn to Code by
              <span className="gradient-text block">Actually Coding</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Practice with {totalProblems}+ problems, get instant feedback in a VS Code-like environment, 
              and track your progress as you master programming.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button variant="glow" size="lg" onClick={() => navigate('/playground')} className="w-full sm:w-auto">
                <Terminal className="w-5 h-5 mr-2" />
                Open Playground
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/progress')} className="w-full sm:w-auto">
                <Trophy className="w-5 h-5 mr-2" />
                View Progress ({getSolvedCount()} solved)
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Languages Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Choose Your Language</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Start with JavaScript for web development or Python for data science and automation
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {languagesData.map((lang, index) => (
              <button
                key={lang.id}
                onClick={() => navigate(`/playground?problem=${lang.chapters[0]?.problems[0]?.id}`)}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-left animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {lang.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {lang.chapters.length} chapters • {lang.chapters.reduce((a, ch) => a + ch.problems.length, 0)} problems
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lang.chapters.slice(0, 4).map(chapter => (
                        <span key={chapter.id} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                          {chapter.icon} {chapter.title}
                        </span>
                      ))}
                      {lang.chapters.length > 4 && (
                        <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
                          +{lang.chapters.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            A complete coding environment designed for learning and practice
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.1),_transparent_70%)]" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            <span>Free to use • No signup required</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Coding?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Jump into the playground and solve your first problem right now
          </p>
          
          <Button 
            variant="glow" 
            size="lg" 
            onClick={() => navigate('/playground')}
            className="animate-pulse-glow"
          >
            <Terminal className="w-5 h-5 mr-2" />
            Launch Playground
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">CodeMaster</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Practice coding problems • Learn JavaScript & Python
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
