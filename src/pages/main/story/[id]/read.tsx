import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useDefault } from '@/contexts/Default';
import { useRouter } from 'next/router';
import { Button, Divider, Pagination, PaginationItem } from '@mui/material';
import Slider from 'react-slick';
import { Casino, SportsMma, TipsAndUpdates, AutoAwesome, Bolt, KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft } from '@mui/icons-material';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const icons: Record<any, JSX.Element> = {
    luck: <Casino />,
    strength: <SportsMma />,
    intelligence: <TipsAndUpdates />,
    charisma: <AutoAwesome />,
    energy: <Bolt />
}

interface ReadProps {
    read: {
        chapter: string;
        pages: PagesType[];
        characters: CharacterType[],
        name: string;
        abilities: AbilitiesType;
        page: number;
        chapterName: string;
        allowedChapters: string[];
        currentChapter: string;
    } | null,
    err: string | null
}


type PagesType = {
    content: ContentType[];
    options?: OptionsType[]
    importance?: boolean;
    question?: string;
}

type ContentType = {
    character: number;
    text: string;
}

type OptionsType = {
    text: string;
    goTo?: string;
    cost: AbilitiesType;
    earn: AbilitiesType;
}

type CharacterType = {
    name: string;
    image: string;
    color: string;
}

type AbilitiesType = {
    luck?: number;
    strength?: number;
    intelligence?: number;
    charisma?: number
    energy?: number
}

const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
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


