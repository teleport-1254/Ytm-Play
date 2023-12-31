import SearchResultSong from './SearchResultSong';
import SearchResultVideo from './SearchResultVideo';
import { ArtistPageProps } from '../typings/intefaces';
import { artistLoading } from '../utils/loading';
import { useState } from 'react';
import { SearchResult } from 'ytmusic-api';

const ArtistPage = ({ description, name, thumbnail, topSongs, topVideos, handleBackBtn, gettingInfoForShowingPlayingVideos, setAppLoadingState }: ArtistPageProps) => {
    const [tab, setTab] = useState<string>('SONG');
    // const [browseIdSongs, setBroseIdSongs] = useState(products?.songs.browseId);
    // const [browseIdVideos, setBroseIdVideos] = useState(products?.videos.browseId);

    const [songsInPlaylist, setSongsInPlaylist] = useState<SearchResult>();

    // const fetchArtistPlaylist = (product: string = 'songs') => {
    //     let browseId: string | undefined;
    //     if (product == 'songs') {
    //         browseId = products?.songs.browseId;
    //     }
    //     if (product == 'videos') {
    //         browseId = products?.videos.browseId;
    //     }
    //     if (browseId != undefined) {
    //         fetch(APIUrl + '/getPlaylist?browseId=' + browseId)
    //             .then(data => data.json())
    //             .then((data: SearchResult) => {
    //                 // console.log(data);
    //                 setSongsInPlaylist(data);
    //             });
    //     }
    // }

    const handleDescriptionClick = () => {
        const descMoreBtn = document.getElementById('descMoreBtn') as HTMLInputElement;
        const desc = document.getElementById('desc');

        if (desc?.classList.contains('one-line-text-w-50')) {
            desc?.classList.remove('one-line-text-w-50');
            descMoreBtn.innerText = 'less';
        } else {
            desc?.classList.add('one-line-text-w-50');
            descMoreBtn.innerText = 'more';
        }
    }
    return (
        <>
            {
                (name == '') ?
                    artistLoading() :
                    <div className='p-0 bg-dark-subtle'>
                        <div className='position-relative'>
                            <div className='position-absolute z-0 w-100 bg-gradient bg-dark'>
                                <img
                                    className='object-fit-cover w-100 img-cover'
                                    src={thumbnail} alt={name}
                                    height={300} />

                                <div className='d-flex justify-content-evenly bg-body-tertiary'>
                                    <button className={tab == 'SONG' ?
                                        "btn w-100 rounded-0 p-2 bg-dark-subtle fs-5" :
                                        "btn w-100 rounded-0 p-2 fs-5"}
                                        onClick={() => {
                                            setTab('SONG')
                                        }}>
                                        Top Songs
                                    </button>
                                    <button className={tab == 'VIDEO' ?
                                        "btn w-100 rounded-0 p-2 bg-dark-subtle fs-5" :
                                        "btn w-100 rounded-0 p-2 fs-5"}
                                        onClick={() => {
                                            setTab('VIDEO');
                                        }}>
                                        Top Videos
                                    </button>
                                </div>
                                <div className='bg-dark-subtle pt-2'>
                                    {(tab == 'SONG') &&
                                        <SearchResultSong setAppLoadingState={setAppLoadingState} searchResult={topSongs} gettingInfo={gettingInfoForShowingPlayingVideos} />
                                    }
                                    {(tab == 'VIDEO') &&
                                        <SearchResultVideo setAppLoadingState={setAppLoadingState} searchResult={topVideos} gettingInfo={gettingInfoForShowingPlayingVideos} />
                                    }
                                </div>
                            </div>

                            <div className='position-relative z-1 w-100 pb-5 dark-subtle-top-bottom-gradiant'>
                                <div className='d-flex ps-2'>
                                    <button className="btn start-0 p-0" type="button" onClick={handleBackBtn}>
                                        <img className='m-0 p-0' src='assets/images/back.svg' alt="back-btn" width={30} />
                                    </button>
                                    <h3 className='p-2 pb-0 mt-1'>{name}</h3>
                                </div>
                                <div id='descBox' className='ps-3 pe-3 pb-5 opacity-100'>
                                    <h5>Description:</h5>
                                    <div id='desc' className='one-line-text-w-50 pb-5'>
                                        {description.slice(0, 200)}...
                                        <a id='descMoreBtn' className='position-absolute start-0 ps-3 pt-3 text-white'
                                            onClick={handleDescriptionClick}>more</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <SearchResultVideo setAppLoadingState={setAppLoadingState} searchResult={songsInPlaylist} gettingInfo={gettingInfoForShowingPlayingVideos} /> */}
                    </div>
            }
        </>
    );
}

export default ArtistPage;