import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commit } from '../models/commit.model';
import { Repository } from '../models/repository.model';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  getRepositoriesByUsername(username: string) {
    return this.http.get<Repository[]>('https://api.github.com/users/' + username + '/repos');
  }

  getCommitsByRepositoryName(username:string, repositoryName: string){
    return this.http.get<Commit[]>('https://api.github.com/repos/'+ username + '/'+ repositoryName +'/commits');
  }

  getRepositoryByName(username:string, repositoryName: string){
    return this.http.get<Repository>('https://api.github.com/repos/'+ username + '/'+ repositoryName);
  }

}