export default function ({ read, err }: ReadProps) {
    const { colors, server } = useDefault()
    const router = useRouter();
    const params = router.query
    const pageParams = read?.pages[params.page as unknown as number - 1]
    const { data: session } = useSession();


    if (err) {
        return (
            <>{err}</>
        )
    }


    const [page, setPage] = useState<PagesType | undefined>(pageParams)

    useEffect(() => {
        setPage(read?.pages[params.page as unknown as number - 1])
    }, [params.page])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router])



    const handlePage = async (req: boolean, abilities: AbilitiesType[] | null, goTo: string | null) => {
        try {
            const chapter = goTo ? goTo : params.chapter
            const newPage = goTo ? 1 : Number(params.page) + 1
            if (!req) {
                router.push(`/main/story/${params.id}/read?chapter=${chapter}&page=${newPage}`, undefined, { shallow: true })
                return;
            }
            let newAbilities = { ...read?.abilities }
            if (abilities != null) {
                const decrease: keyof AbilitiesType = Object.keys(abilities[0])[0] as keyof AbilitiesType;
                const increase: keyof AbilitiesType = Object.keys(abilities[1])[0] as keyof AbilitiesType;
                const decreaseValue: number = Number(read?.abilities[decrease]) - Number(abilities[0][decrease]);
                const increaseValue: number = Number(read?.abilities[increase]) + Number(abilities[1][increase]);
                newAbilities = { ...newAbilities, [increase]: increaseValue, [decrease]: decreaseValue }
            }
            const response = await axios.put(`${server}/story/changePage`, {
                username: session?.user.username,
                id: params.id,
                page: newPage,
                abilities: newAbilities,
                chapter: chapter
            })
            if (response?.data?.success) {
                if (read?.abilities) {
                    read.abilities = newAbilities;
                    read.page = newPage;
                }
                if (chapter == params.chapter) {
                    router.push(`/main/story/${params.id}/read?chapter=${chapter}&page=${newPage}`, undefined, { shallow: true })
                } else {
                    router.push(`/main/story/${params.id}/read?chapter=${chapter}&page=${newPage}`, undefined, { shallow: false })
                }
            } else {
                new Error(response?.data?.data)
            }
        } catch (err: any) {
            console.log(err)
        }
    }


    return (
        <div className='w-full second main-color-oposite p-[calc(3vw)] flex items-start justify-around'>
            <div className='mx-8 w-[calc(65%)] main flex items-start justify-start flex-col text-xl shadow-2xl rounded-lg p-4 text-justify'>
                <div className='w-full text-center text-2xl font-semibold mt-4'>{read?.name}</div>
                <div className='w-full text-center text-2xl font-semibold mt-4'>{read?.chapterName}</div>
                <Divider orientation="horizontal" flexItem sx={{ bgcolor: colors[1], width: "100%", height: 2, my: 4 }} />
                {page?.content.map((content, index) => {
                    return (
                        <>
                            {content.character === -1 ? (
                                <div style={{ textIndent: '40px' }}>{content.text}</div>
                            ) : (
                                <div style={{ color: `${read?.characters[content.character].color}`, textIndent:'40px' }}>
                                    {read?.characters[content.character].name}:{" ─ "}
                                    {content.text}
                                </div>
                            )}
                        </>
                    )
                })}
                <div className='w-full mt-4'>
                    {page?.question != null ? (
                        <>
                            {page?.importance ? (
                                <>
                                    <div className='w-full text-center py-2 my-2'>{page?.question}</div>
                                    <div className='w-full flex items-center justify-around flex-wrap'>
                                        {page?.options?.map((option: OptionsType, index: number) => {
                                            return (
                                                <Button sx={{
                                                    width: "40%", m: 2, p: 1, textAlign: "center", borderRadius: "8px",
                                                    color: colors[1], bgcolor: colors[2], fontSize: "18px", fontWeight: 600,
                                                }} onClick={() => handlePage(true, null, option.goTo || null)} disabled={params?.page !== read?.page && read?.currentChapter != read?.chapter} >
                                                    {option.text}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='w-full text-center py-2 my-2'>{page?.question}</div>
                                    <div className='w-full flex items-center justify-around flex-wrap'>
                                        {page?.options?.map((option: OptionsType, index: number) => {
                                            let disable = false;
                                            if (option?.cost) {
                                                type AbilityKey = keyof AbilitiesType;
                                                const ability: AbilityKey = Object.keys(option?.cost)[0] as AbilityKey;
                                                const userValue: any = read?.abilities[ability];
                                                const cost = Object.entries(option?.cost)[0][1];
                                                if (userValue < cost) disable = true;
                                            }
                                            return (
                                                <Button sx={{
                                                    width: "40%", m: 2, p: 1, textAlign: "center", borderRadius: "8px",
                                                    color: colors[1], bgcolor: colors[2], fontSize: "18px", fontWeight: 600,
                                                    '&:disabled': { color: colors[1], bgcolor: colors[2], opacity: 0.7 }
                                                }}
                                                    disabled={(params?.page !== read?.page && read?.currentChapter !== params.chapter) || disable}
                                                    onClick={() => option.cost && option.earn ? handlePage(true, [option.cost, option.earn], null) : handlePage(true, null, null)}
                                                    key={index}
                                                >
                                                    {option.text}
                                                    <div className='flex items-center justify-center ml-2' key={index}>
                                                        {option?.cost ?
                                                            Object.entries(option?.cost || { null: 0 }).map(([ability, value]: [string, number], index: number) => (
                                                                <>{icons[ability]}{value}</>
                                                            )) : (
                                                                <div className='mr-2'>─</div>
                                                            )}
                                                    </div>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className='w-full flex items-center justify-around p-2'>
                            {Number(params.page) !== 1 && (
                                <Button sx={{
                                    color: colors[1], my: 2, fontWeight: 600, fontSize: "18px", borderColor: colors[1],
                                    ":hover": { borderColor: colors[1] }, borderRadius: "12px"
                                }} onClick={() => router.push(`/main/story/${params.id}/read?chapter=${params.chapter}&page=${Number(params.page) - 1}`, undefined, { shallow: true })}
                                    variant='outlined' startIcon={<KeyboardDoubleArrowLeft />}
                                >
                                    Pagina precedenta
                                </Button>
                            )}
                            {read?.pages?.length && Number(params.page) < read?.pages?.length && (
                                <Button sx={{
                                    color: colors[1], my: 2, fontWeight: 600, fontSize: "18px", borderColor: colors[1],
                                    ":hover": { borderColor: colors[1] }
                                }} onClick={() => handlePage(read?.page === Number(params.page) && read?.currentChapter === params.chapter, null, null)}
                                    variant='outlined' endIcon={<KeyboardDoubleArrowRight />}
                                >
                                    Pagina urmatoare
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                {params.chapter?.includes("ending") && (
                    <>
                        <div className='w-full text-center text-5xl my-4' style={{ fontFamily: "Shrikhand, serif" }}>~Sfarsit~</div>
                    </>
                )}
            </div>
            <div className='main h-[calc(100vh-168px)] w-[calc(25%)] flex items-center justify-between flex-col rounded-lg shadow-xl sticky right-0 top-28'>
                <div className='w-full text-center text-2xl font-semibold mt-4'>Abilitati</div>
                <Divider orientation="horizontal" flexItem sx={{ bgcolor: colors[1], width: "calc(100% - 30px)", height: 2, m: 2 }} />
                <div className='w-full flex items-center flex-col justify-center flex-wrap'>
                    {Object.entries(read?.abilities || {}).map(([ability, value]: [string, number], index: number) => (
                        <div className='flex items-center justify-between w-56'>
                            <div className='text-center first-letter:uppercase mr-1 font-semibold'>{ability}:{" "}</div>
                            <Button sx={{
                                width: "90px", m: "8px", fontSize: "16px", fontWeight: 600, color: colors[1],
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                border: "1px solid", borderColor: colors[1], ":hover": { borderColor: colors[1] }, borderRadius: "8px"
                            }}>
                                {icons[ability]}:{" "}{value}
                            </Button>
                        </div>
                    ))}
                </div>
                <div className='w-full text-center text-2xl font-semibold mt-4'>Personaje</div>
                <Divider orientation="horizontal" flexItem sx={{ bgcolor: colors[1], width: "calc(100% - 30px)", height: 2, mx: 2 }} />
                <div className='w-full overflow-hidden'>
                    <Slider {...settings} className='read-slide'>
                        {read?.characters.map((character, index) => {
                            return (
                                <div className='read-content'>
                                    <div className='w-28 aspect-square m-4'>
                                        <img src={character.image} alt={character.name} style={{ backgroundColor: character.color }} className='rounded' />
                                        <div className='font-semibold w-full text-center'>{character.name}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
                <Pagination count={read?.pages?.length} variant="outlined" page={Number(params.page)}
                    sx={{
                        color: colors[1], display: "flex", alignItems: "center", justifyContent: "center", my: 2,
                        '.MuiPaginationItem-page.MuiPaginationItem-page.Mui-selected': {
                            borderColor: 'primary.main',
                        },
                        '.MuiPaginationItem-page.MuiPaginationItem-page': {
                            borderColor: colors[1],
                            color: colors[1],
                        },
                        '& .MuiPaginationItem-root': {
                            color: colors[3],
                            borderColor: colors[3],
                        },
                    }} onChange={(e: any, value: number) => router.push(`/main/story/${params.id}/read?chapter=${params.chapter}&page=${value}`, undefined, { shallow: true })}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            disabled={
                                (item.type === 'previous' && Number(params.page) === 1) ||
                                (item.type === 'next' && Number(params.page) === read?.pages?.length) ||
                                (item?.page != null && read?.page != undefined && item?.page > read?.page && read.currentChapter === read.chapter)
                            }
                        />
                    )}
                />
                <div className=''>Capitol</div>
                <select style={{ color: colors[0] }}
                    onChange={e => router.push(`/main/story/${params.id}/read?chapter=${e.target.value}&page=1`)}
                    className="border-none  py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none mb-2"
                    value={params.chapter}
                >
                    {read?.allowedChapters.map((chapter: string, index: number) => (
                        <option className='border-0' value={chapter}>
                            {chapter}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps<ReadProps> = async (context) => {
    const { chapter, page, id } = context.query
    const session = await getSession(context);

    try {
        if (chapter && page) {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/story/read`, {
                chapter: chapter,
                page: page,
                username: session?.user.username,
                id: id
            })
            if (response?.data?.success) {
                return {
                    props: {
                        read: {
                            chapter: chapter as string,
                            pages: response?.data?.data?.pages,
                            characters: response?.data?.characters,
                            name: response?.data?.name,
                            abilities: response?.data?.abilities,
                            page: response?.data?.page,
                            chapterName: response?.data?.data?.name,
                            allowedChapters: response?.data?.allowedChapters,
                            currentChapter: response?.data?.chapter
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
