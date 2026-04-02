import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import DataTable from "../ui/DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Categories = async () => {
    const categories = await fetcher<Category>('/coins/categories'); 
    const columns : DataTableColumn<Category>[] = [
          { 
            header : "Name", 
            cellClassName: "category-cell", 
            cell :((category) => category.name) 
          }, 
          { 
            header : "Top Gainers", 
            cellClassName : "top-gainers-cell", 
            cell: (category) => {
              return category.top_3_coins.map( ( coin : string ) => (
                <Image src={coin} alt={coin} width={28} height={28} key={coin}/>
              )
            )}
          },
          {
            header : "24h Change",
            cellClassName : "change-header-cell",
            cell : (category) => {
              const isTrendingUp : boolean = category.market_cap_change_24h > 0; 
              const item = category.market_cap_change_24h.toFixed(2);
              return(
                <div>
                    <p>{isTrendingUp ? (<TrendingUp className="text-green-500"/>) : (<TrendingDown className="text-red-500 "/>) } {item}%</p>
                </div>
              )
            }
          }, 
          {
            header: "Market Cap",
            cellClassName : "market-cap-cell",
            cell : (category) => {
              return (
                <div>
                  <p>{` ${formatCurrency(category.market_cap)}`}</p>
                </div>
              )
            }
          }, 
          {
            header : "24h Volume", 
            cellClassName : "volume-cell",
            cell : (category) => {
              return (
                <div>
                  <p>{` ${formatCurrency(category.volume_24h)}`}</p>
                </div>
              )
            }
          },
          {
            header : "Updated at", 
            cellClassName : "updated-at-cell",
            cell : (category) => {
              return(
                <p className="text-gray-400">{category.updated_at}</p>
              )
            }
          }
    ]
    return (
            <div id ="categories" className="w-fit ml-auto mr-auto">
              <h4>Top Category</h4>
              <DataTable columns={columns} data={categories?.slice(0, 10) || []} rowKey={(_, index)=> index} tableClassName="mt-3" />
            </div>
          )
        

    }


export default Categories