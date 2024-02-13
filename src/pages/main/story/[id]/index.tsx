import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios';
import NotFound from '@/components/stories/NotFound';
import { Button, Divider } from '@mui/material';
import { useDefault } from '@/contexts/Default';
import { ShoppingCart, KeyboardDoubleArrowRight, AttachMoney } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';



interface StoryProps {
    story: StoryType | null,
    error: string | null
}

type StoryType = {
    name: string;
    description: string;
    characters: {
        name: string;
        image: string;
    }[],
    author: string;
    price: number;
    _id: string;
    reviews: {
        user: string;
        message: string;
        rating: number;
    }[];
    rating: number;
    reading: {
        page: number,
        chapter: string
    } | null,
}

export default function ({ story }: StoryProps) {
    const { colors, dark } = useDefault();
    const router = useRouter();

    if (story) {
        console.log(story)



        return (
            <div className='w-full flex flex-col h-full items-center justify-center second px-16 py-8 main'>
                <div className='main-color-oposite main w-full text-center font-semibold text-3xl p-4'>{story.name}</div>
                <div className='w-full h-full flex items-start main shadow-2xl relative'>
                    <div className={`w-1/2 m-8 p-4 main-color-oposite second shadow-xl ${dark ? 'shadow-dark' : 'shadow-xl'}`}>
                        <div className='w-full text-center text-2xl font-semibold mt-4'>Descriere</div>
                        <Divider orientation="horizontal" flexItem sx={{ bgcolor: colors[1], width: "100%", height: 2, my: 4 }} />
                        <img className="w-1/2 aspect-square object-cover m-4 float-right" src={story?.characters[0]?.image} />
                        <div className='text-justify first-letter-large'>
                            {story?.description}
                        </div>
                    </div>
                    <div className={`w-[calc(50%-64px)] m-8 p-4 h-[calc(100%-64px)] absolute top-0 right-0 img ${dark ? 'shadow-dark' : 'shadow-xl'}`} />
                    <div className='w-1/2 m-8 p-4 flex items-center justify-start flex-col main-color-oposite second shadow-xl sticky top-20'>
                        <div className='w-full text-center text-2xl font-semibold mt-4'>Detalii</div>
                        <Divider orientation="horizontal" flexItem sx={{ bgcolor: colors[1], width: "100%", height: 2, my: 4 }} />
                        <div className='flex items-center justify-center w-full h-full'>
                            <div className='w-1/2 h-full flex items-start flex-col justify-start'>
                                <div className='text-lg'>
                                    <span className='font-semibold'>Nume: </span>
                                    {story?.name}
                                </div>
                                <div className='text-lg'>
                                    <span className='font-semibold'>Autor: </span>
                                    {story?.author}
                                </div>
                                <div className='text-lg'>
                                    <span className='font-semibold'>Pret: </span>
                                    {story?.price}
                                    <AttachMoney />
                                </div>
                                <div className='text-lg'>
                                    <span className='font-semibold'>Rating: </span>
                                    {story?.rating}
                                </div>
                                <div className='text-lg'>
                                    <span className='font-semibold'>Personaje: </span>
                                    {story?.characters?.map((character, index: number) => {
                                        if (index === story?.characters?.length - 1) {
                                            return <>{character.name}</>
                                        } else return (
                                            <>
                                                {character.name},{" "}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='w-1/2 flex items-center justify-center'>
                                {story?.reading ? (
                                    <>
                                        {story?.reading.page === 1 && story?.reading?.chapter === "main" ? (
                                            <Button sx={{ color: colors[1], fontSize: "18px", fontWeight: "600", m: 0, borderColor: colors[1], ":hover": { borderColor: colors[1] } }}
                                                endIcon={<KeyboardDoubleArrowRight />}
                                                variant="outlined"
                                                onClick={() => router.push(`/main/story/${story._id}/read?chapter=main&page=1`)}
                                            >
                                                Incepe sa citesti
                                            </Button>
                                        ) : (
                                            <div className='flex flex-col'>
                                                <Button sx={{ color: colors[1], fontSize: "18px", fontWeight: "600", my: 1 }}
                                                    endIcon={<KeyboardDoubleArrowRight />}
                                                    variant="outlined"
                                                    onClick={() => router.push(`/main/story/${story._id}/read?chapter=${story?.reading?.chapter}&page=${story?.reading?.page}`)}
                                                >
                                                    Continua sa citesti
                                                </Button>
                                                {story.reading.chapter.includes("ending") && (
                                                    <Button sx={{ color: colors[1], fontSize: "18px", fontWeight: "600", my: 1 }}
                                                        endIcon={<KeyboardDoubleArrowRight />}
                                                        variant="outlined"
                                                        // onClick={() => router.push(`/main/story/${story._id}/read?chapter=main&page=${story?.reading?.page}`)}
                                                    >
                                                        Reseteaza povestea
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Button sx={{ color: colors[1], fontSize: "18px", fontWeight: "600", m: 0 }} endIcon={<ShoppingCart />} variant="outlined">
                                        Cumpara cartea
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-screen main mt-8 main-color-oposite'>
                    a
                </div>
            </div>
        )
    } else {
        return <NotFound />
    }
}


export const getServerSideProps: GetServerSideProps<StoryProps> = async (context) => {
    const { id } = context.query;
    const session = await getSession(context);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/story/${id}`, {
            username: session?.user?.username
        })
        const story: StoryType = response?.data?.data;
        story.reading = response?.data?.reading || null;
        const rating: number = Number((story?.reviews.reduce((sum: any, review: any) => sum + review.rating, 0) / story?.reviews.length).toFixed(2));
        story.rating = rating;
        if (response?.data?.success) {
            return {
                props: {
                    story: story,
                    error: null
                }
            }
        } else {
            return {
                props: {
                    story: null,
                    error: response?.data?.data || null
                }
            }
        }
    } catch (err: any) {
        return {
            props: {
                story: null,
                error: err?.response?.data?.data || null
            }
        }
    }
}