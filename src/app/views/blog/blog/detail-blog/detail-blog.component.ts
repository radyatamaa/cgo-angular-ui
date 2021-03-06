import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog-services/blog.service';
import { Article, User } from 'app/model/blog.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  id: string = null;
  recomendedArticleId: string = null;
  ocus: any;
  focus1: any;
  user: User;
  article: Article;
  articles: Array<Article>;
  username: string;
  category: string;
  catrgories: String[] = ['Home', 'Snorkeling', 'Island', 'Travel Tips', 'Travel Planning', '10 Recomended island'];
  constructor(private router: Router,private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this.id == null)
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.GetArticle(this.id).subscribe(response => {
      this.article = response;
      const date = new Date(this.article.created_date);
      this.article.created_date = date;
      debugger

      this.get_user(this.article.created_by);
      this.getArticleByCategorys(this.article.category_travel);
      this.getCategoryByIds(this.article);
    })
  }
  gotoDetails(articleId: any) {
    this.router.navigate(['/blog-detail/', articleId]);
    this.id = articleId;
    this.ngOnInit();
  }

  gotoArticleByCategory(category){
    this.router.navigate(['/blog/', category]);
  }
  getCategoryByIds(element) {
    this.blogService.GetCategoryByIds(element.category_travel).subscribe(response => {
      element.category_travel = response;
      this.category = element.category_travel[0].category_name;
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
    })
  }

}
