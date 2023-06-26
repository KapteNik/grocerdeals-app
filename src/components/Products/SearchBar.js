import { React, useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const NewOfferPage = (props) => {
  const entries = [];
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const jsonData = [
    {
      product: "Μαλαματίνα Ρετσίνα 500ml",
      id: "1",
    },
    {
      product: "Κουρτάκη Ρετσίνα 500ml",
      id: "5",
    },
    {
      product: "Don Simon Kρασί Sangria Χαρτ 1λιτ",
      id: "4",
    },
    {
      product: "Κρασί Της Παρέας Λευκό 1λιτ",
      id: "3",
    },
    {
      product: "Κρασί Της Παρέας Ροζέ Κοκκινέλι 1λιτ",
      id: "2",
    },
  ];

  useEffect(() => {
    props.categoryTree.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.items.forEach((item) => {
          entries.push({ id: item.id, name: item.name });
        });
      });
    });

    return console.log(entries);
  }, [props.categoryTree]);

  const fetchData = (value) => {
    // const results = jsonData.filter((product) => {
    //   return value && product && product.product.toLowerCase().includes(value);
    const results = entries.filter((product) => {
      console.log(product.name);
      // return value && product && product.name.toLowerCase().includes(value);
    });
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleOnClick = (result) => {
    props.setSelectedProductName(result.product);
    props.setSelectedProductId(result.id);

    setInput([]);
    setResults([]);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <FaSearch id="search-icon"></FaSearch>
        <input
          className="search-input"
          placeholder="Type to search ..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        ></input>
      </div>
      <div className="results-list">
        {results.map((result, index) => {
          return (
            <div
              key={index}
              className="search-result"
              value={index}
              onClick={(e) => handleOnClick(result)}
            >
              {result.product}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewOfferPage;
