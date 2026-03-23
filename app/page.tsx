import React, { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoin from "@/components/home/TrendingCoin";




const page = async () => {

  return (
    <main className="main-container">
      <section className="home-grid">
        <div className='-mt-90'>
           <Suspense fallback={<div>Loading Overview...</div>}>
            <CoinOverview />
           </Suspense>
        </div>

        <div className="ml-64">
          <Suspense fallback={<div>Loading Trending...</div>}>
            <TrendingCoin />
          </Suspense>
        </div>

      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page