import connectDB from "@/lib/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  await connectDB()

  const { name, sku, price, quantity, lowStockAt } = await req.json()

  if (!name || !sku) {
    return NextResponse.json(
      { message: "Name and SKU are required" },
      { status: 400 }
    )
  }
 let exist = await Product.findOne({sku})
 if(exist){
   return NextResponse.json({
    success: false,
    message:"Product with same SKU already esists"
    
  })

 }
  const product = await Product.findOneAndUpdate(
    { name, sku }, // find condition
    {
      $set: {
        price,
        lowStockAt,
      },
      $inc: {
        quantity, // adds to existing quantity
      },
    },
    {
      new: true,      // return updated doc
      upsert: true,   // create if not exists
    }
  )

  return NextResponse.json({
    message:"true",
    success: true,
    product,
  })
}


// fetch all data
export async function GET(){
    await connectDB()
    try {
        const products = await Product.find()
        if(products){
            return  NextResponse.json({products})
        }else{
                        return  NextResponse.json({message:"No Existing Products"})

        }
        
    } catch (error) {
         console.error("GET /api/Products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch Products" },
      { status: 500 }
    );
        
    }

    


}





// delete  function
export async function DELETE(req:Request){
    try {

        await connectDB()


       const {id} = await req.json()

       const check = await Product.findById(id)
       if(!check){
        return NextResponse.json({success:false,message:"Item non existent"})
       }
        await Product.findByIdAndDelete(id)
         return NextResponse.json({success:true, message: "Product deleted" }, { status: 200 });

        
    } catch (error) {
         console.error("DELETE /api/Products error:", error);
    return NextResponse.json(
      { message: "Failed to delete Product" },
      { status: 500 }
    );
        
    }

}