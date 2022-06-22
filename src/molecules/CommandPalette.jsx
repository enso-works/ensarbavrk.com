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
  },
  BLOG: {
    label: 'Blog',
    description: 'Jump to the articles',
    closePalette: true,
    pathTo: '/blog',
  },
  SWITCH_COLOR_MODE: {
    label: 'Switch color mode',
    closePalette: false,
  },
};

export const CommandPalette = () => {
  const commandsRefs = useRef([]);
  const searchBox = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { keyboardEvent, resetKeyPress } = useContext(KeyboardEventContext);
  const [toggle, isDarkMode] = useToggleDarkMode();

  const setFocused = (ref) => {
    ref.current && ref.current.focus();
  };

  const commandPaletteModalRef = useOutsideClick(() => {
    resetKeyPress()
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
      setIsOpen(keyboardEvent.includes('OPEN'));
    }
  }, [keyboardEvent]);

  return (
    <div
      className={classNames(
        'flex flex-1 items-center transition-all ease-in-out duration-300 justify-center bg-slate-400/40 overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 ',
        { 'opacity-0': !isOpen, 'pointer-events-none': !isOpen }
      )}>
      <IF predicate={isOpen}>
        <div className="flex flex-col" ref={commandPaletteModalRef}>
          <div className="relative bg-bgPrimary rounded-lg w-full w-[38rem] drop-shadow-md">
            <label className="relative block text-lg font-normal">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <SearchIcon />
              </span>
              <input
                ref={searchBox}
                autoComplete="off"
                autoFocus
                onChange={(event) => {
                  //console.log(event.target.value);
                }}
                className="w-full border border-primary rounded-t-md py-4 pl-16 pr-8 focus:outline-none focus:border-primary text-text bg-bgPrimary"
                placeholder="Search for anything..."
                type="text"
                name="search"
              />
            </label>
          </div>
          <ul className="flex flex-col bg-bgPrimary drop-shadow-md rounded-b-lg py-2">
            {Object.keys(BlogCommands).map((key) => {
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
                  className="text-text justify-start flex px-4 my-1 focus:border-primary"
                  pathTo={isColorModeKey ? toggle : BlogCommands[key].pathTo}>
                  {isColorModeKey ? (
                    <ColorSwitchCommandComponent isDarkMode={isDarkMode} />
                  ) : (
                    BlogCommands[key].label
                  )}
                </Command.LinkInList>
              );
            })}
          </ul>
        </div>
      </IF>
    </div>
  );
};

const ColorSwitchCommandComponent = ({ isDarkMode }) => {
  return (
    <IF_Else predicate={isDarkMode}>
      <div className="flex justify-center items-center">
        <MoonIcon /> <p className="ml-2">Switch to light mode</p>
      </div>
      <div className="flex justify-center items-center">
        <SunIcon /> <p className="ml-2">Switch to dark mode</p>
      </div>
    </IF_Else>
  );
};
