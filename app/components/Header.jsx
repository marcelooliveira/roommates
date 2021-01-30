import React from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome as fasHome, faBed as fasBed, faBath as fasBath, faCar as fasCar } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h3 className="title m-0 p-2">
            <FontAwesomeIcon icon={fasHome} />
            &nbsp;
            Roommate Matching App
            &nbsp;
            <FontAwesomeIcon icon={fasHome} />
            </h3>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!user?.isLoggedIn && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
                <Link href="/profile-sg">
                  <a>
                    <img src={user.avatarUrl} width={20} height={20} /> Profile
                    (Static Generation, recommended)
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-ssr">
                  <a>Profile (Server-side Rendering)</a>
                </Link>
              </li>
              <li>
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    await mutateUser(
                      fetchJson("/api/logout", { method: "POST" }),
                    );
                    router.push("/login");
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <a href="https://github.com/vvo/next-iron-session">
              <img src="/GitHub-Mark-Light-32px.png" widht="32" height="32" />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
};

export default Header;
