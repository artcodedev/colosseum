


import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'


export type DataVar = {

    date: string | null
    time: string | null
    package: number | null
    name: string
    email: string
    phone: string
    quantity: number
    price: string
    coloAdult: number
    coloChild: number
    coloArenaAdult: number
    coloArenaChild: number

}
export type StepsData = {

    setDate: (data: string | null) => void
    setTime: (data: string | null) => void
    setPackage: (data: number | null) => void
    setName: (data: string) => void
    setEmail: (data: string) => void
    setPhone: (data: string) => void
    setQuantity: (data: number) => void
    setPrice: (data: string) => void
    setColoAdult: (data: number) => void
    setColoChild: (data: number) => void
    setColoArenaAdult: (data: number) => void
    setColoArenaChild: (data: number) => void

}

export const useStore = createStore<DataVar & StepsData>()(
    persist(
        (set) => ({

            date: null,
            time: null,
            package: null,
            name: '',
            email: '',
            phone: '',
            quantity: 1,
            price: '0',
            coloAdult: 0,
            coloChild: 0,
            coloArenaAdult: 0,
            coloArenaChild: 0,

            setDate: (q) => set(() => ({ date: q })),
            setTime: (q) => set(() => ({ time: q })),
            setPackage: (q) => set(() => ({ package: q })),
            setEmail: (q) => set(() => ({ email: q })),
            setName: (q) => set(() => ({ name: q })),
            setPhone: (q) => set(() => ({ phone: q })),
            setQuantity: (q) => set(() => ({ quantity: q })),
            setPrice: (q) => set(() => ({ price: q })),
            setColoAdult: (q) => set(() => ({ coloAdult: q })),
            setColoChild: (q) => set(() => ({ coloChild: q })),
            setColoArenaAdult: (q) => set(() => ({ coloArenaAdult: q })),
            setColoArenaChild: (q) => set(() => ({ coloArenaChild: q }))
        }),
        { name: 'colosseum' },
    ),
)

