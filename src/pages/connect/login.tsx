import React, { useState, FormEvent } from 'react'
import { useDefault } from '@/contexts/Default'
import axios from 'axios'
import { signIn } from 'next-auth/react';
import { IconButton, OutlinedInput, InputLabel, FormControl, InputAdornment,TextField, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Theme from '@/components/Theme';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
    const { server, setError, colors, dark } = useDefault()
    const [login, setLogin] = useState({
        email: '',
        pass: '',
        username: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)


    const handleLogin = async () => {
        try {
            setLoading(true)
            const { username, pass, email } = login
            const response = await axios.post(`${server}/login/login`, {
                username: username,
                password: pass,
                email: email
            })
            if (!response?.data?.success) {
                setError(response?.data?.message)
            } else {
                await signIn('credentials', {
                    username,
                    email,
                    userRole: response?.data?.userRole
                });
                setLogin({
                    email: '',
                    pass: '',
                    username: '',
                })
            }
        } catch (err: any) {
            console.error(err);
            if (err.message === "Request failed with status code 403") {
                setError(err.response.data.data as string)
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`w-full h-screen flex items-center justify-center ocean ${dark ? "ocean-dark" : "ocean-light"}`}>
            <form className='flex flex-col items-center justify-center mx-4 p-20 rounded-3xl shadow-2xl main'
                onSubmit={(e: FormEvent) => { e.preventDefault(); handleLogin() }}
            >
                <div className='flex items-center justify-between w-full main-color-oposite'>
                    <div className='font-semibold text-2xl main-oposite' style={{ fontFamily: "Roboto" }}>Conectează-te</div>
                    <Theme />
                </div>
                <TextField id="filled-basic" label="Email" variant="outlined"
                    sx={{
                        my: 2, width: "300px", maxWidth: "100%", color: colors[0],
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${colors[1]}70`,
                            },
                            '&:hover fieldset': {
                                borderColor: colors[1],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: "primary.main"
                            },
                            '&:-webkit-autofill': {
                                backgroundColor: "red",
                            },
                        },
                    }} required type='email'
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    InputProps={{ style: { color: colors[1] }, inputProps: { maxLength: 40 } }}
                    InputLabelProps={{ style: { color: colors[1] } }}
                />
                <TextField id="filled-basic" label="Nume" variant="outlined"
                    sx={{
                        my: 2, width: "300px", maxWidth: "100%", color: colors[0],
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: `${colors[1]}70`,
                            },
                            '&:hover fieldset': {
                                borderColor: colors[1],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: "primary.main"
                            },
                            '&:-webkit-autofill': {
                                WebkitBoxShadow: `0 0 0 1000px ${dark ? '#121212' : '#ffffff'} inset`,
                                caretColor: colors[1],
                            },
                        },
                    }} required type='text'
                    onChange={(e) => setLogin({ ...login, username: e.target.value })}
                    InputProps={{ style: { color: colors[1] }, inputProps: { minLength: 6, maxLength: 20 } }}
                    InputLabelProps={{ style: { color: colors[1] } }}
                />
                <FormControl sx={{
                    my: 2, width: "300px", maxWidth: "100%", color: colors[0],
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: `${colors[1]}70`,
                        },
                        '&:hover fieldset': {
                            borderColor: colors[1],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: "primary.main",
                        },
                        '&:-webkit-autofill': {
                            WebkitBoxShadow: `0 0 0 1000px ${dark ? '#121212' : '#ffffff'} inset`,
                            caretColor: colors[1],
                        },
                    },
                }} variant="outlined">
                    <InputLabel required style={{ color: colors[1] }}>
                        Parolă
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        onChange={(e) => setLogin({ ...login, pass: e.target.value })}
                        type={showPassword ? 'text' : 'password'}
                        required
                        style={{ color: colors[1] }}
                        inputProps={{ minLength: 6, maxLength: 40 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((show) => !show)}
                                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                                    edge="end"

                                >
                                    {showPassword ?
                                        <Visibility style={{ color: colors[1] }} />
                                        :
                                        <VisibilityOff style={{ color: colors[1] }} />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <LoadingButton type='submit' variant="outlined" loading={loading}
                    loadingIndicator={<CircularProgress size={30} />}
                    sx={{
                        bgcolor: colors[1], color: colors[0], height: "45px", width: "300px", maxWidth: "100%",
                        boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                        '&:hover': {
                            bgcolor: `${colors[1]}df`
                        }, fontSize: "18px", fontWeight: "bold", borderRadius: "8px", my: 2
                    }}
                >
                    <span>Conectare</span>
                </LoadingButton>
                <div className='main-color-oposite'>
                    Nu ai un cont?
                    <Link href='/connect/register' className='underline ml-2 text-lg' style={{color:"#711DB0"}}>
                        Crează unul
                    </Link>
                </div>
            </form>
        </div >
    )
}