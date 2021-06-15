import { useEffect, useState } from 'react';
import { useVideoList } from '../Context/VideoLibraryContext';
import { useNavigate } from 'react-router';

export const SearchInput = () => {
	const { videoLibrary } = useVideoList();
	const [value, setValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [openSuggestion, setOpenSuggestion] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		const suggestionList =
			inputLength === 0
				? []
				: videoLibrary.videoList.filter(
						(library) =>
							library.title.toLowerCase().search(value.toLowerCase()) !== -1,
				  );
		setSuggestions(suggestionList.slice(0, 5));
	}, [value]);

	const clickDropdownItem = (text) => {
		setValue(text);
		setOpenSuggestion(false);
	};
	const getHighlightedText = (text, highlight) => {
		// Split on highlight term and include term into parts, ignore case
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
		return (
			<div onClick={() => clickDropdownItem(text)}>
				{' '}
				{parts.map((part, i) => (
					<span
						key={i}
						className={
							part.toLowerCase() === highlight.toLowerCase() ? 'bold-txt' : ''
						}>
						{part}
					</span>
				))}{' '}
			</div>
		);
	};
	const onSearchInput = (e) => {
		setValue(e.target.value);
		setOpenSuggestion(true);
	};

	const clickSearch = (e) => {
		e.preventDefault();
		const videoId = videoLibrary.videoList.find(
			(video) => video.title.toLowerCase() === value.toLowerCase(),
		)._id;
		if (videoId) {
			setValue('');
			navigate(`/video/${videoId}`);
		}
	};
	return (
		<form className='top-navbar__form' onSubmit={(e) => clickSearch(e)}>
			<input
				placeholder='Search'
				className='form__input'
				value={value}
				onChange={(e) => onSearchInput(e)}
			/>
			<button className='form__btn btn-primary' type='submit'>
				<i className='fa fa-search'></i>
			</button>
			{suggestions.length !== 0 && openSuggestion && (
				<div className='autocomplete-items'>
					{suggestions.map((item) => {
						return getHighlightedText(item.title, value);
					})}
				</div>
			)}
		</form>
	);
};
