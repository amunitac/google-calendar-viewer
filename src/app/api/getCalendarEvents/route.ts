import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getAuth0ManagementToken, getUserDetails, getGoogleCalendarEvents } from '../../utils/apiHelpers';

export const GET = withApiAuthRequired(async () => {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const managementApiToken = await getAuth0ManagementToken();
    const userDetails = await getUserDetails(managementApiToken, user.sub);

    const googleIdentity = userDetails?.identities?.find(
      (identity: { provider: string }) => identity.provider === 'google-oauth2'
    );

    if (!googleIdentity?.access_token) {
      return NextResponse.json({ error: 'Google access token not found' }, { status: 401 });
    }

    const calendarEvents = await getGoogleCalendarEvents(googleIdentity.access_token);

    return NextResponse.json(calendarEvents, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
});
