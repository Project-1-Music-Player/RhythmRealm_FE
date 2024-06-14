import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import styles from '../Header.module.scss'

import { SongModel } from "@/models/SongModel"

const cx = classNames.bind(styles)

type SearchResultsProps = {
    results: SongModel[],
    setShowSearchResult: Function,
}

function SearchResults({ results, setShowSearchResult }: SearchResultsProps) {
    const navigate = useNavigate()

    const handleResultClick = (song_title: string) => {
        const encodedQuery = encodeURIComponent(song_title)
        navigate(`/search?q=${encodedQuery}`)
        setShowSearchResult(false)
    }

    return (
        results ?
            <div className={cx('container')}>
                {
                    results.map((result, index) => {
                        return (
                            <div 
                                className={cx('result-item')} 
                                key={index}
                                onClick={() => handleResultClick(result.title)}
                            >
                                <FontAwesomeIcon 
                                    icon={faUpRightFromSquare} 
                                    style={{
                                        color: '#686868',
                                        width: '15px',
                                        height: '15px',
                                    }}
                                />
                                <p className={cx('song-title')}>{result.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        : <></>
    )
}

export default SearchResults