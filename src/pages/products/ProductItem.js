import { useState } from 'react';
import PropTypes from 'prop-types';

import { useCart } from '../../providers/CartProvider';
import { Alert, Button } from '../../atoms';

import './productitem.css';

export const ProductItem = ({ product }) => {
  const {
    addNewItem,
    removeItem,
    cart: { items: cartItems },
  } = useCart();
  const [outOfStock, setOutOfStock] = useState(false);
  const isInCart = product.id in cartItems;

  const handleAddToCart = () => {
    if (product.stock) {
      addNewItem(product);
    } else {
      setOutOfStock(true);
    }
  };

  return (
    <div className="card mb-1 productItem--card">
      <h4 className="card-header">
        {product.name}, ფასი - ${product.price}
      </h4>
      <div className="card-body">
        <div className="d-flex flex-column">
          {outOfStock && <Alert message="დამატება შეუძლებელია" />}
          <h6>
            {product.stock ? 'მარაგშია' : 'არ არის მარაგში'}, კატეგორია - {product.category}
          </h6>
        </div>
        <h6 className="text-muted">
          {isInCart ? `კალათაში: ${cartItems[product.id].qty}ც` : 'არ არის კალათაში 🛒'}
        </h6>
        <div className="btn-group">
          <Button
            className="btn btn-outline-success"
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            Add to Cart 🛒
          </Button>

          <Button
            className="btn btn-outline-danger"
            onClick={() => removeItem(product)}
            disabled={!isInCart}
          >
            Remove from Cart ⛔️
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};
