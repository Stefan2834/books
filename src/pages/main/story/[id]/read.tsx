import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useDefault } from '@/contexts/Default';
import { useRouter } from 'next/router';

interface ReadProps {
    read: {
        chapter: string;
        pages: PagesType[];
        characters: CharacterType[]
    } | null,
    err: string | null
}


type PagesType = {
    content: ContentType[];
    options: OptionsType[]
    importance?: boolean;
    question?: string;
}

type ContentType = {
    character: number;
    text: string;
}

type OptionsType = {
    text: string;
    ability?: string;
    change?: number;
    goTo?: string;
}

type CharacterType = {
    name: string;
    avatar: string;
    color: string;
}


export default function ({ read, err }: ReadProps) {
    const { colors } = useDefault()
    const router = useRouter();
    const params = router.query
    const pageParams = read?.pages[params.page as unknown as number]

    if (err) {
        return (
            <>{err}</>
        )
    }


    const [page, setPage] = useState<PagesType | undefined>(pageParams)

    useEffect(() => {
        setPage(read?.pages[params.page as unknown as number])
    }, [params.page])



    console.log(page)
    return (
        <div className='w-full second main-color-oposite p-[calc(3vw)] flex items-stretch justify-stretch'>
            <div className='mx-8 h-screen main flex items-center justify-start flex-col flex2'>
                {page?.content.map((content, index) => {
                    return (
                        <>{content.text}</>
                    )
                })}
            </div>
            <div className='h-screen main flex1 flex items-center justify-center'>
                <div className='w-64 h-full bg-red-400 flex items-center justify-start flex-col'>
                    {read?.characters.map((character, index) => {
                        return (
                            <>
                                {character.name}{", "}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps<ReadProps> = async (context) => {
    const { chapter, page, id } = context.query

    try {
        if (chapter && page) {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/story/read`, {
                chapter: chapter,
                page: page,
                username: "Stefan",
                id: id
            })
            if (response?.data?.success) {

                return {
                    props: {
                        read: {
                            chapter: chapter as string,
                            pages: response?.data?.data,
                            characters: response?.data?.characters
                        },
                        err: null
                    },
                };
            } else {
                return {
                    props: {
                        read: null,
                        err: response?.data?.data,
                    },
                };
            }
        } else {
            return {
                props: {
                    read: null,
                    err: "Link-ul nu este valid",
                    pages: null
                },
            };
        }
    } catch (err: any) {
        return {
            props: {
                read: null,
                err: err?.response?.data?.data || err?.response?.data || "A aparut o eroare"
            },
        }
    }
}
