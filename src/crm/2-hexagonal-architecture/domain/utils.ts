// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Precondition {
  static requires(condition: boolean) {
    if (!condition) throw new Error("A precondition was not satisfied.");
  }
}
