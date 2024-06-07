import classNames from "classnames/bind"
import { InputGroup } from "react-bootstrap" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import styles from '../Header.module.scss'
import { BASE_API_URL, MUSIC_API_ROUTES } from "../../../../constants/api"

const cx = classNames.bind(styles)

type SearchBarProps = {
    setSearchResults: Function,
    isShowSearchResults: Function,
}

function SearchBar({ setSearchResults, isShowSearchResults }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const searchSongs = async () => {
        try {
            const response = await axios.get(
                BASE_API_URL + MUSIC_API_ROUTES.searchSong + `?q=${searchValue}`,
            )
            setSearchResults(response.data)
            isShowSearchResults(true)

        } catch (error) {
            console.log('Search failed: ' + error)
        }
    }

    useEffect(() => {
        if(searchValue !== '') {
            searchSongs()
        } else {
            setSearchResults([])
        } 
    }, [searchValue])

    const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }
    const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            updateURLWithQuery(searchValue)
            isShowSearchResults(false)
        }
    }
    const updateURLWithQuery = (query: string) => {
        const encodedQuery = encodeURIComponent(query)
        navigate(`/search?q=${encodedQuery}`)
    };

    return (
        <InputGroup className={cx('search')}>
            <input
                placeholder="Search..."
                className={cx('search_input')}
                value={searchValue}
                onChange={(e) => handleChangeSearchValue(e)}
                onKeyDown={handleEnterDown}
            />
            <div className={cx('search_btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search_icon')}/>
            </div>
        </InputGroup>
    )
}

export default SearchBar