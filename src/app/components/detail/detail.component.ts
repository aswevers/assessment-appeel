import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commit } from 'src/app/models/commit.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Repository } from 'src/app/models/repository.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  searchForm: FormGroup;

  commits: Commit[];
  displayedColumns: string[] = ['message', 'date', 'committer'];
  repositoryName: string|null = '';
  username: string|null = '';
  filteredResults: any[] = [];
  searchCtrl = new FormControl();
  results: any;
  repository: Repository;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repositoryService: RepositoryService,
    private activated: ActivatedRoute) {}

  ngOnInit() {
    this.repositoryName = this.activated.snapshot.paramMap.get('repositoryName') ;
    this.username = this.activated.snapshot.paramMap.get('username') ;
    if(this.repositoryName) {
      this.repositoryService.getRepositoryByName(this.username, this.repositoryName).subscribe(result => {
        this.repository = result;
      });
      this.repositoryService.getCommitsByRepositoryName(this.username, this.repositoryName).subscribe(result => {
        this.commits = result;
        this.results = new MatTableDataSource(result);
        this.results.paginator = this.paginator;
      });
    }
    this.searchForm = new FormGroup({
      searchString: new FormControl()
    });
  }

  search(){
    let textFilter = this.searchForm.get('searchString').value;
    this.filteredResults = [];
    if(!textFilter){
      this.results = this.commits;
    } else {
      this.filteredResults.splice(0, this.results.length);
      this.commits.forEach(commit => {
        if (commit.commit.message.toLowerCase().includes(textFilter.toLowerCase()) || commit.commit.committer.name.toLowerCase().includes(textFilter.toLowerCase())) {
          this.filteredResults.push(commit);
        }
      });
      this.results = new MatTableDataSource(this.filteredResults);
    }
    return textFilter;
  }

  onTableScroll(e) {
    console.log('e');
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.results = this.results.concat(this.commits);
    }
  }

}
