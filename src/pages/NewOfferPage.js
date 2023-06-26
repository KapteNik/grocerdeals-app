import { React, useState, useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useParams } from "react-router-dom";
import "./NewOfferPage.css";
import SearchBar from "./../components/Products/SearchBar";

const NewOfferPage = () => {
  const authCtx = useContext(AuthContext);
  const storeId = Object.values(useParams());
  const userId = authCtx.userId;
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  const [thirdDropdownValue, setThirdDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [categoryTree, setCategoryTree] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products/getCategoryTree", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoryTree(data.data.data.categories);
        console.log(data.data.data.categories);
      });
  }, []);

  useEffect(() => {
    thirdDropdownValue &&
      setSelectedProductName(
        categoryTree[firstDropdownValue].subcategories[secondDropdownValue]
          .items[thirdDropdownValue].name
      );
  }, [thirdDropdownValue]);

  const jsonData = [
    {
      category: "Ποτά - Αναψυκτικά",
      subcategories: [
        {
          name: "Κρασιά",
          items: [
            {
              id: "642da20c057e5a61287e661f",
              product: "Μαλαματίνα Ρετσίνα 500ml",
            },
            {
              id: "642da20c057e5a61287e6620",
              product: "Κουρτάκη Ρετσίνα 500ml",
            },
            {
              id: "642da20c057e5a61287e6621",
              product: "Don Simon Kρασί Sangria Χαρτ 1λιτ",
            },
            {
              id: "642da20c057e5a61287e6622",
              product: "Κρασί Της Παρέας Λευκό 1λιτ",
            },
            {
              id: "642da20c057e5a61287e6623",
              product: "Κρασί Της Παρέας Ροζέ Κοκκινέλι 1λιτ",
            },
          ],
        },
        {
          name: "Mπύρες",
          items: [
            {
              id: "642da20c057e5a61287e6624",
              product: "Βεργίνα Μπύρα 500ml",
            },
            { id: "642da20c057e5a61287e6625", product: "Amstel Μπύρα 330ml" },
            {
              id: "642da20c057e5a61287e6626",
              product: "Fix Hellas Mπύρα 330ml",
            },
            {
              id: "642da20c057e5a61287e6627",
              product: "Stella Artois Μπύρα 330ml",
            },
            { id: "642da20c057e5a61287e6628", product: "Mythos Μπύρα 330ml" },
          ],
        },
      ],
    },
    {
      category: "Καθαριότητα",
      subcategories: [
        {
          name: "Είδη Γενικού Καθαρισμού",
          items: [
            {
              id: "642da20c057e5a61287e6629",
              product: "Vanish Pink Πολυκαθαριστικό Λεκέδων 30γρ",
            },
            {
              id: "642da20c057e5a61287e662a",
              product: "Εύρηκα Λευκαντικό 60γρ",
            },
            { id: "642da20c057e5a61287e662b", product: "Ajax Τζαμιών 450ml" },
            {
              id: "642da20c057e5a61287e662c",
              product: "Scotch Brite Σφουγγαράκι Πράσ Κλασ 1τεμ",
            },
            {
              id: "642da20c057e5a61287e662d",
              product: "Ava Υγρό Πιάτων Ξύδι/Μήλο/Μέντα 430ml",
            },
          ],
        },
        {
          name: "Απορρυπαντικά",
          items: [
            {
              id: "642da20c057e5a61287e662e",
              product: "Palmolive Υγρό Πιάτων Λεμόνι 500ml",
            },
            { id: "642da20c057e5a61287e662f", product: "Omo Σκόνη 425γρ" },
            {
              id: "642da20c057e5a61287e6630",
              product: "Soupline Μαλακτικό Ρούχων Λεβάντα 28μεζ",
            },
            {
              id: "642da20c057e5a61287e6631",
              product: "Εύρηκα Σκόνη Antikalk 54γρμ",
            },
          ],
        },
      ],
    },
    {
      category: "Τρόφιμα",
      subcategories: [
        {
          name: "Δημητριακά",
          items: [
            {
              id: "642da20c057e5a61287e6632",
              product: "Quaker Νιφ Βρώμης Ολ Άλεσης 500γρ",
            },
            {
              id: "642da20c057e5a61287e6633",
              product: "Nestle Fitness 375γρ",
            },
            {
              id: "642da20c057e5a61287e6634",
              product: "Nestle Fitness Dark Chocolate 375γρ",
            },
            {
              id: "642da20c057e5a61287e6635",
              product: "Nestle Nesquik 375γρ",
            },
            {
              id: "642da20c057e5a61287e6636",
              product: "Nesquik Δημητριακά Extra Choco Waves 375γρ",
            },
          ],
        },
        {
          name: "Λάδι",
          items: [
            {
              id: "642da20c057e5a61287e6637",
              product: "Μινέρβα Αραβοσιτέλαιο 1λιτ",
            },
            {
              id: "642da20c057e5a61287e6638",
              product: "Μινέρβα Ελαιόλαδο 1λιτ",
            },
            { id: "642da20c057e5a61287e6639", product: "Sol Ηλιέλαιο 1λιτ" },
            {
              id: "642da20c057e5a61287e663a",
              product: "Μέλισσα Τορτελίνια Γεμ Τυρίων 250γρ",
            },
            {
              id: "642da20c057e5a61287e663b",
              product: "Άλτις Παραδοσιακό Ελαιόλαδο Παρθένο 1λιτ",
            },
          ],
        },
      ],
    },
    {
      category: "Προσωπική Φροντίδα",
      subcategories: [
        {
          name: "Σαμπουάν - Αφρόλουτρα",
          items: [
            {
              id: "642da20c057e5a61287e663c",
              product: "Orzene Condit Μπύρας Κανον Μαλλ 250ml",
            },
            {
              id: "642da20c057e5a61287e663f",
              product: "Dove Ντούς Deeply Nourisηing 750ml",
            },
            {
              id: "642da20c057e5a61287e6640",
              product: "Noxzema Αφρόλ Talc 750ml",
            },
            {
              id: "642da20c057e5a61287e663e",
              product: "Orzene Σαμπουάν Μπύρας Κανον 400ml",
            },
          ],
        },
        {
          name: "Αποσμητικά",
          items: [
            {
              id: "642da20c057e5a61287e6641",
              product: "Dove Αποσμ Σπρέυ 150ml",
            },
            {
              id: "642da20c057e5a61287e6642",
              product: "Noxzema Αποσμ Rollon Classic 50ml",
            },
            {
              id: "642da20c057e5a61287e6643",
              product: "Dove Deodorant Κρέμα Rollon 50ml",
            },
            {
              id: "642da20c057e5a61287e6644",
              product: "Axe Αποσμ Σπρέυ Dark Temptation 150ml",
            },
          ],
        },
      ],
    },
  ];

  const handleFirstDropdownChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  const handleSecondDropdownChange = (e) => {
    setSecondDropdownValue(e.target.value);
  };

  const handleThirdDropdownChange = (e) => {
    setThirdDropdownValue(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/api/v1/offers/createOffer", {
      method: "POST",
      body: JSON.stringify({
        price: inputValue,
        product: selectedProductId,
        user: userId,
        store: storeId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  };

  return (
    <div>
      <div className="form-container">
        <SearchBar
          setSelectedProductName={setSelectedProductName}
          setSelectedProductId={setSelectedProductId}
          categoryTree={categoryTree}
        />
        <section className="newOfferForm">
          <h3 className="title">Δημιουργία Καινούργιας Προσφοράς</h3>
          <select
            value={firstDropdownValue}
            onChange={handleFirstDropdownChange}
            className="dropdown"
          >
            <option value="">Kατηγορία Προϊόντος</option>
            {categoryTree.map((category, index) => (
              <option key={index} value={index}>
                {category.category}
              </option>
            ))}
          </select>
          <select
            value={secondDropdownValue}
            onChange={handleSecondDropdownChange}
            className="dropdown"
          >
            <option value="">Υποκατηγορία Προϊόντος</option>
            {categoryTree[firstDropdownValue] &&
              categoryTree[firstDropdownValue].subcategories.map(
                (subcategory, index) => (
                  <option value={index} key={index}>
                    {subcategory.name}
                  </option>
                )
              )}
          </select>
          <select
            value={thirdDropdownValue}
            onChange={handleThirdDropdownChange}
            className="dropdown"
          >
            <option value="">Προϊόν</option>
            {categoryTree[firstDropdownValue] &&
              categoryTree[firstDropdownValue].subcategories[
                secondDropdownValue
              ] &&
              categoryTree[firstDropdownValue].subcategories[
                secondDropdownValue
              ].items.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
          </select>
        </section>
      </div>
      <div className="output-card">
        <div>
          <h5>Ονομασία Προϊόντος</h5>
          <h4 className="name">{selectedProductName}</h4>
        </div>
        <div>
          <h5>Tιμή Προϊόντος</h5>
          <input
            id="number"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <button
          type="submit"
          name="submitButton"
          value="Submit"
          className="button"
          onClick={handleSubmit}
        >
          Υποβολή Προσφοράς
        </button>
      </div>
    </div>
  );
};

export default NewOfferPage;
