declare module '@nju33/hai' {
  export interface HaiTalkButtonCallbackFunction {
    (next: (answer: any) => void, names: Record<string, string>): void
    (
      next: (answer: any) => void,
      names: Record<string, string>,
      actions: { cancel: () => void; done: () => void }
    ): void
  }

  export type HaiTalkButton = [string, HaiTalkButtonCallbackFunction]

  export type HaiTalkConvenient = [string, string]

  export interface HaiTalk<Name extends string = string> {
    button: HaiTalkButton[]
    convenient?: HaiTalkConvenient[]
    message: string
    name: Name
  }

  declare class Hai<Answers extends object> {
    static config: { theme: 'dark' | 'light' }

    constructor(private readonly talks: Array<HaiTalk<keyof Answers>>) {}

    open(element: Element): Promise<Answers>
  }

  export default Hai
}
