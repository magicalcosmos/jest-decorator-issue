export interface Log {
  isGoOn?(num: number): boolean
  completeTime?(data: number): string
  getLogTime?(): string
  log?(...data: any): void
  info?(...data: any): void
  warn?(...warning: any): void
  trace?(): void
  error?(...error: any): void
  table?(...data: any): void
}
