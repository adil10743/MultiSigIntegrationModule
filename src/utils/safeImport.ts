export function safeImport(path: string): string | undefined {
    try {
      return new URL(path, import.meta.url).href;
    } catch {
      console.warn(`Image not found: ${path}`);
      return undefined;
    }
  }
  