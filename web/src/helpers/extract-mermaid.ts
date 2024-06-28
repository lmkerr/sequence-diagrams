import * as marked from 'marked';

const extractFirstMermaidBlock = async (
  filePath: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const markdown = event.target?.result;
        const tokens = marked.lexer(markdown);

        for (const token of tokens) {
          if (token.type === 'code' && token.lang === 'mermaid') {
            return token.text;
          }
        }

        resolve(null);
        
      } catch (error) {
        reject(error);
      }
    };
  });

  return null;
};

export { extractFirstMermaidBlock };
