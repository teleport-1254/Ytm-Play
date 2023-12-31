import loading from '../utils/loading';
import { playlistContentLoading } from '../utils/loading';
import { useState } from 'react';
import SearchResultVideo from "./SearchResultVideo";
import { SearchResultPlaylistProps } from '../typings/intefaces';
import { PlaylistFull, VideoDetailed, SearchResult } from 'ytmusic-api';

const SearchResultPlaylist = ({ searchResult, gettingInfoForShowingPlayingVideos, gettingSongsInPlaylist, setAppLoadingState }: SearchResultPlaylistProps) => {

    const [playlistClicked, setPlaylistClicked] = useState(false);

    // for preview
    const [playlistArtist, setPlaylistArtist] = useState('');
    const [name, setName] = useState('');
    const [trackCount, setTrackCount] = useState(0);
    const [playlistThumbnail, setPlaylistThumbnail] = useState('');
    const [songsInPlaylist, setSongsInPlaylist] = useState<Array<VideoDetailed>>();

    let listData: Array<Array<string>> = [];
    if (searchResult != null) {
        searchResult.map((item: SearchResult) => {
            if (item.type === "PLAYLIST") {
                let temp = [
                    item.playlistId,
                    item.name,
                    item.artist.name,
                    item.thumbnails[0].url
                ];
                listData.push(temp);
            }
        })
    }

    // console.log(listData);

    async function handleClick(playlistId: string, play: boolean): Promise<void> {
        // setPlaylistClicked(true); 

        await fetch('api/ytmusic?method=getPlaylist&playlistId=' + playlistId)
            .then(data => data.json())
            .then((data: PlaylistFull) => {
                setPlaylistArtist(data.artist != undefined ? data.artist.name : "none");
                setName(data.name);
                setPlaylistThumbnail(data.thumbnails[1] != undefined ? data.thumbnails[1].url : data.thumbnails[0].url);
                setTrackCount(data.videoCount);
                // console.log(data);
            });

        await fetch('api/ytmusic?method=getPlaylistVideos&playlistId=' + playlistId)
            .then(data => data.json())
            .then((data: Array<VideoDetailed>) => {
                // console.log(data);
                if (play) {
                    gettingSongsInPlaylist(data);
                    // setAppLoadingState(true);
                } else {
                    setSongsInPlaylist(data);
                }
            });
    }

    const handleBackBtnClick = () => {
        setPlaylistArtist('');
        setName('');
        setPlaylistThumbnail('');
        setSongsInPlaylist(undefined);
        setPlaylistClicked(false);
        setTrackCount(0);
    }

    return (
        <>
            {(!playlistClicked && songsInPlaylist == undefined) &&
                <div className="rounded-0 list-group position-relative mb-5 pb-5 z-0">

                    {searchResult == undefined &&
                        loading()
                    }

                    <div className='mb-5 pb-5'>
                        {listData.map((item) => (
                            <a key={item[0]} title={item[1]} className="list-group-item border border-0 bg-dark-subtle" aria-current="true">
                                <div className="d-flex w-100 ">
                                    <div className='position-relative'>
                                        <img src={item[3] != "..." ? item[3] : "assets/images/empty.png"}
                                            onClick={
                                                () => {
                                                    setPlaylistClicked(true);
                                                    handleClick(item[0], false);
                                                }
                                            }
                                            className="object-fit-cover img rounded-2"
                                            height={100} width={100} alt={item[1]} />
                                        {item[3] == "..." &&
                                            <small className='position-absolute top-50 start-50 translate-middle text-center fw-semibold'>Some error occured!</small>
                                        }
                                    </div>

                                    <button className='btn position-absolute bottom-0 end-0 p-0 me-2 mb-2 rounded-circle' onClick={() => {
                                        handleClick(item[0], true);
                                        setAppLoadingState(true);
                                    }}>
                                        <img className='p-0' src="assets/images/play.svg" alt="play" width={50} title='Play all' />
                                    </button>

                                    <div className="flex-column pt-2" onClick={
                                        () => {
                                            setPlaylistClicked(true);
                                            handleClick(item[0], false);
                                        }
                                    }>
                                        <h3 className="p-3 pt-0 pb-0 one-line-text text-break">{item[1]}</h3>
                                        <h5 className="p-3 pt-0 pb-0 m-0 one-line-text text-break">{item[2]}</h5>
                                        {/* <small className='p-3 pt-0 pb-0 m-0 position-relative start-0 translate-middle'>Tracks: {item[4]}</small> */}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            }

            {(playlistClicked) &&
                <div className='position-relative z-0 pt-2 bg-dark-subtle'>
                    {
                        (playlistThumbnail == "") ?
                            playlistContentLoading() :
                            <div>
                                <button className="btn position-absolute p-0 ms-3" type="button" onClick={handleBackBtnClick}>
                                    <img className='m-0 p-0' src="assets/images/back.svg" alt="back-btn" width={30} />
                                </button>
                                <div className=''>
                                    <div className='ms-4'>
                                        <h3 className='ms-4'>{name}</h3>
                                        <h5>{playlistArtist}</h5>
                                        <h5>Tracks: {trackCount}</h5>
                                    </div>

                                    <div
                                        className='position-relative'
                                        style={{
                                            width: "300px",
                                            height: "300px"
                                        }}>

                                        <img
                                            className='object-fit-cover ms-3 img-cover z-0 rounded-2'
                                            src={playlistThumbnail} alt={name}
                                            width={300} height={300} />
                                    </div>
                                    <button className='btn p-0 ms-2 rounded-0 d-flex'
                                        onClick={() => {
                                            if (songsInPlaylist != undefined) {
                                                gettingSongsInPlaylist(songsInPlaylist);
                                                setAppLoadingState(true);
                                            }
                                        }}>
                                        <img src="assets/images/play.svg" width={50} height={50} alt="PlayBtn" title='Play All' />
                                        <h3 className='mt-2'>Play All</h3>
                                    </button>
                                </div>
                                <SearchResultVideo setAppLoadingState={setAppLoadingState} searchResult={songsInPlaylist} gettingInfo={gettingInfoForShowingPlayingVideos} />
                            </div>
                    }
                </div>
            }
        </>
    );
}

export default SearchResultPlaylist;
