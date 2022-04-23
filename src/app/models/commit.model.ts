export class Commit {
  constructor(
    public id: string,
    public commit: {
      message: string,
      date: Date,
      committer: {
        name: string
      }
    }) { }
}
