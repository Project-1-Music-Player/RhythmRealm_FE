import classNames from "classnames/bind"

import styles from "./CreatePlaylist.module.scss"
import React from "react"

const cx = classNames.bind(styles)

type CreatePlaylistProps = {
    getIsOpenForm: Function
}

function CreatePlaylist({ getIsOpenForm }: CreatePlaylistProps) {
    const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('form-modal')} onClick={(e) => handleFormClick(e)}>
            <div>
                <span className={cx('info-label')}>Playlist Title</span>
                <input 
                    type="text" 
                    name="title" 
                    // value={'xx'} 
                    className={cx('input')}
                    placeholder="Title..."
                />
            </div>

            <div style={{margin: '30px 0'}}>
                <span className={cx('info-label')}>Playlist Description</span>
                <input 
                    type="text" 
                    name="title" 
                    // value={'xx'} 
                    className={cx('input')}
                    placeholder="Description..."
                />
            </div>

            <div className={cx('form-action')}>
                <span className={cx('cancel-btn')} onClick={() => getIsOpenForm(false)}>Cancel</span>
                <span className={cx('save-btn')}>Save</span>
            </div>
        </div>
    )
}

export default CreatePlaylist