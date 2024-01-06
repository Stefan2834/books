import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import { useDefault } from '@/contexts/Default'
import { TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Theme from '@/components/Theme';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';


export default function Login() {
    const { server, setError, dark, colors, setSuccess } = useDefault()
    const [register, setRegister] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        username: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()



    const handleRegister = async () => {
        setLoading(true)
        const { username, email, pass, confirmPass } = register
        try {
            if (confirmPass !== pass) {
                setError("Password don't match")
                return
            }
            const response = await axios.post(`${server}/login/register`, {
                username: username,
                password: pass,
                email: email,
                avatar: ''
            })
            if (!response?.data?.success) {
                console.log(response)
                setError(response?.data?.message)
            } else {
                router.push("/connect/login")
                setSuccess('User register successfully')
            }
        } catch (err: any) {
            console.error(err)
            if (err.message === "Request failed with status code 409") {
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
                onSubmit={(e: FormEvent) => { e.preventDefault(); handleRegister() }}
            >
                <div className='flex items-center justify-between w-full main-color-oposite'>
                    <div className='font-semibold text-2xl main-oposite' style={{ fontFamily: "Roboto" }}>Înregistrează-te</div>
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
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
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
                    onChange={(e) => setRegister({ ...register, username: e.target.value })}
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
                        onChange={(e) => setRegister({ ...register, pass: e.target.value })}
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
                        Confirmă Parola
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        onChange={(e) => setRegister({ ...register, confirmPass: e.target.value })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        style={{ color: colors[1] }}
                        inputProps={{ minLength: 6, maxLength: 40 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowConfirmPassword((show) => !show)}
                                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                                    edge="end"

                                >
                                    {showConfirmPassword ?
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
                    Înregistrare
                </LoadingButton>
                <div className='main-color-oposite'>
                    Ai deja un cont?
                    <Link href='/connect/login' className='underline ml-2 text-lg' style={{ color: "#711DB0" }}>
                        Conectează-te
                    </Link>
                </div>
            </form>
        </div>
    )
}