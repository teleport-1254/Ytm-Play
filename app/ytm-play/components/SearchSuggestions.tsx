import { useState } from 'react';
import { MouseEvent } from 'react';
import { SearchSuggestionsProps } from '../typings/intefaces';

const SearchSuggestions = ({ suggestions, gettingClikedQuery }: SearchSuggestionsProps) => {

    const [suggestionClicked, setSuggestionClicked] = useState(-1);

    // console.log(suggestions);

    const handleClick = (e: MouseEvent<HTMLLIElement>, index: number) => {
        setSuggestionClicked(index);
        // console.log(e.target.innerHTML);
        const liElement = e.target as HTMLLIElement;
        let selectedLiElement = liElement.innerHTML;
        gettingClikedQuery(selectedLiElement);
    }
    return (
        <ul className="list-group p-1 ">
            {
                suggestions.map((item, index) => (
                    <li key={item}
                        onClick={(e) => { handleClick(e, index) }}
                        className={suggestionClicked == index ? "border border-0 list-group-item d-flex justify-content-center bg-body-secondary" :
                            "border border-0 list-group-item d-flex justify-content-center"}>{item}</li>
                ))
            }
        </ul>
    );
}

export default SearchSuggestions;