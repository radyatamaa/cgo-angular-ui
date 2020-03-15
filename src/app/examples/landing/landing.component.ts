import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog-services/blog.service';
import { User, Article } from 'app/model/blog.model';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  user: User;
  article: Article;
  articles: Article;
  username: string;
  catrgories: String[] = ['Home', 'Snorkeling', 'Island', 'Travel Tips', 'Travel Planning', '10 Recomended island'];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    
  this.blogService.GetArticle(1).subscribe(response => {
    this.article = response;
    this.get_user(this.article.created_by);
    this.get_all_articles();
  })
  }

  get_user(username){
    this.blogService.GetUser(username).subscribe(response => {
      this.user = response;
  })
  }
  get_all_articles(){
    this.blogService.GetArticles().subscribe(response => {
      this.articles = response;
    })
  }
  

}
