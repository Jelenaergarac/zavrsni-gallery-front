import React,{useState} from 'react'

const Search = ({handleCallback}) => {
      const [searchValue, setSearchValue] = useState('');
  
  const handleChangeSearchTerm = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
   

  }


    const handleSearch = async () => {
    
      handleCallback(searchValue);
    };
    return (
        <div>
           <input
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="Search"
        />
        <button onClick={handleSearch} >Search</button>
            
        </div>
    )
}

export default Search
