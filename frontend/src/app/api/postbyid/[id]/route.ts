// import { NextRequest, NextResponse } from 'next/server';

// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

// export async function GET(
//   request: NextRequest,
//   { params }: RouteParams
// ): Promise<NextResponse> {
//   const { id } = params;

//   // Validate the ID parameter
//   if (!id || typeof id !== 'string') {
//     return NextResponse.json(
//       { error: 'Invalid post ID' },
//       { status: 400 }
//     );
//   }

//   try {
//     // Ensure the backend URL is defined
//     if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
//       throw new Error('Backend URL is not configured');
//     }

//     const response = await fetch(
//       `${process.env.NEXT_PACKBACKEND_URL}/get-post/${id}`
//     );

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return NextResponse.json(
//         { 
//           error: 'Failed to fetch post',
//           details: errorData.message || response.statusText
//         },
//         { status: response.status }
//       );
//     }

//     const post = await response.json();
//     return NextResponse.json(post);
//   } catch (err) {
//     console.error('Error fetching post:', err);
//     return NextResponse.json(
//       { 
//         error: 'An error occurred while fetching the post',
//         details: err instanceof Error ? err.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  return new Response(null, { status: 501 }); // 501 = Not Implemented
}
