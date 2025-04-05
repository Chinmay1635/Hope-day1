import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace with your actual FastAPI backend URL
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/offlineIssue`
    );

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: `Error fetching SMS data: ${response.statusText}` },
        { status: response.status }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: `Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
