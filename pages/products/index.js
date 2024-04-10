import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getCategories, getCategoriesFiltered, getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({})
  const [filtering, setFiltering] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data) {
          setCategories(data);
          fetchProducts()
        }
      })
      .catch((err) => {
      });
  }, []);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          const locationData = [
            ...new Set(data.map((product) => product.location)),
          ];
          const locationObjects = locationData.map((location) => ({
            id: location,
            name: location,
          }));

          setProducts(data);
          setIsLoading(false);
          setLocations(locationObjects);
        }
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve products. Status code ${err.message} on response.`
        );
      });
      getCategoriesFiltered()
      .then((data) => {
        setFilteredProducts(data)
      })
  }, []);

  const searchProducts = (e) => {
    getProducts(e).then((products) => {
      if (e !== '') {
        setFiltering(true)
      } else {
        setFiltering(false)
      }
      setProducts(products)
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>;

  return (
    <>
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
      />
      {filtering ? (
        <div className="columns is-multiline">
          <div className="column">
            <h2>Products matching filters</h2>
            <div className="columns is-multiline">
              {products.map((product) => (
                <div key={product.id} className="column is-one-quarter">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="columns is-multiline">
          {filteredProducts
            ? categories.map((category) => (
                <div key={category.name} className="column">
                  <h2>{category.name}</h2>
                  <div className="columns is-multiline">
                    {filteredProducts[category.name]?.map((product) => (
                      <div key={product.id} className="column is-one-quarter">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : <p>No products available in this category</p>}
        </div>
      )}
    </>
  );
}


Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};