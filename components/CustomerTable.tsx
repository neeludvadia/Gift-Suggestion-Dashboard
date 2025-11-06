'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Button } from './ui/button';
import { useCustomerStore } from '@/store/customerStore';
import AddCustomerDialog from './AddCustomerDialog';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomerDialog from './EditCustomerDialog';
import { useState } from 'react';


// tiny helper to await delays
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

// small status component (inline)
function AiStatus({ text }: { text: string | null }) {
  if (!text) return null
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <svg className="w-4 h-4 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span>{text}</span>
    </div>
  )
}


const CustomerTable = () => {
    const {customers,updateGift,addCustomer} = useCustomerStore()


      const [loadingId, setLoadingId] = useState<number | null>(null)
  const [aiStatusById, setAiStatusById] = useState<Record<number, string | null>>({})
  
  const setStatus = (id: number, text: string | null) =>
    setAiStatusById((s) => ({ ...s, [id]: text }))

  const suggestGift = async (id: number, budget: number, occasion?: string) => {
    try {
      setLoadingId(id)
      setStatus(id, 'Analyzing customer profile...')
      await wait(400)

      setStatus(id, 'Searching catalog for matches...')
      await wait(600)

      // fetch list (limit to 100 to keep it quick)
      const res = await fetch('https://dummyjson.com/products?limit=100')
      const data = await res.json()

      setStatus(id, 'Selecting the best match...')
      await wait(500)

      const affordable = data.products.filter((p: any) => p.price <= (budget || 0) + 30)

      // fallback: if none affordable, allow closest under higher threshold
      let product = affordable.length
        ? affordable[Math.floor(Math.random() * affordable.length)]
        : data.products
            .sort((a: any, b: any) => Math.abs(a.price - budget) - Math.abs(b.price - budget))[0]

      if (!product) {
        setStatus(id, null)
        alert('No matching products found.')
        return
      }

      // small final delay to feel deliberate
      await wait(350)
      const explanation = `Selected because it fits the $${budget} budget and matches the ${occasion} occasion.`;
      // build gift object
      const gift = {
        title: product.title,
        image: product.thumbnail || product.images?.[0] || '',
        url: `https://dummyjson.com/products/${product.id}`,
        explanation
      }

      // Update Zustand store
      updateGift(id, gift)

      // show a friendly status then clear after a bit
      setStatus(id, `Suggested: ${product.title}`)
      await wait(1400)
      setStatus(id, null)
    } catch (err) {
      console.error('suggestGift error', err)
      setStatus(id, null)
    } finally {
      setLoadingId(null)
    }
  }


  return (
    <div className='rounded-2xl border-2 p-2 mt-4'>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Customer List</h2>
        <AddCustomerDialog />
      </div>
       <Table>
      {/* <TableCaption>list of Customers</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Occasion</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead className='text-center'>Gift</TableHead>
          <TableHead className='text-center'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((item,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item?.id}</TableCell>
            <TableCell className="font-medium">{item?.name}</TableCell>
            <TableCell>{item?.occasion}</TableCell>
            <TableCell>{item?.company}</TableCell>
            <TableCell>{item?.budget}</TableCell>
            {/* <TableCell className="text-right">{item?.}</TableCell> */}
            <TableCell>
                {/* show ai status first if present, otherwise show gift card or placeholder */}
                {aiStatusById[item.id] ? (
                  <AiStatus text={aiStatusById[item.id]} />
                ) : item.gift ? (
                  <div className="flex items-center justify-start gap-3">
                    {/* use unoptimized if you don't want to configure domains */}
                    <Image
                      src={item.gift.image || '/placeholder.png'}
                      alt={item.gift.title}
                      width={56}
                      height={56}
                      className="rounded-md border object-cover"
                      unoptimized
                    />
                    <div>
                      {
                        item?.gift && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 my-1 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded-full animate-ai-badge">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.53 4.703c.3.921-.755 1.688-1.54 1.118l-3.998-2.85a1 1 0 00-1.154 0l-3.998 2.85c-.784.57-1.838-.197-1.539-1.118l1.53-4.703a1 1 0 00-.364-1.118L2.078 10.1c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.673z"
                          />
                        </svg>
                        AI Suggested
                      </div>
                        )
                        }
                      <div className="text-sm font-medium text-wrap">{item.gift.title}</div>
                      <a className="text-xs text-indigo-600 hover:underline" href={item.gift.url} target="_blank" rel="noreferrer">
                        View Product →
                      </a>
                      <p className="text-xs text-gray-500 mt-1 animate-fade-in">
                        {item.gift.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No suggestion yet</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                  className='hover:cursor-pointer'
                    size="sm"
                    variant="outline"
                    onClick={() => suggestGift(item.id, item.budget || 0, item.occasion)}
                    disabled={loadingId === item.id}
                  >
                    {loadingId === item.id ? 'Thinking…' : 'Suggest Gift'}
                  </Button>
                <EditCustomerDialog customer={item} />
                 <DeleteCustomerDialog id={item.id} name={item.name} />
                </div>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
    </div>
  );
}

export default CustomerTable;
