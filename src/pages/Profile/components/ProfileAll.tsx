import { UserModel } from "@/models/UserModel"

import ProfileLike from "./ProfileLike"
import ProfilePlaylist from "./ProfilePlaylist"

type ProfileAllProps = {
    profileData: UserModel
}

function ProfileAll({ profileData }: ProfileAllProps) {
    return (
        <>
            <ProfileLike profileSong={profileData.like_song}/>
            <ProfilePlaylist profilePlaylist={profileData.playlist}/>
        </>
    )
}

export default ProfileAll