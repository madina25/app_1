import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {Routes, RouterModule} from "@angular/router";

import {AppComponent}   from './app.component';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CommonModule} from "@angular/common";
import {BoldDirective} from "./bold.directive";
import {MatrixComponent} from "./matrix/matrix.component";

//определение маршрутов
const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'matrix', component: MatrixComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports:      [CommonModule, BrowserModule, FormsModule, RouterModule.forRoot(appRoutes, {useHash:true})],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        MatrixComponent,
        NotFoundComponent,
        BoldDirective
    ],
    bootstrap:    [AppComponent],
    exports: [RouterModule]
})

export class AppModule { }