import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchFood, setSearchFood] = useState('');

  const loadData = async () => {
   try {
  let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
   
    const foodI=response.fooditem
    const foodC=response.foodcategory;
    // console.log(response)
    
  //  console.log(foodC)
    // console.log(foodI);

    setFoodItem([foodI[0],foodI[1],foodI[2],foodI[3],foodI[4],foodI[5],foodI[6],foodI[7],foodI[8],foodI[9],foodI[10],foodI[11]]);
    // setFoodItem(foodI);
    setFoodCategory(foodC);
    
   } catch (error) {
    console.log(error)
   }
  };

  useEffect(() => {
    loadData();
    // console.log(foodItem)
   
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchFood}
                  onChange={(e) => {setSearchFood(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(100%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(100%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?chocolate"
                className="d-block w-100"
                style={{ filter: "brightness(100%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory.length>0
          ? foodCategory.map((data,index) => {
              return (
                <div key={index} className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length>0 ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchFood.toLowerCase()))) 
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card foodItem = {filterItems}
                              options={filterItems.options[0]}  
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such item found</div>
                  )}
                </div>
              );
            })
          : ""}
        {/* <Card/> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
