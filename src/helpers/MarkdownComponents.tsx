import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownComponents: Components = {
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
        {String(children).trim()}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-300 px-1.5 py-0.5 rounded font-mono text-sm text-sky-600">
        {children}
      </code>
    );
  },
  a: ({ href, children }) => {
    if (String(children).includes("⬆ Volver a índice")) return null;
    return <a href={href}>{children}</a>;
  },
};

export default MarkdownComponents;
