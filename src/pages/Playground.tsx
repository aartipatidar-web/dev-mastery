import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Play, Send, ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel, ExecutionResult, TestResult } from '@/components/editor/OutputPanel';
import { ProblemDescription } from '@/components/problem/ProblemDescription';
import { Problem, Language, getProblemById, languagesData } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Playground() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<'problem' | 'editor'>('editor');
  const [isOutputExpanded, setOutputExpanded] = useState(false);
  
  const { saveCode, getCode, markSolved, addSubmission, isSolved } = useProgress();

  useEffect(() => {
    const problemId = searchParams.get('problem');
    if (problemId) {
      const problem = getProblemById(problemId);
      if (problem) {
        setSelectedProblem(problem);
        setSelectedLanguage(problem.language);
        const savedCode = getCode(problemId);
        setCode(savedCode || problem.starterCode);
      }
    } else {
      const firstProblem = languagesData[0]?.chapters[0]?.problems[0];
      if (firstProblem) {
        setSelectedProblem(firstProblem);
        setCode(getCode(firstProblem.id) || firstProblem.starterCode);
        setSearchParams({ problem: firstProblem.id });
      }
    }
  }, [searchParams, getCode, setSearchParams]);

  const handleProblemSelect = useCallback((problem: Problem) => {
    if (selectedProblem) {
      saveCode(selectedProblem.id, code);
    }
    setSelectedProblem(problem);
    setSelectedLanguage(problem.language);
    const savedCode = getCode(problem.id);
    setCode(savedCode || problem.starterCode);
    setResult(null);
    setSearchParams({ problem: problem.id });
  }, [selectedProblem, code, saveCode, getCode, setSearchParams]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    if (selectedProblem) {
      saveCode(selectedProblem.id, newCode);
    }
  }, [selectedProblem, saveCode]);

  const handleReset = () => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode);
      saveCode(selectedProblem.id, selectedProblem.starterCode);
      toast.info('Code reset to starter template');
    }
  };

  const executeCode = async (runAllTests: boolean) => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setResult(null);
    setOutputExpanded(true);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));

    try {
      const mockOutput = simulateExecution(code, selectedProblem, runAllTests);
      setResult(mockOutput);

      if (runAllTests) {
        const allPassed = mockOutput.testResults?.every(t => t.passed);
        addSubmission({
          problemId: selectedProblem.id,
          code,
          passed: allPassed || false,
          testResults: {
            passed: mockOutput.testResults?.filter(t => t.passed).length || 0,
            total: mockOutput.testResults?.length || 0,
          },
        });

        if (allPassed) {
          markSolved(selectedProblem.id);
          toast.success('All test cases passed! Problem solved!', { icon: '🎉' });
        } else {
          toast.error(`${mockOutput.testResults?.filter(t => !t.passed).length} test case(s) failed`);
        }
      }
    } catch (error) {
      setResult({
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Unknown error',
        exitCode: 1,
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const simulateExecution = (userCode: string, problem: Problem, runAllTests: boolean): ExecutionResult => {
    const startTime = Date.now();
    let stdout = '';
    let stderr = '';
    let exitCode = 0;
    
    if (selectedLanguage === 'javascript') {
      if (userCode.includes('function') && !userCode.includes('{')) {
        stderr = 'SyntaxError: Unexpected token';
        exitCode = 1;
      }
    } else if (selectedLanguage === 'python') {
      if (userCode.includes('def ') && !userCode.includes(':')) {
        stderr = 'SyntaxError: expected ":"';
        exitCode = 1;
      }
    }

    const testResults: TestResult[] = problem.testCases.map((tc) => {
      let passed = false;
      let actual = '';
      
      if (problem.id.includes('hello')) {
        passed = userCode.includes('Hello, World!') || userCode.includes('Hello, World');
        actual = passed ? 'Hello, World!' : '';
      } else if (problem.id.includes('sum')) {
        passed = userCode.includes('return') && (userCode.includes('+') || userCode.includes('a + b'));
        actual = passed ? tc.expectedOutput : 'undefined';
      } else if (problem.id.includes('fizz')) {
        passed = userCode.includes('FizzBuzz') && userCode.includes('Fizz') && userCode.includes('Buzz');
        actual = passed ? tc.expectedOutput : '';
      } else {
        passed = Math.random() > 0.3;
        actual = passed ? tc.expectedOutput : 'incorrect output';
      }

      if (stderr) { passed = false; actual = ''; }

      return { id: tc.id, passed, input: tc.input, expected: tc.expectedOutput, actual, error: stderr || undefined, isHidden: tc.isHidden };
    });

    if (!stderr) {
      const visibleResults = testResults.filter(t => !t.isHidden);
      stdout = visibleResults.map(t => t.actual).filter(Boolean).join('\n') || 'Output here...';
    }

    return { stdout, stderr, exitCode, executionTime: Date.now() - startTime, testResults: runAllTests ? testResults : undefined };
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
      <div className={cn("hidden lg:block transition-all duration-300 flex-shrink-0", isSidebarCollapsed ? "w-0" : "w-72")}>
        {!isSidebarCollapsed && (
          <Sidebar selectedLanguage={selectedLanguage} onLanguageChange={(lang) => { setSelectedLanguage(lang); const fp = languagesData.find(l => l.id === lang)?.chapters[0]?.problems[0]; if (fp) handleProblemSelect(fp); }} selectedProblem={selectedProblem} onProblemSelect={handleProblemSelect} />
        )}
      </div>

      <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary hover:bg-secondary/80 p-1 rounded-r-md transition-all" style={{ left: isSidebarCollapsed ? 0 : '18rem' }}>
        {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-muted-foreground" /> : <ChevronLeft className="w-4 h-4 text-muted-foreground" />}
      </button>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center justify-between px-2 sm:px-4 bg-card/50">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <MobileSidebar selectedLanguage={selectedLanguage} onLanguageChange={(lang) => { setSelectedLanguage(lang); const fp = languagesData.find(l => l.id === lang)?.chapters[0]?.problems[0]; if (fp) handleProblemSelect(fp); }} selectedProblem={selectedProblem} onProblemSelect={handleProblemSelect} />
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="hidden sm:flex"><ArrowLeft className="w-4 h-4 mr-2" />Home</Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="sm:hidden w-8 h-8"><ArrowLeft className="w-4 h-4" /></Button>
            {selectedProblem && (
              <>
                <span className="text-muted-foreground hidden sm:inline">|</span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl hidden sm:inline">{selectedLanguage === 'javascript' ? '🟨' : '🐍'}</span>
                  <h1 className="font-semibold text-foreground text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{selectedProblem.title}</h1>
                  {isSolved(selectedProblem.id) && <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-medium hidden sm:inline">Solved</span>}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset} className="hidden sm:flex"><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
            <Button variant="ghost" size="icon" onClick={handleReset} className="sm:hidden w-8 h-8"><RotateCcw className="w-4 h-4" /></Button>
            <Button variant="run" size="sm" onClick={() => executeCode(false)} disabled={isRunning} className="text-xs sm:text-sm px-2 sm:px-3"><Play className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Run</span></Button>
            <Button variant="submit" size="sm" onClick={() => executeCode(true)} disabled={isRunning} className="text-xs sm:text-sm px-2 sm:px-3"><Send className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Submit</span></Button>
          </div>
        </header>

        <div className="lg:hidden flex border-b border-border">
          <button onClick={() => setMobileView('problem')} className={cn("flex-1 py-2 text-sm font-medium transition-colors", mobileView === 'problem' ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground")}>Problem</button>
          <button onClick={() => setMobileView('editor')} className={cn("flex-1 py-2 text-sm font-medium transition-colors", mobileView === 'editor' ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground")}>Code</button>
        </div>

        {selectedProblem ? (
          <>
            <div className="hidden lg:flex flex-1 min-h-0">
              <div className="w-[45%] border-r border-border bg-card/30 flex flex-col"><ProblemDescription problem={selectedProblem} /></div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 min-h-0 p-2"><CodeEditor code={code} onChange={handleCodeChange} language={selectedLanguage} /></div>
                <div className="h-64 border-t border-border p-2"><OutputPanel result={result} isRunning={isRunning} /></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col lg:hidden min-h-0">
              {mobileView === 'problem' ? (
                <div className="flex-1 overflow-auto"><ProblemDescription problem={selectedProblem} /></div>
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className={cn("flex-1 min-h-0 p-2 transition-all", isOutputExpanded ? "h-[40%]" : "h-[calc(100%-3rem)]")}><CodeEditor code={code} onChange={handleCodeChange} language={selectedLanguage} /></div>
                  <button onClick={() => setOutputExpanded(!isOutputExpanded)} className="flex items-center justify-center gap-2 py-2 border-t border-border bg-card/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isOutputExpanded ? <><ChevronDown className="w-4 h-4" />Hide Output</> : <><ChevronUp className="w-4 h-4" />Show Output</>}
                    {result?.testResults && <span className={cn("px-2 py-0.5 rounded text-xs", result.testResults.every(t => t.passed) ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive")}>{result.testResults.filter(t => t.passed).length}/{result.testResults.length}</span>}
                  </button>
                  {isOutputExpanded && <div className="h-[45%] border-t border-border p-2"><OutputPanel result={result} isRunning={isRunning} /></div>}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Select a problem to get started</p></div>
        )}
      </div>
    </div>
  );
}