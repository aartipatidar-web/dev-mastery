import { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TestResult {
  id: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
  isHidden: boolean;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  testResults?: TestResult[];
}

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
}

type TabType = 'console' | 'testcases';

export function OutputPanel({ result, isRunning }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('console');

  const passedTests = result?.testResults?.filter(t => t.passed).length || 0;
  const totalTests = result?.testResults?.length || 0;

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center border-b border-border px-4">
        <button
          onClick={() => setActiveTab('console')}
          className={cn(
            "tab-button",
            activeTab === 'console' && "active"
          )}
        >
          <Terminal className="w-4 h-4 inline mr-2" />
          Console
        </button>
        <button
          onClick={() => setActiveTab('testcases')}
          className={cn(
            "tab-button",
            activeTab === 'testcases' && "active"
          )}
        >
          {result?.testResults && (
            <span className={cn(
              "inline-flex items-center justify-center w-5 h-5 rounded text-xs mr-2",
              passedTests === totalTests 
                ? "bg-success/20 text-success" 
                : "bg-destructive/20 text-destructive"
            )}>
              {passedTests}/{totalTests}
            </span>
          )}
          Test Cases
        </button>

        {result && (
          <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {result.executionTime}ms
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 scrollbar-thin">
        {isRunning ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Running code...</span>
            </div>
          </div>
        ) : !result ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Terminal className="w-12 h-12 mb-3 opacity-50" />
            <p>Run your code to see output here</p>
          </div>
        ) : activeTab === 'console' ? (
          <div className="font-mono text-sm space-y-2">
            {result.stdout && (
              <div>
                <div className="text-xs text-muted-foreground mb-1">stdout:</div>
                <pre className="text-foreground whitespace-pre-wrap">{result.stdout}</pre>
              </div>
            )}
            {result.stderr && (
              <div>
                <div className="text-xs text-destructive mb-1">stderr:</div>
                <pre className="text-destructive whitespace-pre-wrap">{result.stderr}</pre>
              </div>
            )}
            {!result.stdout && !result.stderr && (
              <div className="text-muted-foreground italic">No output</div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {result.testResults?.map((test, index) => (
              <div
                key={test.id}
                className={cn(
                  "rounded-lg p-4",
                  test.passed ? "testcase-pass" : "testcase-fail"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {test.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <span className="font-medium">
                    {test.isHidden ? `Hidden Test ${index + 1}` : `Test Case ${index + 1}`}
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    test.passed 
                      ? "bg-success/20 text-success" 
                      : "bg-destructive/20 text-destructive"
                  )}>
                    {test.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>

                {!test.isHidden && (
                  <div className="font-mono text-sm space-y-2 mt-3">
                    <div>
                      <span className="text-muted-foreground text-xs">Input:</span>
                      <pre className="bg-background/50 p-2 rounded mt-1">{test.input || 'None'}</pre>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Expected:</span>
                      <pre className="bg-background/50 p-2 rounded mt-1">{test.expected}</pre>
                    </div>
                    {!test.passed && (
                      <div>
                        <span className="text-destructive text-xs">Your Output:</span>
                        <pre className="bg-destructive/5 p-2 rounded mt-1 text-destructive">
                          {test.actual || '(no output)'}
                        </pre>
                      </div>
                    )}
                    {test.error && (
                      <div>
                        <span className="text-destructive text-xs">Error:</span>
                        <pre className="bg-destructive/5 p-2 rounded mt-1 text-destructive">
                          {test.error}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
