import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'app/services/blog-services/blog.service';
import { Article } from 'app/model/blog.model';
@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    btnClass: String;
    catrgories: String[] = ['Home'];
    date: {year: number, month: number};
    model: NgbDateStruct;
    result: Array<Article>;
   

    constructor( private renderer : Renderer, private blogService: BlogService) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        this.blogService.GetArticles().subscribe(response => {
            this.result = response;
            this.result.forEach(element => {
                var date =new Date(element.created_date);
                element.created_date = date;
                this.getCategoryByIds(element);
            });
            
        })

        this.getCategoryMasterData();
        
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    getCategoryByIds(element){
        this.blogService.GetCategoryByIds(element.category_travel).subscribe(response => {            
            element.category_travel = response[0];
        })
    }

    getCategoryMasterData(){
        this.blogService.GetCategory(0,4).subscribe(response => {            
            response.forEach(element => {
                this.catrgories.push(element.category_name);
            });
            // this.catrgories.push("")
        })
    }

}
