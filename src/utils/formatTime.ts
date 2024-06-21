import React from "react"

export const formatSongDuration = (
    setDuration: Function,
    audioRef: React.RefObject<HTMLAudioElement> | null,
    songDuration?: number | null,
) => {
    let time = songDuration

    if(audioRef) {
        if(audioRef.current) {
            time = audioRef.current.duration
        }
    }
    if(time) {
        const minute = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        setDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
    }
}

export const formatSongReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)

    return `${day}/${month}/${year}`
}