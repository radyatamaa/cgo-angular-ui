import { Router } from '@angular/router';
import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'app/services/blog-services/blog.service';
import { Article, Category } from 'app/model/blog.model';
import { ActivatedRoute } from '@angular/router';
declare var $: any;


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
  id: string;
  result: Array<Article>;
  catrgories: Category[] = [{
    id:0,
    category_name:'Home'
  }];

  constructor(private router: Router, private blogService: BlogService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    debugger
    $('#slider').slick({
      centerMode: true,
      centerPadding: '30px',
      slidesToShow: 1,
      infinite: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      fadeSpeed: 1000
    });
    if(this.id == null)
    this.id = this.activatedRoute.snapshot.paramMap.get('category');

    if(this.id != null && this.id != '0'){
      this.catrgories =  [{
        id:0,
        category_name:'Home'
      }];
      
      var ids = "[" + this.id + "]";
      this.blogService.GetArticleByCategorys(ids).subscribe(response => {
        this.result = response;
        this.result.forEach(element => {
          var date = new Date(element.created_date);
          element.created_date = date;
          this.getCategoryByIds(element);
        });
  
      })
    }else{
      this.catrgories =  [{
        id:0,
        category_name:'Home'
      }];
      this.blogService.GetArticles().subscribe(response => {
        this.result = response;
        this.result.forEach(element => {
          var date = new Date(element.created_date);
          element.created_date = date;
          this.getCategoryByIds(element);
        });
  
      })
    }
    
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

  gotoArticleByCategory(category){
    debugger
    this.router.navigate(['/blog/', category]);
    this.id = category;
    this.ngOnInit();
  }
  getCategoryByIds(element) {
    this.blogService.GetCategoryByIds(element.category_travel).subscribe(response => {
      element.category_travel = response[0];
    })
  }

  getCategoryMasterData() {
    this.blogService.GetCategory(0, 4).subscribe(response => {
      response.forEach(element => {
        var category = new Category();
        category.id = element.id;
        category.category_name = element.category_name;       
        this.catrgories.push(category);
      });
    })
  }

}
