import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) return NextResponse.json({ message: 'No token provided' }, { status: 401 });

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ message: 'Welcome to the protected home route!' });
    } catch {
        return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
}
