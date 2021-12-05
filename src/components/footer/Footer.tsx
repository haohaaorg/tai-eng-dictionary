import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer ">
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-md font-bold mb-2">
              <span>Made with</span> <strong className="text-red-500">❤</strong>{" "}
              <span>
                <a href="https://github.com/NoerNova/tai-eng-dictionary">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
