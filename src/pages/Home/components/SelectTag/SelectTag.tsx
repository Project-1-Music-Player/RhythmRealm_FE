import styles from './SelectTag.module.scss'
import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import React, { useState } from "react"
import { getRecommendEmotion, getRecommendTag } from "@/apis/recommendApi"
import ModularPlaylist from "../ModularSpotify/ModularSpotify"

const cx = classNames.bind(styles)

type SelectTagProps = {
    tags?: any[],
}

function SelectTag({ tags }: SelectTagProps) {
    const [recommendMusic, setRecommendMusic] = useState<any>([])
    const [recommendEmotion, setRecommendEmotion] = useState<any>([])

    const [tagData, setTagData] = useState<{tag: string}>({
        tag: '',
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchRecommendTag()
        fetchRecommendEmotion()
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setTagData({
            ...tagData,
            [name]: value
        })
    }
    
    const fetchRecommendTag = async () => {
        try {
            const recommendMusic = await getRecommendTag(tagData.tag, 1, 8)
            setRecommendMusic(recommendMusic)
        } catch(err) {
            console.log(`Get tags falied: ${err}`)
        }
    }
    const fetchRecommendEmotion = async () => {
        try {
            const recommendEmotion = await getRecommendEmotion(tagData.tag, 1, 8)
            setRecommendEmotion(recommendEmotion)
        } catch(err) {
            console.log(`Get tags falied: ${err}`)
        }
    }

    function capitalizeFirstLetter(input: string): string {
        if (!input) return input
        return input.charAt(0).toUpperCase() + input.slice(1)
    }
      
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form id="uploadForm" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className={cx('label')}>Choose Emotion Tag</Form.Label>
                        <Form.Control 
                            as="select"
                            required
                            className={cx('select-input')}
                            name="tag"
                            value={tagData.tag}
                            onChange={handleFormChange}
                        >
                            <option value="" style={{color: '#000', fontWeight: '500', fontSize: '1.6rem', minHeight: '20px'}}>Select...</option>
                            {tags?.map((tag, index) => (
                                <option 
                                    key={index} 
                                    value={tag}
                                    className={cx('genre-option')}
                                >{capitalizeFirstLetter(tag)}</option>
                            ))}
                        </Form.Control>  
                    </Form.Group>
                </Form>
                <div style={{ marginLeft: '30px' }}>
                    <Button type="submit" className={cx('submit-btn')} form="uploadForm">Find songs</Button>
                </div>
            </div>
            <div className={cx('content')} style={{marginTop: '50px'}}>
                <ModularPlaylist title='Recommend Music' songs={recommendMusic} tagName={tagData.tag}/>
                <ModularPlaylist title='Recommend Emotion' songs={recommendEmotion} tagName={tagData.tag}/>
            </div>
        </div>
    )
}

export default SelectTag