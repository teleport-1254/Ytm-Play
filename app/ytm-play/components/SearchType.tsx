import { MouseEvent, useState } from 'react';
import { SearchTypeProps } from '../typings/intefaces';

const SearchType = ({ gettingSelectedType }: SearchTypeProps) => {
    const types = ['Songs', 'Videos', 'Artists', 'Playlists'];

    const [typeSelected, setType] = useState(0);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
        setType(index);
        // console.log(e.target.innerHTML);
        const liElement = e.target as HTMLLIElement;
        let type = liElement.innerHTML;
        // console.log(type);
        

        switch (type) {
            case 'Songs':
                gettingSelectedType('SONG');
                break;
            case 'Videos':
                gettingSelectedType('VIDEO');
                break;
            case 'Artists':
                gettingSelectedType('ARTIST');
                break;
            case 'Playlists':
                gettingSelectedType('PLAYLIST');
                break;

        }
    }
    return (
        <div className='nav'>
            {
                types.map((item, index) => (
                    <div key={item} className={
                        typeSelected == index ?
                            "fluid-text-h5 w-25 text-center" :
                            "fluid-text-h5 w-25 text-center bg-body"
                    }>
                        <a
                            key={item}
                            className="navbar-toggler p-2 w-100 text-decoration-none"
                            type="button"
                            onClick={(e) => { handleClick(e, index) }}>
                            {item}
                        </a>
                    </div>
                ))
            }
        </div>
    );
}

export default SearchType;