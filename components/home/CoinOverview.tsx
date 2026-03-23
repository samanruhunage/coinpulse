import { fetcher } from "@/lib/coingecko.actions";
import Image from 'next/image'; 
import { formatCurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./Fallback";
import CandleStickChart from "../ui/CandleStickChart"


const CoinOverview = async () => {
    try {
          const [ coin, coinOHLCData ] = await Promise.all([
            fetcher<CoinDetailsData>('/coins/bitcoin', {
            dex_pair_format : 'symbol'
            }),
            fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
            vs_currency : 'usd', 
            days : 1, 
            
        })            
    ]); 
    return (
        <CandleStickChart data={coinOHLCData} coinId='bitcoin'  >
            <div id="coin-overveiw">
                <div className="header pt-2!">
                    <div>
                        <Image src={coin?.image?.large} width={56} height={56} alt={coin.name} />
                    </div>
                    <div className="info">
                        <p>{coin?.name} / {coin?.symbol.toUpperCase()}</p>
                        <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                    </div>
                </div>
            </div>
        </CandleStickChart>
    )
    }catch(error) { 
        console.error('Error fetching coin overview:', error); 
        return <CoinOverviewFallback />
    }
     
    
  
}

export default CoinOverview;