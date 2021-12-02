import * as React from "react";

import { useTheme } from "next-themes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggleButton = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [buttonIcon, setButtonIcon] = React.useState(faLightbulb);

  React.useEffect(() => {
    setIsMounted(true);
    setButtonIcon(theme === "light" ? faMoon : faLightbulb);
  }, [theme]);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // toogle darkmode button
  return (
    <button
      className="darkmode-toggle-button"
      onClick={switchTheme}
      aria-label="darkmode-toggle-button"
      type="button"
      id="darkmode-toggle-button"
    >
      <span>
        <FontAwesomeIcon color="white" icon={buttonIcon} />
      </span>
    </button>
  );
};

export default DarkModeToggleButton;
