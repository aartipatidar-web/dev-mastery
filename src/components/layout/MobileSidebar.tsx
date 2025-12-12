import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Code2, Search, X, Menu } from 'lucide-react';
import { languagesData, Language, Problem } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MobileSidebarProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  selectedProblem: Problem | null;
  onProblemSelect: (problem: Problem) => void;
}

export function MobileSidebar({ 
  selectedLanguage, 
  onLanguageChange, 
  selectedProblem, 
  onProblemSelect 
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['variables']);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSolved } = useProgress();

  const currentLang = languagesData.find(l => l.id === selectedLanguage);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const filteredChapters = currentLang?.chapters.map(chapter => ({
    ...chapter,
    problems: chapter.problems.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(chapter => chapter.problems.length > 0 || searchQuery === '');

  const handleProblemSelect = (problem: Problem) => {
    onProblemSelect(problem);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-sm p-0 bg-sidebar">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-sidebar-border">
            <SheetTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h1 className="font-bold text-foreground text-lg">CodeMaster</h1>
                <p className="text-xs text-muted-foreground">Practice. Master. Code.</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="p-4 space-y-3">
            {/* Language Selector */}
            <div className="flex gap-2">
              {languagesData.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedLanguage === lang.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                  )}
                >
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Chapters */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
            {filteredChapters?.map(chapter => (
              <div key={chapter.id} className="mb-1">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-sidebar-accent transition-colors"
                >
                  {expandedChapters.includes(chapter.id) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-lg">{chapter.icon}</span>
                  <span className="text-sm font-medium text-sidebar-foreground flex-1">
                    {chapter.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {chapter.problems.filter(p => isSolved(p.id)).length}/{chapter.problems.length}
                  </span>
                </button>

                {expandedChapters.includes(chapter.id) && (
                  <div className="ml-4 pl-4 border-l border-sidebar-border">
                    {chapter.problems.map(problem => (
                      <button
                        key={problem.id}
                        onClick={() => handleProblemSelect(problem)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-sm",
                          selectedProblem?.id === problem.id
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        {isSolved(problem.id) ? (
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                        )}
                        <span className="truncate flex-1">{problem.title}</span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          problem.difficulty === 'easy' && "bg-success/10 text-success",
                          problem.difficulty === 'medium' && "bg-warning/10 text-warning",
                          problem.difficulty === 'hard' && "bg-destructive/10 text-destructive"
                        )}>
                          {problem.difficulty}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer Stats */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">
                {currentLang?.chapters.reduce((acc, ch) => 
                  acc + ch.problems.filter(p => isSolved(p.id)).length, 0
                )}/
                {currentLang?.chapters.reduce((acc, ch) => acc + ch.problems.length, 0)} solved
              </span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${(currentLang?.chapters.reduce((acc, ch) => 
                    acc + ch.problems.filter(p => isSolved(p.id)).length, 0
                  ) || 0) / (currentLang?.chapters.reduce((acc, ch) => 
                    acc + ch.problems.length, 0
                  ) || 1) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
