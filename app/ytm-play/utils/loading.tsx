import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = (video: boolean = false) => {
    const componentArray = [];
    for (let i = 0; i < 7; i++) {
        componentArray.push(
            <a key={i} className='list-group-item border border-0 bg-dark-subtle'>
                <div className="d-flex w-100">
                    <div>
                        {
                            video &&
                            <Skeleton className='img rounded-2 responsive-video-thumbnail' height={100} style={{
                                width: "clamp(9.375rem, 4.5402173913043455rem + 24.173913043478272vw, 11.1125rem)"
                            }} />
                        }

                        {
                            !video &&
                            <Skeleton className='img rounded-2' width={100} height={100} />
                        }
                    </div>
                    <div className="flex-column pt-2">
                        <h3 className="p-3 pt-0 pb-1 one-line-text text-break"> <Skeleton /> </h3>
                        <h5 className="p-3 pt-0 pb-1 m-0 one-line-text text-break"> <Skeleton /> </h5>
                    </div>
                </div>
            </a>
        );
    }
    return (
        <SkeletonTheme baseColor="#888" highlightColor="#999">
            {componentArray}
        </SkeletonTheme >
    );
}

export const artistLoading = () => {
    return (
        <SkeletonTheme baseColor="#888" highlightColor="#999">
            <div className='p-0 bg-dark-subtle'>
                <Skeleton className='position-absolute z-0 object-fit-cover img-cover rounded-0 w-100 bg-gradient bg-dark' height={300} />
            </div>
        </SkeletonTheme>);
}

export const playlistContentLoading = () => {
    const componentArray = [];
    for (let i = 0; i < 5; i++) {
        componentArray.push(
            <a key={i} className='list-group-item pb-3 border border-0 bg-dark-subtle'>
                <div className="d-flex w-100">
                    <div>
                        <Skeleton className='img rounded-2 responsive-video-thumbnail' height={100} style={{
                            width: "clamp(9.375rem, 4.5402173913043455rem + 24.173913043478272vw, 11.1125rem)"
                        }} />
                    </div>
                    <div className="flex-column pt-2">
                        <h3 className="p-3 pt-0 pb-1 one-line-text text-break"> <Skeleton /> </h3>
                        <h5 className="p-3 pt-0 pb-1 m-0 one-line-text text-break"> <Skeleton /> </h5>
                    </div>
                </div>
            </a>
        );
    }
    return (
        <SkeletonTheme baseColor="#888" highlightColor="#999">
            <button className="btn position-absolute p-0 ms-3" type="button">
                <img className='m-0 p-0' src="assets/images/back.svg" alt="back-btn" width={30} />
            </button>
            <div className=''>
                <div className='ms-4'>
                    <h3 className="ms-4 w-50"> <Skeleton /> </h3>
                    <h5 className="w-25"> <Skeleton /> </h5>
                    <h5 className="w-25"> <Skeleton /> </h5>
                </div>
                <Skeleton className='object-fit-cover ms-3 img-cover rounded-2'
                    width={300} height={300} />
            </div>
            <button className='btn p-0 ms-2 rounded-0 d-flex'>
                <img src="assets/images/play.svg" width={50} height={50} alt="PlayBtn" title='Play All' />
                <h3 className='mt-2'>Play All</h3>
            </button>
            <div className='ms-3'>
                {componentArray}
            </div>
        </SkeletonTheme>
    );
}

export default loading;