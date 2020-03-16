import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBlogComponent } from './home-blog/home-blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';

const routes: Routes = [
    { path: 'blog', component: HomeBlogComponent, data: { animation: 'blog' } },
    { path: 'blog/:category', component: HomeBlogComponent, data: { animation: 'blog' } },
    { path: 'blog-detail/:id', component: DetailBlogComponent, data: { animation: 'blog-detail' } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BlogRoutingModules { }