import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from './Search.module.scss'

import Sidebar from "@/layout/components/Sidebar/Sidebar"
import { RootState } from "@/redux/store"
import { searchSong } from "@/apis/songApi"
import { SongModel } from "@/models/SongModel"

import SongResult from "./components/SongResult"

const cx = classNames.bind(styles)
const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

function Search() {
    const user = useSelector((state: RootState) => state.authSlice.user)
    const query = useQuery()
    const searchValue = query.get('q' || '')
    const [searchResults, setSearchResults] = useState<SongModel[]>([])

    const searchSongs = async () => {
        try {
            const searchResults = await searchSong(searchValue)
            setSearchResults(searchResults)
        } catch(err) {
            console.log('Search failed: ', err)
        }
    }
    useEffect(() => {
        if(searchValue !== '') {
            searchSongs()
        }
    }, [searchValue])

    console.log(searchResults)

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {searchResults ? 
                    searchResults.map((result, index) => {
                        return <SongResult key={index} song_data={result}/>
                    })
                : (
                    <></>
                )}
            </div>

            <Sidebar isLogin={user.id ? true : false}/>
        </div>
    )
}

export default Search