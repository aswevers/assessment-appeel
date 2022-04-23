import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Repository } from 'src/app/models/repository.model';
import {RepositoryService} from 'src/app/services/repository.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;

  repositories = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description', 'commitsCount'];
  sortedData: Repository[];
  searchCtrl = new FormControl();

  constructor(private repositoryService: RepositoryService){
  }

  ngOnInit() {
    this.repositoryService.getRepositoriesByUsername('aswevers').subscribe(result => {
      result.forEach(element => {
        this.repositoryService.getAllCommitsByRepositoryName('aswevers', element.name).subscribe(commits => {
          element.commitsCount = commits.length.toString();
        });

      });
      this.repositories = new MatTableDataSource(result);


    });
    this.searchForm = new FormGroup({
      searchString: new FormControl()
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.repositories.sort = this.sort;
  }

  search(){
    let textFilter = this.searchForm.get('searchString').value;
    this.repositoryService.getRepositoriesByUsername(textFilter).subscribe(result => {
      result.forEach(element => {
        this.repositoryService.getAllCommitsByRepositoryName(textFilter, element.name).subscribe(commits => {
          element.commitsCount = commits.length.toString();
        });

      });
      this.repositories = new MatTableDataSource(result);


    });
    return textFilter;
  }

}
