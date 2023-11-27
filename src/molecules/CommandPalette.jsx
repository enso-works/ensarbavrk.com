import * as React from 'react';
import { IF, IF_Else } from '@/atoms/Conditionals';
import classNames from 'classnames';
import { SearchIcon } from '@/atoms/icons/SearchIcon';
import { Command } from '@/atoms/command/Command';
import { useContext, useEffect, useRef, useState } from 'react';
import { CommandEventTypes, KeyboardEventContext } from '@/lib/keyboardService';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import { MoonIcon, SunIcon } from '@/atoms/icons';
import { useOutsideClick } from '@/lib/utilHooks';

const BlogCommands = {
  ABOUT: {
    label: 'About',
    description: 'About me',
    pathTo: '/about',
    closePalette: true,
    idx: 0,
  },
  BLOG: {
    label: 'Blog',
    description: 'Jump to the articles',
    closePalette: true,
    pathTo: '/blog',
    idx: 1,
  },
  SWITCH_COLOR_MODE: {
    label: 'Switch color mode',
    closePalette: false,
    idx: 2,
  },
};

const changeFocus = (idx, cmdRef) => {
  const command = Object.values(BlogCommands)?.find(
    (command) => command.idx === idx
  );
  if (command) {
    const ref = cmdRef.current[idx];
    if (ref) {
      ref.focus();
    }
    let focusedElement = document.activeElement;
    console.log('FOCUSED ELEMENT', focusedElement);
  }
};

export const CommandPalette = () => {
  const [activeCommands, setActiveCommands] = useState(BlogCommands);
  const commandsRefs = useRef([]);
  const searchBox = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { keyboardEvent, resetKeyPress } = useContext(KeyboardEventContext);
  const [toggle, isDarkMode] = useToggleDarkMode();

  const focusedCursorRef = useRef(null);

  const commandPaletteModalRef = useOutsideClick(() => {
    resetKeyPress();
  });

  useEffect(() => {
    if (
      [
        CommandEventTypes.COMMAND_PLATE_OPEN_PRESS,
        CommandEventTypes.COMMAND_PLATE_CLOSE_PRESS,
        CommandEventTypes.COMMAND_PLATE_OPEN_RELEASE,
        CommandEventTypes.COMMAND_PLATE_CLOSE_RELEASE,
      ].includes(keyboardEvent)
    ) {
      setActiveCommands(BlogCommands);
      setIsOpen(keyboardEvent.includes('OPEN'));
    }

    if (isOpen) {
      if (keyboardEvent === CommandEventTypes.NAVIGATE_UP_PRESS) {
        focusedCursorRef.current =
          focusedCursorRef.current - 1 < 0
            ? commandsRefs.current.length - 1
            : focusedCursorRef.current - 1;
        changeFocus(focusedCursorRef.current, commandsRefs);
      }

      if (keyboardEvent === CommandEventTypes.NAVIGATE_DOWN_PRESS) {
        focusedCursorRef.current =
          focusedCursorRef.current + 1 > commandsRefs.current.length - 1
            ? 0
            : focusedCursorRef.current + 1;
        changeFocus(focusedCursorRef.current, commandsRefs);
      }
      console.log('EVENT ', keyboardEvent);
      if (keyboardEvent === CommandEventTypes.OPEN_LINK_PRESS) {
        console.log('do the magic');
      }
    }
  }, [keyboardEvent]);

  const commandLabels = Object.keys(activeCommands);

  return (
    <div
      className={classNames(
        'flex flex-1 items-center transition-all ease-in-out duration-300 justify-center bg-slate-400/40 overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 ',
        { 'opacity-0': !isOpen, 'pointer-events-none': !isOpen }
      )}>
      <IF predicate={isOpen}>
        <div className="flex flex-col relative" ref={commandPaletteModalRef}>
          <div className="relative bg-bgPrimary rounded-lg w-full w-[38rem] drop-shadow-md">
            <label className="relative block text-lg font-normal">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <SearchIcon />
              </span>
              <input
                ref={searchBox}
                autoComplete="off"
                onChange={(event) => {
                  const searchTerm = event.target.value.trim().toLowerCase();
                  if (searchTerm === '') {
                    setActiveCommands(BlogCommands);
                  } else {
                    setActiveCommands((prev) => {
                      return Object.keys(prev)
                        .filter((label) =>
                          label.toLowerCase().includes(searchTerm)
                        )
                        .reduce((acc, key) => {
                          acc[key] = BlogCommands[key];
                          return acc;
                        }, {});
                    });
                  }
                }}
                className="w-full border border-primary rounded-t-md py-4 pl-16 pr-8 focus:outline-none focus:border-primary text-text bg-bgPrimary"
                placeholder="Search for anything..."
                type="text"
                name="search"
              />
            </label>
          </div>
          <ul className="flex flex-col bg-bgPrimary drop-shadow-md rounded-b-lg py-2 fixed-list">
            {commandLabels.length > 0 ? (
              commandLabels.map((key) => {
                const isColorModeKey = key === 'SWITCH_COLOR_MODE';
                return (
                  <Command.LinkInList
                    ref={(el) => {
                      if (el && !commandsRefs.current.includes(el)) {
                        commandsRefs.current.push(el);
                      }
                    }}
                    key={key}
                    cb={() => {
                      if (BlogCommands[key].closePalette) {
                        resetKeyPress();
                      }
                    }}
                    className="justify-start flex px-4 py-2 focus:border-primary focus:border-solid focus:border-0"
                    pathTo={isColorModeKey ? toggle : BlogCommands[key].pathTo}>
                    {isColorModeKey ? (
                      <ColorSwitchCommandComponent isDarkMode={isDarkMode} />
                    ) : (
                      BlogCommands[key].label
                    )}
                  </Command.LinkInList>
                );
              })
            ) : (
              <div className="text-text justify-start flex px-4 my-1">
                Oops! I dont have this on the list yet.
              </div>
            )}
          </ul>
        </div>
      </IF>
    </div>
  );
};

const ColorSwitchCommandComponent = ({ isDarkMode }) => {
  return (
    <IF_Else predicate={isDarkMode}>
      <div tabIndex={1} className="flex justify-center items-center">
        <MoonIcon /> <p className="ml-2">Switch to light mode</p>
      </div>
      <div tabIndex={1} className="flex justify-center items-center">
        <SunIcon /> <p className="ml-2">Switch to dark mode</p>
      </div>
    </IF_Else>
  );
};
