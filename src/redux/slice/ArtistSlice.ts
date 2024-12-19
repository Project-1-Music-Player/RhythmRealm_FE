import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ArtistModel } from "@/models/ArtistModel"

interface ArtistState {
    followedArtist: ArtistModel[],
    allArtists: ArtistModel[],
    artistId: string | undefined,
}

const initialState: ArtistState = {
    followedArtist: [],
    allArtists: [],
    artistId: '',
}

const ArtistSlice = createSlice({
    name: 'artist',
    initialState: initialState,
    reducers: {        
        setFollowedArtist: (state, action: PayloadAction<ArtistModel[]>) => {
            state.followedArtist = action.payload;
        },

        setAllArtists: (state, action: PayloadAction<ArtistModel[]>) => {
            state.allArtists = action.payload;
        },

        setArtistId: (state, action: PayloadAction<string | undefined>) => {
            state.artistId = action.payload;
        }
    } 
})

export const { setFollowedArtist, setAllArtists, setArtistId } = ArtistSlice.actions
export default ArtistSlice.reducer