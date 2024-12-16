/* eslint-disable @next/next/no-html-link-for-pages */
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    user ? (
      <div>
        <h1>Welcome {user.name}</h1>
        <a href="/api/auth/logout">Logout</a>
      </div>
    ) : (
      <a href="/api/auth/login">Login</a>
    )
  );
}
