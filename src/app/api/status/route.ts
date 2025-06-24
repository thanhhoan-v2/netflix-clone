import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

type StatusCheck = {
    id: string;
    client_name: string;
    timestamp: Date;
};

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const statusChecks = await db
            .collection('status_checks')
            .find({})
            .limit(1000)
            .toArray();

        return NextResponse.json(statusChecks, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error fetching status checks' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { client_name } = await request.json();

        if (!client_name) {
            return NextResponse.json({ error: 'client_name is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const newStatusCheck: StatusCheck = {
            id: uuidv4(),
            client_name,
            timestamp: new Date(),
        };

        await db.collection('status_checks').insertOne(newStatusCheck);

        return NextResponse.json(newStatusCheck, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error creating status check' }, { status: 500 });
    }
}
