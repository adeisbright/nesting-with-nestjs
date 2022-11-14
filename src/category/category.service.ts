import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat, CatDocument } from "./cat.schema";
import ICategory from "./category.interface";

@Injectable() 

export class CategoryService {
    constructor(
        @InjectModel(Cat.name)
        private catModel: Model<CatDocument>
    ){}
    private readonly categories : ICategory[] = []
    getCategories() : ICategory[] {
        return this.categories
    }

    async getCats(): Promise<Cat[]>{
        return await this.catModel.find()
    }

    async addCat(cat: Cat): Promise<Cat> {
        const smallCat = new this.catModel(cat)
        //return await this.catModel.create(cat)
        return smallCat.save()
    }
}