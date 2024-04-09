import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getCategories, getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getCategories()
    .then((data) => {
      if (data) {
        setCategories(data)
      }
    })
    .catch((err) => {
      console.log("Error fetching categories:", err)
    })
  },[])

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
  }, []);

  const searchProducts = (event) => {
    getProducts(event).then((productsData) => {
      if (productsData) {
        setProducts(productsData);
      }
    });
  };

  if (isLoading) return <p>{loadingMessage}</p>;

  //   return (
  //     <>
  //       <Filter
  //         productCount={products.length}
  //         onSearch={searchProducts}
  //         locations={locations}
  //       />

  //       <div className="columns is-multiline">
  //         {products.map((product) => (
  //           <ProductCard product={product} key={product.id} />
  //         ))}
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
      />

      <div className="columns is-multiline">
        {categories.map((category) => (
          <div key={category.name} className="column">
            <h2>{category.name}</h2>
            <div className="columns is multiline">
              {products
                .filter((product) => product.category === category.name)
                .map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
      </div>
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
