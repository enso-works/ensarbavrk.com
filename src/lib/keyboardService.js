import { createContext, useEffect, useState } from 'react';

export const CommandEventTypes = {
  COMMAND_PLATE_OPEN_RELEASE: 'COMMAND_PLATE_OPEN_RELEASE',
  COMMAND_PLATE_OPEN_PRESS: 'COMMAND_PLATE_OPEN_PRESS',
  COMMAND_PLATE_CLOSE_RELEASE: 'COMMAND_PLATE_CLOSE',
  COMMAND_PLATE_CLOSE_PRESS: 'COMMAND_PLATE_CLOSE',
  NAVIGATE_DOWN_PRESS: 'NAVIGATE_DOWN',
  NAVIGATE_DOWN_RELEASE: 'NAVIGATE_DOWN_RELEASE',
  NAVIGATE_UP_RELEASE: 'NAVIGATE_UP_RELEASE',
  NAVIGATE_UP_PRESS: 'NAVIGATE_UP_PRESS',
  AUTO_COMPLETE_RELEASE: 'AUTO_COMPLETE_RELEASE',
  AUTO_COMPLETE_PRESS: 'AUTO_COMPLETE_PRESS',
  OPEN_LINK_RELEASE: 'OPEN_LINK_RELEASE',
  OPEN_LINK_PRESS: 'OPEN_LINK_PRESS',
};

const keys = {
  Meta: {
    pressed: false,
  },
  k: {
    pressed: false,
  },
  Escape: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  Tab: {
    pressed: false,
  },
};

export const KeyboardNavigationService = (callback) => {
  let throttlePause;

  const throttle = (callback, time) => {
    if (throttlePause) return;

    throttlePause = true;

    setTimeout(() => {
      callback();

      throttlePause = false;
    }, time);
  };

  const callCommandWithType = (command, callback, resetting = false) => {
    throttle(() => {
      callback(command);
    }, 300);
    if (resetting) {
      resetKeyPress();
    }
  };

  const resetKeyPress = (key = null) => {
    if (key) {
      keys[key].pressed = false;
    } else {
      Object.keys(keys).forEach((key) => {
        keys[key].pressed = false;
      });
    }
  };

  const KeyboardNavigationMachine = (keys, event) => [
    {
      predicate: keys[event.key] === keys.Escape,
      commands: {
        down: () => {
          callCommandWithType(
            CommandEventTypes.COMMAND_PLATE_CLOSE_PRESS,
            callback,
            true
          );
        },
      },
    },
    {
      predicate: keys.Meta.pressed && keys.k.pressed,
      commands: {
        down: () => {
          callCommandWithType(
            CommandEventTypes.COMMAND_PLATE_OPEN_PRESS,
            callback,
            true
          );
        },
      },
    },
    {
      predicate: keys[event.key] === keys.ArrowDown,
      commands: {
        down: () =>
          callCommandWithType(CommandEventTypes.NAVIGATE_DOWN_PRESS, callback),
        up: () =>
          callCommandWithType(
            CommandEventTypes.NAVIGATE_DOWN_RELEASE,
            callback
          ),
      },
    },
    {
      predicate: keys[event.key] === keys.ArrowUp,
      commands: {
        down: () =>
          callCommandWithType(CommandEventTypes.NAVIGATE_UP_PRESS, callback),
        up: () =>
          callCommandWithType(CommandEventTypes.NAVIGATE_UP_RELEASE, callback),
      },
    },
  ];
  const eventHandler = (event, isUp = false) => {
    if (keys[event.key]) {
      const state = isUp ? 'up' : 'down';
      keys[event.key].pressed = !isUp;
      KeyboardNavigationMachine(keys, event).forEach((combo) => {
        if (combo.predicate && combo.commands[state]) {
          combo.commands[state]();
        }
      });
    }
    event.stopPropagation();
  };

  const keyUpListener = (event) => {
    eventHandler(event, true);
  };

  const keyDownListener = (event) => {
    eventHandler(event);
  };

  const attachListener = (elem = window.document.documentElement) => {
    elem.addEventListener('keydown', keyDownListener);
    elem.addEventListener('keyup', keyUpListener);
  };

  const removeListener = (elem = window.document.documentElement) => {
    elem.removeEventListener('keydown', keyDownListener);
    elem.removeEventListener('keyup', keyUpListener);
  };

  return { attachListener, removeListener };
};

export const KeyboardEventContext = createContext(
  CommandEventTypes.COMMAND_PLATE_CLOSE_RELEASE
);

export const KeyboardEventProvider = ({ children }) => {
  const [keyboardEvent, setKeyboardEvent] = useState(
    CommandEventTypes.COMMAND_PLATE_CLOSE_RELEASE
  );

  const { removeListener, attachListener } = KeyboardNavigationService(
    (eventKeyType) => {
      setKeyboardEvent(eventKeyType);
    }
  );

  useEffect(() => {
    attachListener();
    return () => {
      removeListener();
    };
  }, [attachListener, removeListener]);

  return (
    <KeyboardEventContext.Provider
      value={{
        keyboardEvent,
        resetKeyPress: (
          commandType = CommandEventTypes.COMMAND_PLATE_CLOSE_RELEASE
        ) => {
          setKeyboardEvent(commandType);
        },
      }}>
      {children}
    </KeyboardEventContext.Provider>
  );
};
