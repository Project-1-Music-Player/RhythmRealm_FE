import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

import styles from './Search.module.scss'

import Sidebar from "../../layout/components/Sidebar/Sidebar"
import { RootState } from "../../redux/store"
import { BASE_API_URL, MUSIC_API_ROUTES } from "../../constants/api"
import { SongModel } from "../../models/SongModel"
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
            const response = await axios.get(
                BASE_API_URL + MUSIC_API_ROUTES.searchSong + `?q=${searchValue}`,
            )
            setSearchResults(response.data)

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