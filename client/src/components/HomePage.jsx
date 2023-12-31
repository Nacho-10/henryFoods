import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  dietTypeFilter,
  aplhabeticalSort,
  healthScoreSort,
} from "../actions";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import "./HomePage.css";
import Image from "../images/logo.png";

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [recipesPage] = useState(9);
  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;

  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleHealthScoreSort(e) {
    e.preventDefault();
    dispatch(healthScoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <Fragment>
      <div className="header">
        <Link to="/">
          <img src={Image} alt="logo" className="logo" />
        </Link>
      </div>

      <div className="home">
        <SearchBar />

        <br />
        <div>
          <button className="refreshButton" onClick={handleClick}>
            Refresh recipes
          </button>

          <Link to="/recipe">
            <button className="addButton">Add new recipe</button>
          </Link>
        </div>

        <div className="select">
          <label className="filters">Sort:</label>

          <select
            className="select"
            name="alphabetical"
            onChange={(e) => handleAlphabeticalSort(e)}
            defaultValue={"default"}
          >
            <option disabled value="default">
              Alphabetical
            </option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>

          <select
            className="select"
            name="numerical"
            onChange={(e) => handleHealthScoreSort(e)}
            defaultValue={"default"}
          >
            <option disabled value="default">
              Health Score
            </option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
          </select>

          <label className="filters">Diet Types:</label>
          <select
            className="select"
            name="diets"
            onChange={(e) => handleDietTypeFilter(e)}
            defaultValue={"default"}
          >
            <option disabled value="default">
              Select diet...
            </option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Keto</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto vegetarian">Lacto-Vegetarian</option>
            <option value="ovo vegetarian">Ovo-Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="paleolithic">Paleo</option>
            <option value="primal">Primal</option>
            <option value="low fodmap">Low FODMAP</option>
            <option value="whole 30">Whole30</option>
            <option value="dairy free">Dairy Free</option>
          </select>
        </div>

        <Paged
          recipesPage={recipesPage}
          allRecipes={allRecipes.length}
          paged={paged}
        />

        <div className="allrecipes">
          {showRecipesPage?.map((e) => {
            return showRecipesPage.length === 0 ? (
              <div className="noRecipes">
                <img src="../images/loading-opaque.gif" alt="Loading..." />
              </div>
            ) : (
              <div className="eachRecipe" key={prevId++}>
                <Link className="linkRecetas" to={`home/${e.id}`}>
                  <Recipe
                    image={
                      e.image
                        ? e.image
                        : "https://c.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif"
                    }
                    name={e.name}
                    dietTypes={e.dietTypes}
                    healthScore={e.healthScore}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <Paged
          recipesPage={recipesPage}
          allRecipes={allRecipes.length}
          paged={paged}
        />
      </div>
    </Fragment>
  );
}
