import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Play, Send, ArrowLeft, RotateCcw, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/Sidebar';
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
  
  const { saveCode, getCode, markSolved, addSubmission, isSolved } = useProgress();

  // Load problem from URL
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
      // Default to first problem
      const firstProblem = languagesData[0]?.chapters[0]?.problems[0];
      if (firstProblem) {
        setSelectedProblem(firstProblem);
        setCode(getCode(firstProblem.id) || firstProblem.starterCode);
        setSearchParams({ problem: firstProblem.id });
      }
    }
  }, [searchParams, getCode, setSearchParams]);

  const handleProblemSelect = useCallback((problem: Problem) => {
    // Save current code before switching
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

  // Mock code execution (in production, this would call a backend API)
  const executeCode = async (runAllTests: boolean) => {
    if (!selectedProblem) return;
    
    setIsRunning(true);
    setResult(null);

    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));

    try {
      // Mock execution - in production this would be a backend call
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
          toast.success('All test cases passed! Problem solved!', {
            icon: '🎉',
          });
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

  // Simulated code execution (mock)
  const simulateExecution = (userCode: string, problem: Problem, runAllTests: boolean): ExecutionResult => {
    const startTime = Date.now();
    
    // Very basic mock - check for common patterns
    let stdout = '';
    let stderr = '';
    let exitCode = 0;
    
    // Check for syntax errors (very basic)
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

    // Mock test results based on code patterns
    const testResults: TestResult[] = problem.testCases.map((tc, index) => {
      // Very basic pattern matching for demo purposes
      let passed = false;
      let actual = '';
      
      // Check for some known solutions
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
        // Random pass/fail for demo
        passed = Math.random() > 0.3;
        actual = passed ? tc.expectedOutput : 'incorrect output';
      }

      if (stderr) {
        passed = false;
        actual = '';
      }

      return {
        id: tc.id,
        passed,
        input: tc.input,
        expected: tc.expectedOutput,
        actual,
        error: stderr || undefined,
        isHidden: tc.isHidden,
      };
    });

    // Generate stdout from visible test results
    if (!stderr) {
      const visibleResults = testResults.filter(t => !t.isHidden);
      stdout = visibleResults.map(t => t.actual).filter(Boolean).join('\n') || 'Output here...';
    }

    return {
      stdout,
      stderr,
      exitCode,
      executionTime: Date.now() - startTime,
      testResults: runAllTests ? testResults : undefined,
    };
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300 flex-shrink-0",
        isSidebarCollapsed ? "w-0" : "w-72"
      )}>
        {!isSidebarCollapsed && (
          <Sidebar
            selectedLanguage={selectedLanguage}
            onLanguageChange={(lang) => {
              setSelectedLanguage(lang);
              const firstProblem = languagesData.find(l => l.id === lang)?.chapters[0]?.problems[0];
              if (firstProblem) {
                handleProblemSelect(firstProblem);
              }
            }}
            selectedProblem={selectedProblem}
            onProblemSelect={handleProblemSelect}
          />
        )}
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary hover:bg-secondary/80 p-1 rounded-r-md transition-all"
        style={{ left: isSidebarCollapsed ? 0 : '18rem' }}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            {selectedProblem && (
              <>
                <span className="text-muted-foreground">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {selectedLanguage === 'javascript' ? '🟨' : '🐍'}
                  </span>
                  <h1 className="font-semibold text-foreground">{selectedProblem.title}</h1>
                  {isSolved(selectedProblem.id) && (
                    <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-medium">
                      Solved
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              variant="run" 
              size="sm" 
              onClick={() => executeCode(false)}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 mr-2" />
              Run
            </Button>
            <Button 
              variant="submit" 
              size="sm" 
              onClick={() => executeCode(true)}
              disabled={isRunning}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </header>

        {/* Split View */}
        {selectedProblem ? (
          <div className="flex-1 flex min-h-0">
            {/* Problem Description */}
            <div className="w-[45%] border-r border-border bg-card/30 flex flex-col">
              <ProblemDescription problem={selectedProblem} />
            </div>

            {/* Editor & Output */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Editor */}
              <div className="flex-1 min-h-0 p-2">
                <CodeEditor
                  code={code}
                  onChange={handleCodeChange}
                  language={selectedLanguage}
                />
              </div>

              {/* Output */}
              <div className="h-64 border-t border-border p-2">
                <OutputPanel result={result} isRunning={isRunning} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a problem to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
