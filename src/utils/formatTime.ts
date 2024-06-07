import React from "react"

export const formatSongDuration = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setDuration: Function
) => {
    if(audioRef.current) {
        const minute = Math.floor(audioRef.current.duration / 60)
        const seconds = Math.floor(audioRef.current.duration % 60)
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