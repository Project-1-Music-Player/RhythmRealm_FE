import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import styles from './Upload.module.scss'

import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"
import { songGenres } from "@/constants/genreSongs"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type UploadModel = {
    title: string,
    album: string,
    genre: string,
    releaseDate: string,
    thumbnail: File | null,
    song: File | null,
}

function Upload() {
    const navigate = useNavigate()
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const userId = useSelector((state: RootState) => state.authSlice.user.id)

    const [songData, setSongData] = useState<UploadModel>({
        title: '',
        album: '',
        genre: '',
        releaseDate: '',
        thumbnail: null,
        song: null,
    })
    const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('title', songData.title)
            formData.append('album', songData.album)
            formData.append('genre', songData.genre)
            formData.append('releaseDate', songData.releaseDate)

            if(songData.thumbnail) {
                formData.append('thumbnail', songData.thumbnail)
            }
            if(songData.song) {
                formData.append('song', songData.song)
            }

            await axios.post(
                BASE_API_URL + MUSIC_API_ROUTES.uploadSong,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${userIdToken}`
                    }
                }
            )
            console.log('Upload successfully')
            navigate(`/playlist/${userId}`)

        } catch(err) {
            console.log('Upload failed: ' + err)
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        setSongData({
            ...songData,
            [name]: value
        })
        
        if(files && files.length > 0) {
            const file = files[0]

            if(file.type.startsWith('image/')) {
                const imgUrl = URL.createObjectURL(file)
                setThumbnailSrc(imgUrl)
                setSongData(prev => ({
                    ...prev,
                    thumbnail: file
                }))
            } else if(file.type.startsWith('audio/')) {
                setSongData(prev => ({
                    ...prev,
                    song: file
                }))
            }
        }
    }
    useEffect(() => {
        return () => {
            if(thumbnailSrc) {
                URL.revokeObjectURL(thumbnailSrc)
            }
        }
    }, [thumbnailSrc])

    return (
        <div className={cx('wrapper')}>
            <Form id="uploadForm" onSubmit={handleSubmit}>
                <Form.Group style={{marginBottom: '20px'}}>
                    <Form.Label className={cx('label')}>Title</Form.Label>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        name="title"
                        className={cx('input')}
                        value={songData.title}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group style={{marginBottom: '20px'}}>
                    <Form.Label className={cx('label')}>Album</Form.Label>
                    <Form.Control
                        autoComplete="off"
                        required
                        type="text"
                        name="album"
                        className={cx('input')}
                        value={songData.album}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group style={{marginBottom: '20px'}}>
                    <Form.Label className={cx('label')}>Genre</Form.Label>
                    <Form.Control 
                        as="select"
                        required
                        className={cx('select-input')}
                        name="genre"
                        value={songData.genre}
                        onChange={handleFormChange}
                    >
                        <option value="" style={{color: '#000', fontWeight: '500', fontSize: '1.6rem', minHeight: '20px'}}>Choose song genre...</option>
                        {songGenres.map((genre, index) => (
                            <option 
                                key={index} 
                                value={genre}
                                className={cx('genre-option')}
                            >{genre}</option>
                        ))}
                    </Form.Control>  
                </Form.Group>

                <Form.Group style={{marginBottom: '20px'}}>
                    <Form.Label className={cx('label')}>Release Date</Form.Label>
                    <Form.Control
                        autoComplete="off"
                        required
                        type="date"
                        name="releaseDate"
                        className={cx('input')}
                        value={songData.releaseDate}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group style={{marginBottom: '20px', display: 'flex', alignItems: 'center', minHeight: '100px'}}>
                    <span className={cx('label')}>Thumbnail</span>
                    <Form.Label htmlFor="thumbnailFile" className={cx('file-label')}>Choose Image</Form.Label>
                    <Form.Control
                        required
                        id="thumbnailFile"
                        type="file"
                        accept="image/*"
                        name="thumbnail"
                        className={cx('thumbnail')}
                        onChange={handleFormChange}
                    />
                    {thumbnailSrc ? <img src={thumbnailSrc as string} alt="" className={cx('thumbnail-img')}/> : <></>}
                </Form.Group>

                <Form.Group style={{marginBottom: '40px'}}>
                    <span className={cx('label')}>Song Media</span>
                    <Form.Label htmlFor="songFile" className={cx('file-label')}>Choose Song</Form.Label>
                    <Form.Control
                        required
                        id="songFile"
                        type="file"
                        accept="audio/*"
                        name="song"
                        className={cx('song')}
                        onChange={handleFormChange}
                    />
                    {songData.song ? <span className={cx('song-name')}>{songData.song.name}</span> : <></>}
                </Form.Group>
            </Form>

            <div style={{textAlign: 'right'}}>
                <span className={cx('cancel-btn')} onClick={() => navigate('/')}>Cancel</span>
                <Button type="submit" className={cx('submit-btn')} form="uploadForm">Upload</Button>
            </div>
        </div>
    )
}

export default Upload