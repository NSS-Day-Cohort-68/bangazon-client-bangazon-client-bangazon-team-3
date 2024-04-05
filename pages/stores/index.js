import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { StoreCard } from "../../components/store/card"
import { getStores } from "../../data/stores"

export default function Stores() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    getStores().then((data) => {
      if (data) {
        setStores(data)
      }
    })
  }, [])

  //++   /$$$$$$$$ /$$$$$$        /$$$$$$$   /$$$$$$
  //++  |__  $$__//$$__  $$      | $$__  $$ /$$__  $$
  //++     | $$  | $$  \ $$      | $$  \ $$| $$  \ $$
  //++     | $$  | $$  | $$      | $$  | $$| $$  | $$
  //++     | $$  | $$  | $$      | $$  | $$| $$  | $$
  //++     | $$  | $$  | $$      | $$  | $$| $$  | $$
  //++     | $$  |  $$$$$$/      | $$$$$$$/|  $$$$$$/
  //++     |__/   \______/       |_______/  \______/

  //++ Alter database to confirm a store with ZERO items does not show up in list of stores

  return (
    <>
      <h1 className="title">Stores</h1>
      <div className="columns is-multiline">
        {stores.map(
          (store) =>
            store.products.length !== 0 && (
              <StoreCard store={store} key={store.id} />
            )
        )}
      </div>
    </>
  )
}

Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
