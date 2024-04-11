import Link from "next/link"
import { ProductCard } from "../product/card.js"
import { useState, useEffect } from "react"
import { getProducts } from "../../data/products.js"

export function ProfileStoreCard({ store, width = "is-half" }) {

  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{store.name}</p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner: {store.seller.user.first_name} {store.seller.user.last_name}
          </p>
          <div className="content">{store.description}</div>
        </div>
        <footer className="card-footer">
          <div className="">
            {/* {products.map((product) => {
              return <ProductCard key={store.seller?.product?.id} product={product} />
            })} */}
          </div>
          <Link href={`stores/${store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}
