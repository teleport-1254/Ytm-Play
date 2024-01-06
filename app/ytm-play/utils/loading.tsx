import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = (video: boolean = false, artist: boolean = false) => {
    const componentArray = [];
    for (let i = 0; i < 7; i++) {
        componentArray.push(
            <a key={i} className='list-group-item p-1 pt-0 border border-0 bg-black'>
                <div className="d-flex align-items-center w-100">
                    <div>
                        {
                            video &&
                            <Skeleton className='img rounded-0 video-img' />
                        }

                        {
                            !video &&
                            <Skeleton className='img rounded-0 square-img' />
                        }
                    </div>
                    <div className="p-1 ms-2">
                        <Skeleton className='rounded-0 mb-1 fluid-text-h3 one-line-text' />
                        {!artist &&
                            <Skeleton className='rounded-0 fluid-text-h5 one-line-text' />
                        }
                    </div>
                </div>
            </a>
        );
    }
    return (
        <div className='list-group'>
            <SkeletonTheme baseColor="#444" highlightColor="#555">
                {componentArray}
            </SkeletonTheme >
        </div>
    );
}

export const artistLoading = () => {
    return (
        <SkeletonTheme baseColor="#444" highlightColor="#555">
            <Skeleton className='object-fit-cover img-cover rounded-0' height={300} />
        </SkeletonTheme>);
}

export const playlistContentLoading = () => {

    return (
        <SkeletonTheme baseColor="#444" highlightColor="#555">
            <div className='p-1 mb-2'>
                <div className='d-flex align-items-center'>
                    <button className="btn p-0" type="button">
                        <img src="assets/images/back.svg" alt="back-btn" width={30} />
                    </button>
                    <Skeleton className='rounded-0 mb-1 ms-1 fluid-text-h3 one-line-text' />
                </div>

                <Skeleton className='rounded-0 fluid-text-h5 one-line-text' />
                <Skeleton className='rounded-0 fluid-text-h5' width={100} />

                <button className='btn position-absolute p-0 rounded-0 z-2'>
                    <img src="assets/images/play.svg" width={60} height={60} alt="PlayBtn" title='Play All' />
                </button>

                <Skeleton className='rounded-0' width={300} height={300} />
            </div>
        </SkeletonTheme>
    );
}

export default loading;