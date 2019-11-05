export class Product{
    public id: number;
    public name: string;
    public price: string;
    public imgPath: string;

    constructor(id: number, name:string, price:string, imagePath:string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgPath = imagePath;

    }
}