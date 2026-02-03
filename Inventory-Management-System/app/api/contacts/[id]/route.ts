import connectDB from "@/lib/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

// fetch by id


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Change type to Promise
) {
  try {
    await connectDB();
    
    // 2. Await the params before destructuring
    const { id } = await params; 
    
    console.log("Fetching product by id:", id);

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, editProduct: product });
  } catch (error) {
    console.error("GET /api/contacts/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch Product" }, { status: 500 });
  }
}

// update by id
export async function POST(req: Request,
  { params }: { params: Promise<{ id: string }> } ) {
    try {
        await connectDB()

  const { name, sku, price, quantity, lowStockAt } = await req.json()
      const { id } = await params; 


 

  const product = await Product.findByIdAndUpdate(
    id ,
    {
      $set: {
        name,
        sku,
        quantity,
        price,
        lowStockAt,
      },
   
    },
    {
      new: true,      // return updated doc
      // create if not exists
    }
  )

  return NextResponse.json({
    success: true,
    product,
  })

    } catch (error) {
         console.error("GET /api/contacts/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch Product" }, { status: 500 });
        
    }
  }
