import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {Item} from "./home";

@Component({
    selector: 'home-app',
    templateUrl: 'home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit{

    items: Item [] = [];
    constructor(private dataService: HomeService){}

    addItem(text: string, price: number, number: number): void {

        this.dataService.addData(text, price, number);
    }
    ngOnInit(){
        this.items = this.dataService.getData();
    }
}