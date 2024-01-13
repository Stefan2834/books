import React from 'react';
import { useDefault } from '@/contexts/Default';
import Slide from '@/components/Slide';

export default function Index() {
    const { colors } = useDefault()


        
    const books = [{
        name: "Aventura exploratorului pierdut",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Angel",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Padurea bantuita",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Garfield",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Castelul fermecat",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rocky",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Focul de tabara",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sammy",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Spiridusul amuzant",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Cleo",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Casuta din padure",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bandit",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Cei 3 magicieni",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Annie",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Copilul abandonat",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucy",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Bagheta magica",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Buster",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Cersetorul pierdut",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Socks",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Comoara cu nestemate",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }, {
        name: "Furnica si greierele",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Cookie",
        author: "Mirel",
        price: 100,
        _id:"659e8c0bfeef9aa936164621"
    }
    ]

    return (
        <div className='w-full second main-color-oposite flex flex-col items-center justify-start px-24 py-8'>
            <Slide books={books} name={"Cumparate"} />
            <Slide books={books} name={"Amuzament"} />
            <Slide books={books} name={"Gratis"} />
        </div>
    );
};
