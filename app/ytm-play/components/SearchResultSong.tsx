import '../assets/css/CustomeComponentStyle.css'
import secToTime from '../utils/MillsecToTime';
import loading from '../utils/loading';
import { SearchResultSongProps } from '../typings/intefaces';
import { ArtistBasic, SearchResult } from 'ytmusic-api';
// import { SearchResult, SongDetailed } from 'ytmusic-api';

const SearchResultSong = ({ searchResult, gettingInfo, setAppLoadingState }: SearchResultSongProps) => {

    let listData: Array<Array<string>> = [];
    if (searchResult != null) {
        // console.log(searchResult)
        searchResult.map((item: SearchResult) => {
            if (item.type === "SONG") {
                let artists: Array<string> = [];
                item.artists.map((item: ArtistBasic) => {
                    artists.push(item.name)
                })
    
                let temp: Array<string>;
    
                temp = [
                    item.videoId, 
                    item.name, 
                    artists.join(', '), 
                    (item.duration != 0) ? secToTime(item.duration) : "", 
                    item.thumbnails[1]?.url
                ];
                // console.log(temp);
                listData.push(temp);
            }
        })
    }

    // console.log(listData);

    const handleClick = (videoId: string, name: string, artist: string, thumbnail: string) => {
        gettingInfo(videoId, name, artist, thumbnail);
        setAppLoadingState(true);
    }

    return (
        <div className="rounded-0 list-group position-relative mb-5 pb-5 z-0" aria-hidden="true">

            {searchResult == null &&
                loading()
            }

            <div className='mb-5 pb-5'>
                {listData.map((item) => (
                    <a key={item[0]} title={item[1]} onClick={
                        () => { handleClick(item[0], item[1], item[2], item[4]) }
                    } className="list-group-item border border-0 bg-dark-subtle" aria-current="true">
                        <div className="d-flex w-100">

                            <div className='position-relative'>
                                <img src={item[4] || "assets/images/empty.png"}
                                    className="object-fit-cover img rounded-2"
                                    height={100}
                                    width={100}
                                    alt={item[1]}
                                />
                                {!item[4] &&
                                    <small className='position-absolute top-50 start-50 translate-middle text-center fw-semibold'>Some error occured!</small>
                                }
                                <small className='position-absolute bottom-0 start-0 m-1 ps-1 pe-1 fw-semibold rounded-2 alpha-dark-ctk'>{item[3]}</small>
                            </div>

                            <div className="flex-column pt-2">
                                <h3 className="p-3 pt-0 pb-1 one-line-text text-break">{item[1]}</h3>
                                <h5 className="p-3 pt-0 pb-1 m-0 one-line-text text-break">{item[2]}</h5>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default SearchResultSong;