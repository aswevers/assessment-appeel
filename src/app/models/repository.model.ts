import { Commit } from "./commit.model";

export class Repository {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public language: string,
    public commits: Commit[],
    public commitsCount:string) { }
}
