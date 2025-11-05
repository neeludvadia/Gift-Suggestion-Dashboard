'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Button } from './ui/button';
import { useCustomerStore } from '@/store/customerStore';
import AddCustomerDialog from './AddCustomerDialog';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomerDialog from './EditCustomerDialog';

const CustomerTable = () => {
    const {customers,updateGift,addCustomer} = useCustomerStore()


    const suggestGift = async (id: number, budget: number) => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100')
      const data = await res.json()

      // pick products under or near the budget
      const affordable = data.products.filter(
        (item: any) => item.price <= budget + 20
      )

      // choose one randomly
      const product =
        affordable[Math.floor(Math.random() * affordable.length)]

      if (!product) {
        alert('No matching products found!')
        return
      }

      // update state
      updateGift(id, {
        title: product.title,
        image: product.thumbnail,
        url: `https://dummyjson.com/products/${product.id}`,
      })
    } catch (err) {
      console.error('Error fetching gift:', err)
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
            <TableCell className='flex justify-left'>
              <div className='flex justify-center w-full'>
                {item.gift ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.gift.image}
                      alt={item.gift.title}
                      width={40}
                      height={40}
                      className="rounded-md border object-cover"
                    />
                    <a
                      href={item.gift.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {item.gift.title}
                    </a>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm italic">No gift yet</span>
                )}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex justify-center gap-2'>
                <Button size="sm" variant="outline" className='hover:cursor-pointer' onClick={()=>{suggestGift(item?.id,item?.budget)}}>
                  Suggest Gift
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
