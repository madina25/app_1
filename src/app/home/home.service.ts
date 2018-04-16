import {Item} from "./home";

export  class HomeService {
    private data: Item[] = [
        { number: 1, name: "Item1", done: false, price: 15.9 },
        { number: 2, name: "Item2", done: false, price: 60 },
        { number: 3, name: "Item3", done: true, price: 22.6 },
        { number: 4, name: "Item4", done: false, price:310 }
    ];

    getData(): Item [] {
        return this.data
    }

    addData(text: string, price: number, number: number): void {
        if(text==null || text.trim()=="" || price==null || number==null)
            return;
        this.data.push(new Item(number, text, price));
    }
}