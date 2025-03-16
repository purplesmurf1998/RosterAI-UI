import { getSession } from '@auth0/nextjs-auth0/edge';
import { Button } from "../ui/button";
import Selectors from './Selectors';
import { selectTeamsForUser } from '@/app/api/repositories/teams';

export default async function TopNavigationBar() {
  const session = await getSession();
  const user = session?.user;

  const teams = user && await selectTeamsForUser(user.sid);

  console.log(teams);

  return (
    <div className="flex w-full p-2 items-center">
      <div className="flex gap-2 ml-auto items-center">
        {teams && <Selectors teams={teams} />}
        <a href="/api/auth/logout">
          <Button className="flex gap-2 items-center" variant="ghost">
            <span>{user && user.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </Button>
        </a>
      </div>
    </div>
  )
}