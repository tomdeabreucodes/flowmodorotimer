import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col justify-center mb-2 space-x-4 items-center space-y-4">
        <a
          href="https://open-launch.com/projects/simple-flowmodoro-timer"
          target="_blank"
          title="Open-Launch Top 3 Daily Winner"
        >
          <img
            src="https://open-launch.com/images/badges/top3-light.svg"
            alt="Open-Launch Top 3 Daily Winner"
            style={{ width: "195px", height: "auto" }}
            className="block dark:hidden"
          />
          <img
            src="https://open-launch.com/images/badges/top3-dark.svg"
            alt="Open-Launch Top 3 Daily Winner"
            style={{ width: "195px", height: "auto" }}
            className="hidden dark:block"
          />
        </a>
      </div>
      <div className="flex flex-col justify-center mb-8 space-x-4 items-center space-y-4">
        <div className="flex items-center gap-2">
          <a
            target="_blank"
            href="https://github.com/tomdeabreucodes/flowmodorotimer"
          >
            <Button
              className="cursor-pointer"
              aria-description="Star the repo on GitHub"
            >
              <FaGithub />
              Star <FaRegStar />
            </Button>
          </a>
          <a target="_blank" href="https://x.com/subpixelsw">
            <Button
              className="cursor-pointer"
              aria-description="Follow Subpixel Software on X"
            >
              <FaXTwitter />
              Follow
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
