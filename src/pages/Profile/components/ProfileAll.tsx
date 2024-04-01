import { UserModel } from "../../../models/UserModel"
import ProfileLike from "./ProfileLike"
import ProfilePlaylist from "./ProfilePlaylist"

type ProfileAllProps = {
    profileData: UserModel
}

function ProfileAll({ profileData }: ProfileAllProps) {
    return (
        <>
            <ProfileLike profileSong={profileData.songs}/>
            <ProfilePlaylist profilePlaylist={profileData.playlists}/>
        </>
    )
}

export default ProfileAll