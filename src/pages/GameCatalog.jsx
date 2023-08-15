import React, { useEffect, useState } from "react";
import axios from "axios";
import SliderBanner from '../components/SliderBanner';

const GameCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [gameCatalogs, setGameCatalogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('64c8c85c34f804f984d8a057');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // console.log("try")
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }; 

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchGameCatalogs = async () => {
      try {
        console.log("try")
        const response = await axios.get(`http://localhost:8000/game-catalogs/category/${selectedCategory}`);
        setGameCatalogs(response.data);
      } catch (error) {
        console.error('Error fetching game catalogs:', error);
      }
    }; 

    fetchGameCatalogs();
  }, [selectedCategory]);
   
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-800 text-white scroll-auto mx-auto min-h-screen">
      <SliderBanner />
      <div className="container sm:scale-75 md:scale-90 lg:scale-90 lg:mx-auto lg:w-full md:flex-row md:space-x-4 md:space-y-0 ">
        <ul className="flex border-b border-gray-500 md:flex-row text-center text-sm md:text-md lg:text-lg overflow-x-scroll">
          {categories && categories.map((category, index) => (
            <li
              key={category.id}
              className={`mr-4 cursor-pointer p-2 px-1 whitespace-nowrap pb-4 ${
                selectedCategory === category.id ? 'text-bold-500  border-b-2 border-white text-white' : 'text-gray-500'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <div className="mt-8 md:mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 md:gap-2 lg:grid-cols-6 lg:gap-2 xl:grid-cols-6 xl:gap-2">
          {gameCatalogs && gameCatalogs.map((game) => (
            <div key={game.id} className="scale-90 p-2">
              <a href={`/game/${game.id}`}>
                <img
                  className='h-full w-full rounded-3xl shadow-inner'
                  src={game.imageUrl}
                  alt={game.title}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCatalog;
