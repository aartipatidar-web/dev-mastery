import { Problem } from '@/data/problems';
import { cn } from '@/lib/utils';
import { Tag, Lightbulb } from 'lucide-react';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  // Simple markdown-like rendering
  const renderDescription = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-foreground mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.trim() === '') {
        elements.push(<br key={index} />);
      } else {
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/g);
        const formatted = parts.map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className="px-1.5 py-0.5 bg-muted rounded text-primary font-mono text-sm">
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        });
        
        elements.push(
          <p key={index} className="text-muted-foreground mb-2 leading-relaxed">
            {formatted}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <div className="h-full overflow-y-auto overscroll-contain p-4 sm:p-6" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Difficulty & Tags */}
      <div className="flex items-center gap-3 mb-4">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold",
          problem.difficulty === 'easy' && "bg-success/10 text-success",
          problem.difficulty === 'medium' && "bg-warning/10 text-warning",
          problem.difficulty === 'hard' && "bg-destructive/10 text-destructive"
        )}>
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
        
        <div className="flex items-center gap-2">
          {problem.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none">
        {renderDescription(problem.description)}
      </div>

      {/* Input/Output Format */}
      <div className="mt-6 space-y-4">
        <div className="bg-secondary/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Input Format</h3>
          <p className="text-sm text-muted-foreground">{problem.inputFormat}</p>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Output Format</h3>
          <p className="text-sm text-muted-foreground">{problem.outputFormat}</p>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          Examples
        </h3>
        
        <div className="space-y-4">
          {problem.examples.map((example, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-secondary/30 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground">Example {index + 1}</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">Input:</span>
                  <pre className="font-mono text-sm text-foreground bg-background/50 p-2 rounded mt-1">
                    {example.input}
                  </pre>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Output:</span>
                  <pre className="font-mono text-sm text-foreground bg-background/50 p-2 rounded mt-1">
                    {example.output}
                  </pre>
                </div>
                {example.explanation && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">Explanation:</span>
                    <p className="text-sm text-foreground mt-1">{example.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
