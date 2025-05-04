import React from "react";
import "./ProductList.css";
import { useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        price: 100
    },
    {
        id: 2,
        title: 'Product 2',
        description: 'Description 2',
        price: 200
    },
    {
        id: 3,
        title: 'Product 3',
        description: 'Description 3',
        price: 300
    },
];

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded){
            newItems = addedItems.filter(item => item.id !== product.id);
        }
        else {
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems);

        if(newItems.length === 0){
            tg.MainButton.hide();
        }
        else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item=>(
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
}

export default ProductList;