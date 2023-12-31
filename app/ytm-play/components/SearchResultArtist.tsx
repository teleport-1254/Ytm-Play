import loading from '../utils/loading';
import ArtistPage from './ArtistPage';
import { useState } from 'react';
import { SearchResultArtistProps } from '../typings/intefaces';
import { ArtistFull, SearchResult, SongDetailed, VideoDetailed } from 'ytmusic-api';

function addDurationFieldSongDetailed(obj: Omit<SongDetailed, "duration">): SongDetailed & { duration: number } {
    return { ...obj, duration: 0 };
}

function addDurationFieldVideoDetailed(obj: Omit<VideoDetailed, "duration">): VideoDetailed & { duration: number } {
    return { ...obj, duration: 0 };
}


const SearchResultArtist = ({ searchResult, gettingInfoForShowingPlayingVideos, setAppLoadingState }: SearchResultArtistProps) => {

    const [artistClicked, setArtistClicked] = useState(false);

    // for preview
    const [artistDescription, setArtistDescription] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistThumbnail, setArtistThumbnail] = useState('');
    const [topSongs, setTopSongs] = useState<SongDetailed[]>();
    const [topVideos, setTopVideos] = useState<VideoDetailed[]>();

    // const [artistData, setArtistData] = useState<>();

    // const [songsInPlaylist, setSongsInPlaylist] = useState<SearchResult>();

    let listData: Array<Array<string>> = [];
    if (searchResult != null) {
        searchResult.map((item: SearchResult) => {
            if (item.type === "ARTIST") {
                let temp = [
                    item.artistId,
                    item.name,
                    item.thumbnails[1].url,
                ];
                listData.push(temp);
            }
        })
    }

    // console.log(listData);

    const handleClick = (artistId: string) => {
        // gettingInfo(artistId, title, author, thumbnail, trackCount);
        
        fetch('api/ytmusic?method=getArtist&artistId=' + artistId)
            .then(data => data.json())
            .then((data: ArtistFull) => {
                setArtistDescription(data.description);
                setArtistName(data.name);
                setArtistThumbnail(data.thumbnails[2].url);

                let songs: Array<SongDetailed> = [];
                data.topSongs.map(((item) => {
                    songs.push(addDurationFieldSongDetailed(item));
                }))
                setTopSongs(songs);
                
                let videos: Array<VideoDetailed> = [];
                data.topVideos.map(((item) => {
                    videos.push(addDurationFieldVideoDetailed(item));
                }))
                setTopVideos(videos);

            });
    }

    const handleBackBtn = () => {
        setArtistClicked(false);
        setArtistName('');
    }

    return (
        <>
            {(!artistClicked) &&
                <div className="rounded-0 list-group position-relative mb-5 pb-5 z-0">

                    {searchResult == undefined &&
                        loading()
                    }

                    <div className='mb-5 pb-5 position-relative bg-dark-subtle d-flex'
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}>
                        {listData.map((item) => (
                            <a key={item[0]} title={item[1]} className="list-group-item border border-0 bg-dark-subtle" aria-current="true">
                                <div className="d-flex w-100 ">
                                    <div className='position-relative'>
                                        <img src={item[2] || "assets/images/empty.png"}
                                            className="object-fit-cover img rounded-2"
                                            height={100} width={100} alt={item[1]}
                                            onError={(e) => {
                                                e.currentTarget.src = "assets/images/empty.png";
                                            }} />
                                    </div>

                                    <div className="flex-column pt-2" onClick={
                                        () => {
                                            setArtistClicked(true);
                                            handleClick(item[0]);
                                        }
                                    }>
                                        <h3 className="p-3 pt-0 pb-0 one-line-text text-break">{item[1]}</h3>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            }

            {(artistClicked) &&
                <ArtistPage
                    description={artistDescription}
                    name={artistName}
                    thumbnail={artistThumbnail}
                    topSongs={topSongs}
                    topVideos={topVideos}
                    handleBackBtn={handleBackBtn}
                    gettingInfoForShowingPlayingVideos={gettingInfoForShowingPlayingVideos}
                    setAppLoadingState={setAppLoadingState} />
            }
        </>
    );
}

export default SearchResultArtist;