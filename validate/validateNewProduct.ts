import {INewProduct} from "../models/app.interfaces";

export default function validateNewAccount(product: INewProduct) {
    let errors: Partial<INewProduct> = {};

    if (!product.name) {
        errors.name = "Name is required";
    }

    if (!product.company) {
        errors.company = "Company is required";
    }

    if (!product.url) {
        errors.url = "The product url is required"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(product.url)) {
        errors.url = "The product url is not valid"
    }

    if (!product.description) {
        errors.description = "The description is required"
    }

    return errors;
}
