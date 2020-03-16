import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog-services/blog.service';
import { Article, User } from 'app/model/blog.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  id: string;
  ocus: any;
  focus1: any;
  user: User;
  article: Article;
  articles: Article;
  username: string;
  catrgories: String[] = ['Home', 'Snorkeling', 'Island', 'Travel Tips', 'Travel Planning', '10 Recomended island'];
  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    debugger
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.GetArticle(1).subscribe(response => {
      this.article = response;
      const date = new Date(this.article.created_date);
      this.article.created_date = date;

      this.get_user(this.article.created_by);
      this.getArticleByCategorys(this.article.category_travel);
      this.getCategoryByIds(this.article);
    })
  }

  getCategoryByIds(element) {
    this.blogService.GetCategoryByIds(element.category_travel).subscribe(response => {
      element.category_travel = response;
    })
  }
  get_user(username) {
    this.blogService.GetUser(username).subscribe(response => {
      this.user = response;
    })
  }

  getArticleByCategorys(category_travels) {
    this.blogService.GetArticleByCategorys(category_travels).subscribe(response => {
      this.articles = response;
      console.log(this.articles);
    })
  }

}
