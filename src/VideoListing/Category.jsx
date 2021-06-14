import { NavLink, useLocation } from 'react-router-dom';
import { useVideoList } from '../Context/VideoLibraryContext';
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

export const Category = () => {
	const { videoLibrary } = useVideoList();
	const query = useQuery();
	const category = query.get('category');

	const getCategoryButtonClassName = (categoryName) => {
		return category === categoryName ? 'btn-primary' : 'btn-outline-primary';
	};
	return (
		<>
			<NavLink to='/' className='category-nav'>
				<button className={`btn btn-br ${getCategoryButtonClassName(null)}`}>
					All
				</button>
			</NavLink>
			{videoLibrary.categories.slice(0, 4).map((category) => {
				return (
					<NavLink
						to={`?category=${category.name}`}
						className='category-nav'
						key={category._id}>
						<button
							className={`btn btn-br capitalize ${getCategoryButtonClassName(
								category.name,
							)}`}>
							{category.name}
						</button>
					</NavLink>
				);
			})}
		</>
	);
};
