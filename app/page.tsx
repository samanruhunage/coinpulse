import React, { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoin from "@/components/home/TrendingCoin";
import Categories from "@/components/home/Categories";
import { CoinOverviewFallback, TrendingCoinFallback } from "@/components/home/Fallback";




const page = async () => {

  return (
    <main className="main-container">
      <section className="home-grid">
        <div className='ml-auto mr-atuo md:-mt-30 md:ml-20'>
           <Suspense fallback={<CoinOverviewFallback />}>
            <CoinOverview />
           </Suspense>
        </div>

        <div className="ml-auto mr-auto md:ml-80">
          <Suspense fallback={<TrendingCoinFallback />}>
            <TrendingCoin />
          </Suspense>
        </div>

      </section>

      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<div>Loading Categories... </div>}>
          <Categories />
        </Suspense>
      </section>
    </main>
  )
}

export default page