import { NextResponse } from "next/server";


export async function GET() {
	return NextResponse.json({
		status: 200,
		data: "Pinguei no portfolio",
		});
	
}


export async function POST(request: Request){
	
	const data = await request.json();
	const size = Object.keys(data).length;
	if (size < 1){
		return NextResponse.json({
		status: 400,
		data: "No data received",
		});
	}
		
	return NextResponse.json({
		data,
		});
}