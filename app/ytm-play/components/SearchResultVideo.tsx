import secToTime from '../utils/MillsecToTime';
import '../assets/css/CustomeComponentStyle.css'
import loading from '../utils/loading';
import { SearchResultVideoProps } from '../typings/intefaces';
import { ArtistBasic, SearchResult } from 'ytmusic-api';

const SearchResultVideo = ({ searchResult, gettingInfo, setAppLoadingState }: SearchResultVideoProps) => {

    // console.log(searchResult)
    let listData: Array<Array<string>> = [];
    if (searchResult != null) {
        searchResult.map((item: SearchResult) => {
            if (item.type === "VIDEO") {
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
                    item.thumbnails[0].url
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
                loading(true)
            }

            <div className='mb-5 pb-5'>
                {listData.map((item, index) => (
                    <a key={index} title={item[1]} onClick={
                        () => { handleClick(item[0], item[1], item[2], item[4]) }
                    } className="list-group-item border border-0 bg-dark-subtle" aria-current="true">
                        <div className="d-flex w-100 ">
                            <div className='position-relative'>
                                <img src={item[4] || "assets/images/empty.png"}
                                    className="object-fit-cover img rounded-2 responsive-video-thumbnail"
                                    height={100}
                                    alt={item[1]}
                                />
                                {!item[4] &&
                                    <small className='position-absolute top-50 start-50 translate-middle text-center fw-semibold'>Some error occured!</small>
                                }
                                <small className='position-absolute bottom-0 start-0 m-1 ps-1 pe-1 fw-semibold rounded-2 alpha-dark-ctk'>{item[3]}</small>
                            </div>

                            <div className="flex-column pt-2">
                                <h3 className="p-3 pt-0 pb-0 one-line-text text-break">{item[1]}</h3>
                                <h5 className="p-3 pt-0 pb-0 m-0 one-line-text text-break">{item[2]}</h5>
                                <small className='p-3 pt-0 pb-0 m-0 position-relative start-0 translate-middle'>{item[5]}</small>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default SearchResultVideo;