import classNames from "classnames/bind"
import { InputGroup } from "react-bootstrap" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

import styles from '../Header.module.scss'

const cx = classNames.bind(styles)

function SearchBar() {
    const [searchValue, setSearchValue] = useState('')

    const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            console.log(searchValue)
        }
    }

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