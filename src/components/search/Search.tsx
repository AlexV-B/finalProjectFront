import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './search.module.css';
import SearchResultsPage from './SearchResultsPage'
import SearchData from '../data/SearchData.json';
import CategoryManager from 'components/categories/CategoryManager';

interface SearchItem {
  id: number;
  title: string;
  description: string;
  group: string;
}

interface SearchProps {
  setError: (message: string | null) => void;
  setSearchResults: (results: SearchItem[]) => void;
  categories: string[];
  //results: SearchItem[]; 
}

const Search = (props: SearchProps) => {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Флаг, что был выполнен поиск
  
  const groups = props.categories;
  //const groups = ['продукт', 'маркетинг', 'блог'];
  const navigate = useNavigate(); // Хук для навигации

  const validateSearch = () => {
    if (!query.trim()) {
      props.setError('');
      navigate('/search-error', { state: { error: 'Пожалуйста, введите строку поиска.' } });
      return false;
    }
    if (!group.trim()) {
      props.setError('');
      navigate('/search-error', { state: { error: 'Пожалуйста, выберите категорию для поиска.' } });
      return false;
    }
    props.setError(null);  // Сброс ошибки, если все условия выполнены
    return true;
  };

  const handleSearch = async () => {
    if (!validateSearch()) {
      setQuery(''); // Очистка запроса при ошибке
      setGroup('');
      return;
    }
    setIsSearching(true); 
    try {
      // Фильтрация данных из SearchData по введенному запросу и выбранной категории
      const filteredResults = SearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) &&
          (group ? item.group === group : true)  // Если категория выбрана, фильтруем по ней
      );

      props.setSearchResults(filteredResults); // Сохраняем результаты поиска
      setHasSearched(true);
      navigate('/search-results', { state: { searchResults: filteredResults } });


    } catch (error) {
      props.setError('');
      navigate('/search-error', { state: { error: 'Ошибка при выполнении поиска. Попробуйте снова.'}});   {/*error: 'Ошибка при выполнении поиска. Попробуйте снова.' */}
    } finally {
      setIsSearching(false);
      setQuery('');
      setGroup('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(e.target.value);
    if (e.target.value.trim()) {
      props.setError(null);  // Сбрасываем ошибку, если категория выбрана
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#999"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M10 2a8 8 0 016.32 12.906l4.387 4.386-1.414 1.415-4.387-4.386A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
          </svg>
        </div>
        <select
          value={group}
          onChange={handleGroupChange}
          className={styles.searchSelect}
        >
          <option value="">Выберите категорию</option>
          
          {groups.map((group) => (
            <option key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </option>
          ))} 
        </select>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Введите запрос для поиска"
          className={styles.searchInput}
        />
      </div>

      {/* Результаты поиска */}
      {/* <div className={styles.resultsContainer}>
        {isSearching ? (
          <p>Идет поиск...</p>
        ) : hasSearched && results.length === 0 ? (
          <p>Нет результатов для отображения.</p>
        ) : (
          results.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>*/}
    </div>
  );
};

export default Search;