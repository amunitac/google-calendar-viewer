import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async () => {
  try {
    console.log('GET /api/getCalendarEvents');

    const session = await getSession();
    console.log('Session:', session);
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('User:', user);

    const tokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    })});

    console.log('Token response:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.json();
      console.error('Failed to fetch token:', errorDetails);
      return NextResponse.json({ error: 'Failed to fetch token', details: errorDetails }, { status: tokenResponse.status });
    }

    const managementApiToken = (await tokenResponse.json()).access_token;
    console.log('Management API Token obtained:', managementApiToken);

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`, {
      headers: {
        Authorization: `Bearer ${managementApiToken}`,
      },
    });

    console.log('User details response status:', response.status);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch user details' }, { status: response.status });
    }

    const userDetails = await response.json();
    const googleIdentity = userDetails?.identities?.find((identity: any) => identity.provider === 'google-oauth2');

    if (!googleIdentity.access_token) {
      return NextResponse.json({ error: 'Google access token not found' }, { status: 401 });
    }

    const googleAccessToken = googleIdentity.access_token;

    const calendarResponse = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    )

    if (!calendarResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Google Calendar events' },
        { status: calendarResponse.status }
      );
    }

    const calendarEvents = await calendarResponse.json();

    return NextResponse.json(calendarEvents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}) as any;
