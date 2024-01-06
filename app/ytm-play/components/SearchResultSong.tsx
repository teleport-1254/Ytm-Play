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
        <div className="rounded-0 list-group position-relative mb-5 pb-5 z-0">

            {searchResult == null &&
                loading()
            }

            <div className='mb-5 pb-5'>
                {listData.map((item) => (
                    <a key={item[0]} title={item[1]}
                        onClick={
                            () => { handleClick(item[0], item[1], item[2], item[4]) }
                        }
                        className="list-group-item p-1 border border-0 bg-black">
                            
                        <div className="d-flex align-items-center w-100">

                            <div className='position-relative'>
                                <img src={item[4] || "assets/images/empty.png"}
                                    className="object-fit-cover img square-img"
                                    alt={item[1]}
                                />
                                {!item[4] &&
                                    <small className='position-absolute top-50 start-50 translate-middle text-center fw-semibold'>Some error occured!</small>
                                }
                            </div>

                            <div className="ms-2 p-1">
                                <h3 className="p-0 m-0 fluid-text-h3 one-line-text text-break">{item[1]}</h3>
                                <h5 className="p-0 m-0 fluid-text-h5 one-line-text text-break text-body-secondary">{item[2]}</h5>
                                <p className='p-0 m-0 fluid-text-small text-body-secondary'>{item[3]}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default SearchResultSong;