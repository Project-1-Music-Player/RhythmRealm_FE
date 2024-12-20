import { getAllTag } from "@/apis/recommendApi"
import { useEffect, useState } from "react"
import SelectTag from "./SelectTag/SelectTag"

function EmotionRecommend() {
    const [tag, setTags] = useState([])

    const fetchAllTag = async () => {
        try {
            const tags = await getAllTag()
            setTags(tags)
        } catch(err) {
            console.log(`Get tags falied: ${err}`)
        }
    }
    useEffect(() => {
        fetchAllTag()
    }, [])

    return (
        <SelectTag tags={tag}/>
    )
}

export default EmotionRecommend