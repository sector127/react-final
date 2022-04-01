import { useEffect, useState } from 'react';
// import debounce from 'lodash/debounce';

import { ProductItem } from './ProductItem';
import { Button, TextInput, Form } from '../../atoms';
import { Collapsible } from '../../components/collapsible';
import { useLocalStorage, useDebounce } from '../../hooks';

import productsData from '../../products.json';

export const Products = () => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [result, setResult] = useState(productsData.slice());
  const [filterTerm, setFilterTerm] = useLocalStorage('super-app:filter-term', '');
  const pausedSearch = useDebounce(filterTerm, 600);

  // TODO grouping by the category
  //   const renderProducts = () => {
  //       const rows = [];
  //       let lastCategory = null;

  //       productsData.forEach(product => {
  //           if( product.category !== lastCategory ) {

  //           }
  //       })
  //   }

  useEffect(() => {
    if (pausedSearch) {
      const data = productsData.filter((el) =>
        el.name.toLowerCase().includes(pausedSearch.toLowerCase())
      );
      setResult(data);
    } else {
      setResult(productsData.slice());
    }
  }, [pausedSearch]);

  const renderProducts = () => {
    console.log('__Products_RENDERING__');
    let data = result.slice();
    if (inStockOnly) {
      data = result.filter((item) => item.stock);
    }

    return data.map((item, index) => {
      return <ProductItem product={item} key={index} />;
    });
  };

  const handleFilterChange = ({ target }) => {
    setFilterTerm(target.value);
  };

  return (
    <div className="row shadow my-3 p-3">
      <h3>Products</h3>
      <Form>
        <div className="mb-3 row">
          <div className="col-8">
            <TextInput value={filterTerm} onChange={handleFilterChange} placeholder="ძიება..." />
          </div>
          <div className="col-4">
            <Button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
            >
              {inStockOnly ? '✅ მაჩვენე სრული პროდუქცია' : '🚀 მაჩვენე მარაგში მყოფი პროდუქცია'}
            </Button>
          </div>
        </div>
      </Form>
      <hr />
      <Collapsible closedTitle="მაჩვენე პროდუქცია" openedTitle="დამალე პროდუქცია">
        <div className="d-flex flex-wrap justify-content-between">{renderProducts()}</div>
      </Collapsible>
    </div>
  );
};
