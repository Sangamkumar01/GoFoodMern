import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {

  // console.log(props)

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  let dispatch = useDispatchCart();
  let data = useCart();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if(item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if(food.length>0) {
      if(food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity})
        return;
      } else if(food.size !== size) {
        await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, quantity: quantity, size: size});
        return;
        // console.log(data);
      }
      return;
    }
    await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, quantity: quantity, size: size})
  }

  const priceRef = useRef();
  let finalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height: "120px", objectFit: "fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text ft-5">{props.desc}</p> */}
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(e.target.value)}>
                {Array.from(Array(6), (quantity, index) => {
                  return (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr />
            <button className="btn btn-success justify-content ms-2" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
