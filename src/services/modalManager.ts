// modalManager.ts
let openSwapModalFn: ((warning: string, data: any) => Promise<boolean>) | null = null;

export function registerSwapModalOpener(fn: (warning: string, data: any) => Promise<boolean>) {
  openSwapModalFn = fn;
}

export function openSwapModal(warning: string, data: any): Promise<boolean> {
  if (!openSwapModalFn) {
    return Promise.resolve(true); // Default fallback if modal not loaded
  }
  return openSwapModalFn(warning, data);
}
