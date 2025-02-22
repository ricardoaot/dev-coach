export const cleanText = (markdown: string) => {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[⬆ Volver a índice\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/https?:\/\/[^\s]+/g, "")
    .trim();
};
