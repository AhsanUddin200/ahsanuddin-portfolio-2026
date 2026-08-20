import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  FolderKanban,
  User,
  BriefcaseBusiness,
  Mail,
  Bot,
  X,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";

const commands = [
  {
    id: "projects",
    label: "View Projects",
    description: "Explore selected work",
    icon: FolderKanban,
    target: "#projects",
  },
  {
    id: "about",
    label: "About Ahsan",
    description: "Profile and background",
    icon: User,
    target: "#about",
  },
  {
    id: "project-type",
    label: "Choose Your Project",
    description: "Find the right solution",
    icon: BriefcaseBusiness,
    target: "#project-type",
  },
  {
  id: "testimonials",
  label: "Testimonials",
  description: "See what clients say about my work",
  icon: MessageSquareQuote,
  target: "#testimonials",
},
  {
    id: "contact",
    label: "Contact Me",
    description: "Start a conversation",
    icon: Mail,
    target: "#contact",
  },
  {
    id: "ask",
    label: "Ask Me",
    description: "Portfolio AI assistant",
    icon: Bot,
    disabled: true,
  },
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef(null);

  const filteredCommands = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return commands;
    }

    return commands.filter((command) => {
      return (
        command.label.toLowerCase().includes(value) ||
        command.description.toLowerCase().includes(value)
      );
    });
  }, [query]);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const runCommand = (command) => {
    if (!command || command.disabled) {
      return;
    }

    closePalette();

    setTimeout(() => {
      document.querySelector(command.target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setOpen((currentValue) => !currentValue);
        return;
      }

      if (event.key === "Escape") {
        closePalette();
      }
    };

    const handleExternalOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleShortcut);

    window.addEventListener(
      "open-command-palette",
      handleExternalOpen
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );

      window.removeEventListener(
        "open-command-palette",
        handleExternalOpen
      );
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    setActiveIndex(0);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 120);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (event) => {
    if (!filteredCommands.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % filteredCommands.length;
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((currentIndex) => {
        return (
          currentIndex -
          1 +
          filteredCommands.length
        ) % filteredCommands.length;
      });
    }

    if (event.key === "Enter") {
      event.preventDefault();

      runCommand(filteredCommands[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={closePalette}
        >
          <motion.div
            className="command-palette"
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="command-palette-top">
              <div className="command-brand">
                <span className="command-brand-icon">
                  <Sparkles size={14} />
                </span>

                <div>
                  <strong>Command Palette</strong>
                  <small>Navigate Ahsan&apos;s portfolio</small>
                </div>
              </div>

              <button
                type="button"
                className="command-close"
                onClick={closePalette}
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            <div className="command-search">
              <Search size={18} />

              <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="Search portfolio..."
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                onKeyDown={handleInputKeyDown}
              />

              <kbd>ESC</kbd>
            </div>

            <div className="command-results">
              <div className="command-results-label">
                NAVIGATE
              </div>

              {filteredCommands.length > 0 ? (
                filteredCommands.map(
                  (command, index) => {
                    const Icon = command.icon;

                    return (
                      <button
                        key={command.id}
                        type="button"
                        className={`command-result ${
                          activeIndex === index
                            ? "active"
                            : ""
                        } ${
                          command.disabled
                            ? "disabled"
                            : ""
                        }`}
                        onMouseEnter={() =>
                          setActiveIndex(index)
                        }
                        onClick={() =>
                          runCommand(command)
                        }
                      >
                        <span className="command-result-icon">
                          <Icon size={17} />
                        </span>

                        <span className="command-result-content">
                          <strong>
                            {command.label}
                          </strong>

                          <small>
                            {command.description}
                          </small>
                        </span>

                        {command.disabled ? (
                          <span className="command-coming-soon">
                            SOON
                          </span>
                        ) : (
                          <span className="command-enter">
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  }
                )
              ) : (
                <div className="command-no-results">
                  <Search size={20} />

                  <span>
                    No matching command found
                  </span>
                </div>
              )}
            </div>

            <div className="command-footer">
              <div>
                <span>
                  <kbd>↑</kbd>
                  <kbd>↓</kbd>
                  Navigate
                </span>

                <span>
                  <kbd>↵</kbd>
                  Select
                </span>
              </div>

              <span className="command-footer-shortcut">
                <kbd>Ctrl</kbd>
                <kbd>K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;