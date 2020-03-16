import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBlogComponent } from './home-blog/home-blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { BlogRoutingModules } from './blog-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { RouterModule } from '@angular/router';
import { SlideshowModule } from 'ng-simple-slideshow';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbdModalComponent, NgbdModalContent } from 'app/components/modal/modal.component';

@NgModule({
  declarations: [HomeBlogComponent, DetailBlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModules,
    FormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    SlideshowModule,
    JwBootstrapSwitchNg2Module
  ],
  // entryComponents: [NgbdModalComponent],
  exports: [HomeBlogComponent]
})
export class BlogModule { }
