import React from 'react'
import { useDefault } from '@/contexts/Default';
import { Divider, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import money from '../svg/light/paper-money-two.svg'
import moneyDark from '../svg/dark/paper-money-two.svg'


export default function Slide({ books, name }: { books: { name: string; }[], name: string }) {
    const { colors, dark } = useDefault()
    const router = useRouter()

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],

    };

    return (
        <div className="main w-full h-auto items-center justify-center p-4">
            <div className='text-2xl font-semibold m-2'>
                {name}
            </div>
            <Divider orientation="horizontal" flexItem sx={{ backgroundColor: colors[1], width: "100%", height: 2, opacity: "0.7" }} />
            <Slider {...settings}>
                {books.map((book: any, index: number) => {
                    return (
                        <div key={index} className='slick-content'>
                            <Button style={{ width: "350px", height: "100%" }}
                                sx={{
                                    color: colors[1], display: "flex", flexDirection: "column", alignItems: "center",
                                    justifyContent: "space-between", borderRadius: "10px", p: 0, m: 1,
                                    boxShadow: "0px 4px 4px 1px rgba(0, 0, 0, 0.25)"
                                }}
                                onClick={() => router.push(`main/story/${book._id}`)}
                            >
                                <div className='w-full h-72 second rounded-tl-lg rounded-tr-lg'>
                                    <img src={book.avatar} className='w-full h-full object-contain' />
                                </div>
                                <Divider orientation="horizontal" flexItem sx={{ bgcolor: "primary.main", width: "100%", height: 2 }} />
                                <div className='w-full h-32 second flex flex-col items-center justify-between px-4 rounded-bl-lg rounded-br-lg'>
                                    <div className='flex justify-between items-start h-full w-full'>
                                        <div className='font-semibold text-2xl mt-2 text-left'>{book.name}</div>
                                    </div>
                                    <div className='flex items-center justify-between w-full mb-2'>
                                        <div className='text-lg'><span className='font-semibold'>De: </span>{book.author}</div>
                                        <div className='flex items-center justify-center'>
                                            <Image src={dark ? moneyDark : money} alt='Poza' width='30' height='30' />
                                            <div className='ml-1 font-semibold'>{book.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
