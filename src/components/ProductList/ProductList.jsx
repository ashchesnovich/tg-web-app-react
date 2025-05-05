import React from "react";
import "./ProductList.css";
import { useState, useCallback, useEffect } from "react";
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
    {
        id: 4,
        title: 'Product 4',
        description: 'Description 4',
        price: 400
    },
    {
        id: 5,
        title: 'Product 5',
        description: 'Description 5',
        price: 500
    },
    {
        id: 6,
        title: 'Product 6',
        description: 'Description 6',
        price: 600
    },
    {
        id: 7,
        title: 'Product 7',
        description: 'Description 7',
        price: 700
    },
    {
        id: 8,
        title: 'Product 8',
        description: 'Description 8',
        price: 800
    },
    {
        id: 9,
        title: 'Product 9',
        description: 'Description 9',
        price: 900
    },
    {
        id: 10,
        title: 'Product 10',
        description: 'Description 10',
        price: 1000
    }
];

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
}

const ProductList = () => {
    
    const {tg, queryId} = useTelegram();
    const [addedItems, setAddedItems] = useState([]);

    const onSendData = useCallback(()=>{
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        fetch('https://87.228.39.236:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }, [queryId, addedItems])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return()=>{
            tg.offEvent('mainButtonClicked', onSendData)
        }
    },[tg, onSendData])

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