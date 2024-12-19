export const getAuth0ManagementToken = async (): Promise<string> => {
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
    }),
  });

  if (!tokenResponse.ok) {
    const errorDetail = await tokenResponse.json();
    throw new Error(`Failed to fetch Auth0 Management Token: ${JSON.stringify(errorDetail)}`);
  }

  const { access_token } = await tokenResponse.json();
  return access_token;
};

export const getUserDetails = async (managementApiToken: string, userId: string) => {
  const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${managementApiToken}`,
    },
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(`Failed to fetch user details: ${JSON.stringify(errorDetail)}`);
  }

  return await response.json();
};

export const getGoogleCalendarEvents = async (googleAccessToken: string) => {
  const calendarResponse = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  if (!calendarResponse.ok) {
    const errorDetail = await calendarResponse.json();
    throw new Error(`Failed to fetch Google Calendar events: ${JSON.stringify(errorDetail)}`);
  }

  return await calendarResponse.json();
};