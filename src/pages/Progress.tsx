import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, CheckCircle2, XCircle, Clock, Code2, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languagesData, getProblemById } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

export default function Progress() {
  const navigate = useNavigate();
  const { solvedProblems, getRecentSubmissions, getSolvedCount, resetProgress } = useProgress();

  const totalProblems = languagesData.reduce(
    (acc, lang) => acc + lang.chapters.reduce((a, ch) => a + ch.problems.length, 0), 
    0
  );

  const jsSolved = solvedProblems.filter(id => id.startsWith('js-')).length;
  const pySolved = solvedProblems.filter(id => id.startsWith('py-')).length;

  const recentSubmissions = getRecentSubmissions(10);

  const jsTotal = languagesData.find(l => l.id === 'javascript')?.chapters.reduce((a, ch) => a + ch.problems.length, 0) || 0;
  const pyTotal = languagesData.find(l => l.id === 'python')?.chapters.reduce((a, ch) => a + ch.problems.length, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              <h1 className="font-semibold text-foreground">My Progress</h1>
            </div>
          </div>
          <Button variant="glow" onClick={() => navigate('/playground')}>
            Continue Practicing
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground">Total Solved</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {getSolvedCount()}
              <span className="text-lg text-muted-foreground font-normal">/{totalProblems}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(getSolvedCount() / totalProblems) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🟨</div>
              <span className="text-muted-foreground">JavaScript</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {jsSolved}
              <span className="text-lg text-muted-foreground font-normal">/{jsTotal}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-warning rounded-full transition-all duration-500"
                style={{ width: `${(jsSolved / jsTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🐍</div>
              <span className="text-muted-foreground">Python</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {pySolved}
              <span className="text-lg text-muted-foreground font-normal">/{pyTotal}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${(pySolved / pyTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-muted-foreground">Success Rate</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {recentSubmissions.length > 0
                ? Math.round((recentSubmissions.filter(s => s.passed).length / recentSubmissions.length) * 100)
                : 0}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on last {recentSubmissions.length} submissions
            </p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-6">Recent Submissions</h2>
          
          {recentSubmissions.length === 0 ? (
            <div className="p-12 rounded-xl bg-card border border-border text-center">
              <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No submissions yet</p>
              <Button variant="glow" onClick={() => navigate('/playground')}>
                Start Solving Problems
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => {
                const problem = getProblemById(submission.problemId);
                if (!problem) return null;

                return (
                  <button
                    key={`${submission.problemId}-${submission.timestamp}`}
                    onClick={() => navigate(`/playground?problem=${submission.problemId}`)}
                    className="w-full p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all flex items-center gap-4 text-left"
                  >
                    {submission.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{problem.language === 'javascript' ? '🟨' : '🐍'}</span>
                        <span className="font-medium text-foreground truncate">{problem.title}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          problem.difficulty === 'easy' && "bg-success/10 text-success",
                          problem.difficulty === 'medium' && "bg-warning/10 text-warning",
                          problem.difficulty === 'hard' && "bg-destructive/10 text-destructive"
                        )}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>
                          Tests: {submission.testResults.passed}/{submission.testResults.total}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(submission.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      submission.passed
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}>
                      {submission.passed ? 'Accepted' : 'Failed'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Chapter Progress */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Progress by Chapter</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {languagesData.map(lang => (
              <div key={lang.id} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{lang.icon}</span>
                  <h3 className="text-lg font-semibold text-foreground">{lang.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {lang.chapters.map(chapter => {
                    const solved = chapter.problems.filter(p => solvedProblems.includes(p.id)).length;
                    const total = chapter.problems.length;
                    const percentage = total > 0 ? (solved / total) * 100 : 0;

                    return (
                      <div key={chapter.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground flex items-center gap-2">
                            <span>{chapter.icon}</span>
                            {chapter.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {solved}/{total}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              percentage === 100 ? "bg-success" : "bg-primary"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Progress */}
        <div className="mt-10 p-6 rounded-xl bg-destructive/5 border border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Reset Progress</h3>
              <p className="text-sm text-muted-foreground">Clear all solved problems and submission history</p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                  resetProgress();
                }
              }}
            >
              Reset All
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
