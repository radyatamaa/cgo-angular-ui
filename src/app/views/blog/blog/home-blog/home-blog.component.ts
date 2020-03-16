import { Router } from '@angular/router';
import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'app/services/blog-services/blog.service';
import { Article } from 'app/model/blog.model';

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.scss']
})
export class HomeBlogComponent implements OnInit {

  article = {
    id: 100,
    title: 'How to make router & navigation in Angular 8',
    author: 'Didin J.',
    description: 'A complete tutorial about creating router and navigation in the Angular 8 Web Application'
  };
  result: Array<Article>;
  catrgories: String[] = ['Home'];

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.GetArticles().subscribe(response => {
      this.result = response;
      this.result.forEach(element => {
        var date = new Date(element.created_date);
        element.created_date = date;
        this.getCategoryByIds(element);
      });

    })

    this.getCategoryMasterData();

    let input_group_focus = document.getElementsByClassName('form-control');
    let input_group = document.getElementsByClassName('input-group');
    for (let i = 0; i < input_group.length; i++) {
      input_group[i].children[0].addEventListener('focus', function () {
        input_group[i].classList.add('input-group-focus');
      });
      input_group[i].children[0].addEventListener('blur', function () {
        input_group[i].classList.remove('input-group-focus');
      });
    }
  }

  gotoDetails(articleId: any) {
    debugger
    this.router.navigate(['/blog-detail/', articleId]);
  }

  getCategoryByIds(element) {
    this.blogService.GetCategoryByIds(element.category_travel).subscribe(response => {
      element.category_travel = response[0];
    })
  }

  getCategoryMasterData() {
    this.blogService.GetCategory(0, 4).subscribe(response => {
      response.forEach(element => {
        this.catrgories.push(element.category_name);
      });
      // this.catrgories.push("")
    })
  }

}
