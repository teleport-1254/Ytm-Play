export interface SearchBoxProps {
    gettingInfo: (videoId: string, name: string, artist: string, thumbnail: string) => void;
    settingQueue: (songs: Array<Array<string | undefined>>) => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface OptionBoxProps {
    queue: Array<Array<string>>;
    songIndex: number;
    emptyQueueBtn: () => void;
    removeSong: (index: number) => void;
    setItemClicked: (item: number) => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface InfoProps {
    infoData: Array<string>;
    whenFinishedPlaying: () => void;
    prevTrack: () => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface SearchResultArtistProps {
    searchResult?: Array<SearchResult>;
    gettingInfoForShowingPlayingVideos: (videoId: string, name: string, artist: string, thumbnail: string) => void;
    // gettingSongsInPlaylist: (songs: {content: Array<SearchItemInfoObj>}) => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface ArtistPageProps {
    description: string;
    name: string;
    topSongs?: Array<SongDetailed>;
    topVideos?: Array<VideoDetailed>;
    thumbnail: string;
    handleBackBtn: () => void;
    gettingInfoForShowingPlayingVideos: (videoId: string, name: string, artist: string, thumbnail: string) => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface SearchResultSongProps {
    searchResult?: Array<SearchResult>;
    gettingInfo: (videoId: string, name: string, artist: string, thumbnail: string) => void
    setAppLoadingState: (state: boolean) => void;
}

export interface SearchResultVideoProps {
    searchResult?: Array<SearchResult>;
    gettingInfo: (videoId: string, name: string, author: string, thumbnail: string) => void
    setAppLoadingState: (state: boolean) => void;
}

export interface SearchResultPlaylistProps {
    searchResult?: Array<SearchResult>;
    gettingInfoForShowingPlayingVideos: (videoId: string, name: string, artist: string, thumbnail: string) => void;
    gettingSongsInPlaylist: (songs: Array<VideoDetailed>) => void;
    setAppLoadingState: (state: boolean) => void;
}

export interface SearchSuggestionsProps {
    suggestions: Array<string>,
    gettingClikedQuery(query: string) : void
}

export interface SearchTypeProps {
    gettingSelectedType(query: string): void
}

