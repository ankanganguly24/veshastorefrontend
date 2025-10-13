import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxyRequest(request, endpoint) {
  const url = `${API_BASE_URL}/auth/${endpoint}`;
  
  try {
    const body = request.method !== 'GET' ? await request.text() : undefined;
    
    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward other headers if needed
      },
      body,
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const endpoint = params.auth.join('/');
  return proxyRequest(request, endpoint);
}

export async function POST(request, { params }) {
  const endpoint = params.auth.join('/');
  return proxyRequest(request, endpoint);
}

export async function PUT(request, { params }) {
  const endpoint = params.auth.join('/');
  return proxyRequest(request, endpoint);
}

export async function DELETE(request, { params }) {
  const endpoint = params.auth.join('/');
  return proxyRequest(request, endpoint);
}
