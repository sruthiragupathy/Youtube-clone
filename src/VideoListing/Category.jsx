import { NavLink, useLocation } from "react-router-dom";
import { useVideoList } from "../Context/VideoLibraryContext"
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

export const Category = () => {
    console.log("hi from category")
    const {videoLibrary} = useVideoList();
    const query = useQuery()
    const category = query.get("category")

    const getCategoryButtonClassName = (categoryName) => {
        return category === categoryName ? "btn-primary" : "btn-outline-primary"
        // return ""
    }
    return (
        <>
        <NavLink to = "/" className = "category-nav">
                <button className = {`btn ${getCategoryButtonClassName(null)}`}>All</button>
            </NavLink>
        {videoLibrary.categories.slice(0,5).map(category => {
            return <NavLink to = {`?category=${category.name}`} className = "category-nav">
                <button key = {category._id} className = {`btn ${getCategoryButtonClassName(category.name)}`}>{category.name}</button>
            </NavLink>
        }
        )}
        </>
    )
}