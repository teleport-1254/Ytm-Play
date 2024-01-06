import { ChangeEvent, useState } from 'react';
import SearchSuggestions from './SearchSuggestions';
import SearchType from './SearchType';
import SearchResultArtist from "./SearchResultArtist";
import SearchResultSong from "./SearchResultSong";
import SearchResultVideo from "./SearchResultVideo";
import SearchResultPlaylist from "./SearchResultPlaylist";
import { SearchBoxProps } from '../typings/intefaces';
import { ArtistBasic, SearchResult, VideoDetailed } from 'ytmusic-api';

const SearchBox = ({ gettingInfo, settingQueue, setAppLoadingState }: SearchBoxProps) => {
    // input search query

    const [searchQuery, setSearchQuery] = useState('');

    // search suggestions
    const [suggestions, setSuggestions] = useState([]);

    // search btn clicked
    const [searchBtnClicked, setSearchBtnClicked] = useState(false);

    // search result
    const [searchResult, setSearchResult] = useState<Array<SearchResult>>();

    // getting search type
    const [searchType, setSearchType] = useState('SONG');

    const handleClickFromSuggestion = (query: string) => {
        setSearchQuery(query);
        handleSearchBtn(searchType);
    }

    const gettingSelectedType = (type: string) => {
        setSearchResult(undefined);
        setSearchType(type);
        // console.log(type);
        if (searchQuery != '') {
            handleSearchBtn(type);
        }
    }

    const gettingInfoFromResult = (videoId: string, name: string, artist: string, thumbnail: string) => {
        gettingInfo(videoId, name, artist, thumbnail);
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setSearchBtnClicked(false);

        await fetch("api/ytmusic?method=getSearchSuggestions&q=" + e.target.value)
            .then((res) => res.json())
            .then((suggestionsJson) => {
                setSuggestions(suggestionsJson);
            });
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearchBtn(searchType);
        }
    };

    const handleSearchBtn = (type: string) => {
        if (searchQuery != '') {
            setSearchResult(undefined);
            setSearchBtnClicked(true);
            fetch("api/ytmusic?method=getSearchResult&q=" + searchQuery + "&type=" + type)
                .then((res) => res.json())
                .then((searchResultJson) => {
                    setSearchResult(searchResultJson);
                    // console.log(searchResultJson);
                });
        }
    }

    // for adding all the songs in queue
    const gettingSongsInPlaylist = (songs: Array<VideoDetailed>) => {
        let listData: Array<Array<string | undefined>> = [];
        songs.map((item: VideoDetailed) => {

            let artists: Array<string> = [];
            item.artists.map((item: ArtistBasic) => {
                artists.push(item.name)
            })

            let temp = [
                item.videoId,
                undefined,
                item.name,
                artists.join(", "),
                item.thumbnails[0].url
            ];

            listData.push(temp);
        })
        settingQueue(listData);
        // console.log(listData);           
    }

    return (
        <>
            <div className='sticky-top'>
                <div className='p-3 bg-body'>

                    <div className='d-flex justify-content-center w-100'>
                        <div className='d-flex bg-dark-subtle rounded-pill w-75'>
                            <a href="/">
                                <img src="assets/images/favicon.png" className='object-fit-cover img' width={50} height={50} alt="Ytm-Play" title='Ytm-Play' />
                            </a>
                            <input type="text"
                                className="fs-5 border-0 p-1 ps-3 pe-3 w-100 bg-transparent"
                                placeholder="Search"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                onKeyPress={handleKeyPress}
                                value={searchQuery}
                                aria-describedby="button-addon2" />
                            <button className="btn bg-transparent" type="button" id="button-addon2"
                                onClick={() => { handleSearchBtn(searchType) }}>
                                <img src="assets/images/search.svg" alt="search" width={25} />
                            </button>
                        </div>
                    </div>

                    {(searchQuery != '' && !searchBtnClicked) && <SearchSuggestions suggestions={suggestions}
                        gettingClikedQuery={handleClickFromSuggestion} />}
                </div>

                <SearchType gettingSelectedType={gettingSelectedType} />
            </div>

            <div className=''>

                {(!searchBtnClicked) &&
                    <div className='position-absolute top-50 start-50 h-100 w-100 bg-black translate-middle'>
                        <div className='text-center text-nowrap lh-1 position-relative top-50 glow-color-animation-text'>
                            <h1 className='text-break text-nowrap m-0 display-2'>Ytm-Play</h1>
                            <small className='text-break text-nowrap fs-6 m-0 fw-semibold'>Play what u like!</small> <br />
                            <small className='text-break text-nowrap m-0 text-body-tertiary'>Search for songs, videos, <br />
                                artists and playlists</small>
                        </div>
                    </div>
                }

                <div className='pb-5 m-2 mb-0'>
                    {(searchQuery != '' && searchBtnClicked && searchType == 'SONG') &&
                        <SearchResultSong searchResult={searchResult} gettingInfo={gettingInfoFromResult} setAppLoadingState={setAppLoadingState} />}

                    {(searchQuery != '' && searchBtnClicked && searchType == 'VIDEO') &&
                        <SearchResultVideo searchResult={searchResult} gettingInfo={gettingInfoFromResult} setAppLoadingState={setAppLoadingState} />}

                    {(searchQuery != '' && searchBtnClicked && searchType == 'ARTIST') &&
                        <SearchResultArtist searchResult={searchResult}
                            gettingInfoForShowingPlayingVideos={gettingInfoFromResult} setAppLoadingState={setAppLoadingState} />}

                    {(searchQuery != '' && searchBtnClicked && searchType == 'PLAYLIST') &&
                        <SearchResultPlaylist searchResult={searchResult}
                            gettingSongsInPlaylist={gettingSongsInPlaylist} gettingInfoForShowingPlayingVideos={gettingInfoFromResult} setAppLoadingState={setAppLoadingState} />}
                </div>
            </div>
        </>
    );
}

export default SearchBox;