export class Article {
    id: string;
    title: string;
    description: string;
    category_travel: string[];
    url_file: string;
    time: number;
    created_by: string;
    modified_by: string;
    created_date: string | Date;
    modified_date: string | Date;
    is_deleted: number;
    is_active: number;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.category_travel = [];
        this.url_file = '';
        this.time = 0;
        this.created_by = '';
        this.modified_by = '';
        this.created_date = new Date();
        this.modified_date = new Date();
        this.is_deleted = 0;
        this.is_active = 1;
    }
}

export class Category {
    id: number;
    category_name: string;

    constructor() {
        this.id = 0;
        this.category_name = '';
    }
}