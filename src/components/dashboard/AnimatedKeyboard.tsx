
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import {
  ArrowUp,
  CornerDownLeft,
  Delete,
  Keyboard,
  KeyboardOff,
  Search,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";

type KeyboardSounds = {
  key: string;
  number: string;
  space: string;
  enter: string;
  backspace: string;
  modifier: string;
};

type KeyAction =
  | "shift"
  | "caps"
  | "backspace"
  | "space"
  | "enter";

type KeyDefinition = {
  key: string;
  action?: KeyAction;
};

type SoundType =
  | "key"
  | "number"
  | "space"
  | "enter"
  | "backspace"
  | "modifier";

type AnimatedKeyboardProps = {
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onClose?: () => void;
  showSearch?: boolean;
  sounds: KeyboardSounds;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export default function AnimatedKeyboard({
  value = "",
  onChange,
  onEnter,
  onClose,
  showSearch = false,
  sounds,
  inputRef,
}: AnimatedKeyboardProps) {
  const [text, setText] = useState(value);

  const [shift, setShift] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const [keyboardVisible, setKeyboardVisible] =
    useState(true);

  const [pressedKeys, setPressedKeys] =
    useState<Set<string>>(new Set());

  /* =====================================================
     SYNC VALUE
  ====================================================== */

  useEffect(() => {
    setText(value);
  }, [value]);

  /* =====================================================
     AUDIO ENGINE
     Decode sounds ahead of time with Web Audio. This avoids
     the first-key delay caused by creating/decoding an
     HTMLAudioElement only when the key is pressed.
  ====================================================== */

  const audioContextRef = useRef<AudioContext | null>(null);

  const audioBuffersRef = useRef<
    Partial<Record<SoundType, AudioBuffer>>
  >({});

  const fallbackAudioRef = useRef<
    Record<SoundType, HTMLAudioElement[]>
  >({
    key: [],
    number: [],
    space: [],
    enter: [],
    backspace: [],
    modifier: [],
  });

  const audioIndexRef = useRef<
    Record<SoundType, number>
  >({
    key: 0,
    number: 0,
    space: 0,
    enter: 0,
    backspace: 0,
    modifier: 0,
  });

  /*
   * Create the AudioContext and start decoding as soon as the
   * keyboard component mounts. The context may remain suspended
   * until the browser receives a user gesture, but decoding can
   * still be prepared in advance.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();

    audioContextRef.current = context;
    audioBuffersRef.current = {};

    const types: SoundType[] = [
      "key",
      "number",
      "space",
      "enter",
      "backspace",
      "modifier",
    ];

    let cancelled = false;

    const prepareSounds = async () => {
      await Promise.all(
        types.map(async (type) => {
          const src = sounds[type];

          if (!src) return;

          try {
            const response = await fetch(src, {
              cache: "force-cache",
            });

            if (!response.ok) {
              throw new Error(
                `Failed to load keyboard sound: ${src}`
              );
            }

            const arrayBuffer =
              await response.arrayBuffer();

            const buffer =
              await context.decodeAudioData(
                arrayBuffer
              );

            if (!cancelled) {
              audioBuffersRef.current[type] =
                buffer;
            }
          } catch {
            /*
             * HTMLAudio fallback below will still handle
             * the sound if Web Audio decoding fails.
             */
          }
        })
      );
    };

    prepareSounds();

    return () => {
      cancelled = true;

      Object.values(
        fallbackAudioRef.current
      ).forEach((pool) => {
        pool.forEach((audio) => {
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
        });
      });

      fallbackAudioRef.current = {
        key: [],
        number: [],
        space: [],
        enter: [],
        backspace: [],
        modifier: [],
      };

      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }

      audioContextRef.current = null;
      audioBuffersRef.current = {};
    };
  }, [
    sounds.key,
    sounds.number,
    sounds.space,
    sounds.enter,
    sounds.backspace,
    sounds.modifier,
  ]);

  /*
   * Small fallback pool for cases where a sound has not finished
   * decoding yet or Web Audio is unavailable.
   */
  useEffect(() => {
    const types: SoundType[] = [
      "key",
      "number",
      "space",
      "enter",
      "backspace",
      "modifier",
    ];

    types.forEach((type) => {
      const src = sounds[type];

      if (!src) return;

      fallbackAudioRef.current[type] =
        Array.from({ length: 3 }, () => {
          const audio = new Audio(src);

          audio.preload = "auto";
          audio.volume = 0.45;
          audio.load();

          return audio;
        });

      audioIndexRef.current[type] = 0;
    });

    return () => {
      types.forEach((type) => {
        fallbackAudioRef.current[type].forEach(
          (audio) => {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
          }
        );

        fallbackAudioRef.current[type] = [];
      });
    };
  }, [
    sounds.key,
    sounds.number,
    sounds.space,
    sounds.enter,
    sounds.backspace,
    sounds.modifier,
  ]);

  const playKeySound = useCallback(
    (type: SoundType) => {
      const src = sounds[type];

      if (!src) return;

      try {
        const context =
          audioContextRef.current;

        const buffer =
          audioBuffersRef.current[type];

        if (context && buffer) {
          /*
           * Resume inside the actual user interaction.
           * This is important for Chrome/Edge autoplay policy.
           */
          if (context.state === "suspended") {
            context.resume().catch(() => {});
          }

          const source =
            context.createBufferSource();

          const gain =
            context.createGain();

          source.buffer = buffer;

          gain.gain.value = 0.45;

          source.connect(gain);
          gain.connect(context.destination);

          source.start(0);

          return;
        }

        /*
         * Decode is not ready yet — use the preloaded HTMLAudio
         * fallback so the interaction still produces a sound.
         */
        const pool =
          fallbackAudioRef.current[type];

        if (pool.length) {
          const index =
            audioIndexRef.current[type] %
            pool.length;

          const audio = pool[index];

          audioIndexRef.current[type] =
            (index + 1) % pool.length;

          audio.pause();
          audio.currentTime = 0;

          audio.play().catch(() => {});

          return;
        }

        /*
         * Last-resort fallback.
         */
        const audio = new Audio(src);

        audio.volume = 0.45;
        audio.preload = "auto";

        audio.play().catch(() => {});
      } catch {
        // Ignore audio errors.
      }
    },
    [sounds]
  );

  /* =====================================================
     KEY PRESS STATE
  ====================================================== */

  const pressKeyAnimation = useCallback(
    (key: string) => {
      setPressedKeys((current) => {
        const next = new Set(current);
        next.add(key);
        return next;
      });

      window.setTimeout(() => {
        setPressedKeys((current) => {
          const next = new Set(current);
          next.delete(key);
          return next;
        });
      }, 120);
    },
    []
  );

  /* =====================================================
     UPDATE VALUE
  ====================================================== */

  const updateValue = useCallback(
    (nextValue: string) => {
      setText(nextValue);
      onChange?.(nextValue);
    },
    [onChange]
  );

  /* =====================================================
     SOUND TYPE
  ====================================================== */

  const getSoundType = useCallback(
    (
      key: string,
      action?: KeyAction
    ): SoundType => {
      if (action === "space") {
        return "space";
      }

      if (action === "enter") {
        return "enter";
      }

      if (action === "backspace") {
        return "backspace";
      }

      if (
        action === "shift" ||
        action === "caps"
      ) {
        return "modifier";
      }

      if (/^[0-9]$/.test(key)) {
        return "number";
      }

      return "key";
    },
    []
  );

  /* =====================================================
     BACKSPACE
  ====================================================== */

  const handleBackspace = useCallback(() => {
    const input =
      inputRef?.current ??
      (document.activeElement instanceof HTMLInputElement
        ? document.activeElement
        : null);

    // Always read the latest value from the input when possible.
    // This avoids stale React state when Ctrl+A/native selection
    // has just happened.
    const currentText =
      input?.value ?? text;

    if (input) {
      const start =
        input.selectionStart ?? currentText.length;

      const end =
        input.selectionEnd ?? currentText.length;

      // Selected text — including native Ctrl+A selection.
      if (start !== end) {
        const nextValue =
          currentText.slice(0, start) +
          currentText.slice(end);

        updateValue(nextValue);

        requestAnimationFrame(() => {
          input.focus();
          input.setSelectionRange(start, start);
        });

        return;
      }

      // Normal Backspace: remove the character immediately
      // before the caret.
      if (start > 0) {
        const nextValue =
          currentText.slice(0, start - 1) +
          currentText.slice(start);

        updateValue(nextValue);

        requestAnimationFrame(() => {
          input.focus();

          const cursor = start - 1;

          input.setSelectionRange(
            cursor,
            cursor
          );
        });
      }

      return;
    }

    // Fallback when no input ref exists.
    if (currentText.length > 0) {
      updateValue(
        currentText.slice(0, -1)
      );
    }
  }, [
    inputRef,
    text,
    updateValue,
  ]);

  /* =====================================================
     VIRTUAL KEY
  ====================================================== */

  const handleKey = useCallback(
    (
      key: string,
      action?: KeyAction
    ) => {
      const soundType =
        getSoundType(key, action);

      playKeySound(soundType);

      pressKeyAnimation(key);

      /* BACKSPACE */

      if (action === "backspace") {
        handleBackspace();
        return;
      }

      /* SPACE */

      if (action === "space") {
        const input = inputRef?.current;

        if (input) {
          const start =
            input.selectionStart ?? text.length;

          const end =
            input.selectionEnd ?? text.length;

          const nextValue =
            text.slice(0, start) +
            " " +
            text.slice(end);

          updateValue(nextValue);

          requestAnimationFrame(() => {
            input.focus();

            const cursor = start + 1;

            input.setSelectionRange(
              cursor,
              cursor
            );
          });
        } else {
          updateValue(`${text} `);
        }

        if (shift) {
          setShift(false);
        }

        return;
      }

      /* ENTER */

      if (action === "enter") {
        onEnter?.(text);
        return;
      }

      /* SHIFT */

      if (action === "shift") {
        setShift((current) => !current);
        return;
      }

      /* CAPS */

      if (action === "caps") {
        setCapsLock((current) => !current);
        return;
      }

      /* NORMAL CHARACTER */

      if (key.length === 1) {
        const uppercase =
          shift || capsLock;

        const character = uppercase
          ? key.toUpperCase()
          : key.toLowerCase();

        const input = inputRef?.current;

        if (input) {
          const start =
            input.selectionStart ?? text.length;

          const end =
            input.selectionEnd ?? text.length;

          const nextValue =
            text.slice(0, start) +
            character +
            text.slice(end);

          updateValue(nextValue);

          requestAnimationFrame(() => {
            input.focus();

            const cursor =
              start + character.length;

            input.setSelectionRange(
              cursor,
              cursor
            );
          });
        } else {
          updateValue(
            `${text}${character}`
          );
        }

        /*
         * Shift is temporary.
         */

        if (shift) {
          setShift(false);
        }
      }
    },
    [
      getSoundType,
      handleBackspace,
      inputRef,
      onEnter,
      playKeySound,
      pressKeyAnimation,
      shift,
      capsLock,
      text,
      updateValue,
    ]
  );

  /* =====================================================
     PHYSICAL KEYBOARD
  ====================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      /* ESC */

      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      /*
       * Don't intercept browser shortcuts.
       *
       * IMPORTANT:
       * Ctrl/Cmd + A is intentionally left completely native.
       * The browser selects the input text, and Backspace below
       * reads selectionStart/selectionEnd from the real input.
       */

      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      /* SHIFT */

      if (event.key === "Shift") {
        event.preventDefault();

        if (!event.repeat) {
          setShift(true);

          pressKeyAnimation("Shift");

          playKeySound("modifier");
        }

        return;
      }

      /* CAPS LOCK */

      if (event.key === "CapsLock") {
        event.preventDefault();

        if (!event.repeat) {
          setCapsLock(
            (current) => !current
          );

          pressKeyAnimation(
            "CapsLock"
          );

          playKeySound("modifier");
        }

        return;
      }

      /* BACKSPACE */

      if (event.key === "Backspace") {
        event.preventDefault();

        // Play sound on the initial press and repeated
        // keydown events while Backspace is held.
        playKeySound("backspace");

        if (!event.repeat) {
          pressKeyAnimation(
            "Backspace"
          );
        }

        // IMPORTANT:
        // Do this on every keydown, including event.repeat,
        // so holding Backspace continuously deletes text.
        handleBackspace();

        return;
      }

      /* ENTER */

      if (event.key === "Enter") {
        event.preventDefault();

        if (!event.repeat) {
          playKeySound("enter");

          pressKeyAnimation("Enter");

          onEnter?.(text);
        }

        return;
      }

      /* SPACE */

      if (event.key === " ") {
        event.preventDefault();

        if (!event.repeat) {
          playKeySound("space");

          pressKeyAnimation("Space");

          const input =
            inputRef?.current;

          if (input) {
            const start =
              input.selectionStart ??
              text.length;

            const end =
              input.selectionEnd ??
              text.length;

            const nextValue =
              text.slice(0, start) +
              " " +
              text.slice(end);

            updateValue(nextValue);

            requestAnimationFrame(() => {
              input.focus();

              const cursor =
                start + 1;

              input.setSelectionRange(
                cursor,
                cursor
              );
            });
          } else {
            updateValue(
              `${text} `
            );
          }

          if (event.shiftKey) {
            setShift(false);
          }
        }

        return;
      }

      /* NORMAL CHARACTER */

      if (event.key.length === 1) {
        event.preventDefault();

        if (
          /^[0-9]$/.test(
            event.key
          )
        ) {
          playKeySound("number");
        } else {
          playKeySound("key");
        }

        pressKeyAnimation(
          event.key.toLowerCase()
        );

        const uppercase =
          event.shiftKey ||
          capsLock;

        const character = uppercase
          ? event.key.toUpperCase()
          : event.key.toLowerCase();

        const input =
          inputRef?.current;

        if (input) {
          const start =
            input.selectionStart ??
            text.length;

          const end =
            input.selectionEnd ??
            text.length;

          const nextValue =
            text.slice(0, start) +
            character +
            text.slice(end);

          updateValue(nextValue);

          requestAnimationFrame(() => {
            input.focus();

            const cursor =
              start + character.length;

            input.setSelectionRange(
              cursor,
              cursor
            );
          });
        } else {
          updateValue(
            `${text}${character}`
          );
        }

        if (event.shiftKey) {
          setShift(false);
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
      true
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
        true
      );
    };
  }, [
    capsLock,
    handleBackspace,
    inputRef,
    onClose,
    onEnter,
    playKeySound,
    pressKeyAnimation,
    text,
    updateValue,
  ]);

  /* =====================================================
     KEYBOARD LAYOUT
  ====================================================== */

  const rows: KeyDefinition[][] =
    useMemo(
      () => [
        /* Numbers */

        [
          { key: "1" },
          { key: "2" },
          { key: "3" },
          { key: "4" },
          { key: "5" },
          { key: "6" },
          { key: "7" },
          { key: "8" },
          { key: "9" },
          { key: "0" },
        ],

        /* QWERTY */

        [
          { key: "q" },
          { key: "w" },
          { key: "e" },
          { key: "r" },
          { key: "t" },
          { key: "y" },
          { key: "u" },
          { key: "i" },
          { key: "o" },
          { key: "p" },
        ],

        /* ASDF */

        [
          { key: "a" },
          { key: "s" },
          { key: "d" },
          { key: "f" },
          { key: "g" },
          { key: "h" },
          { key: "j" },
          { key: "k" },
          { key: "l" },
        ],

        /* ZXCV */

        [
          {
            key: "CapsLock",
            action: "caps",
          },

          { key: "z" },
          { key: "x" },
          { key: "c" },
          { key: "v" },
          { key: "b" },
          { key: "n" },
          { key: "m" },

          {
            key: "Backspace",
            action: "backspace",
          },
        ],

        /* Bottom */

        [
          {
            key: "Shift",
            action: "shift",
          },

          {
            key: "Space",
            action: "space",
          },

          {
            key: "Enter",
            action: "enter",
          },
        ],
      ],
      []
    );

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="relative w-full  p-4    rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]">
      {/* TOP REFLECTION */}

      <div
        className="
          pointer-events-none
       
        
        "
      />

      {/* SEARCH PREVIEW */}

      <AnimatePresence initial={false}>
        {showSearch && (
          <motion.div
            initial={{
              opacity: 0,
              y: -6,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.985,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mb-2.5
              flex
              items-center
              gap-2.5
              rounded-[15px]
              border
              border-black/[0.07]
              bg-white/75
              px-3.5
              py-3
              shadow-sm
              dark:border-white/[0.07]
              dark:bg-black/20
            "
          >
            <Search
              className="
                h-4
                w-4
                shrink-0
                text-black/40
                dark:text-white/40
              "
            />

            <div
              className="
                min-w-0
                flex-1
                truncate
                text-sm
                font-medium
                text-black
                dark:text-white
              "
            >
              {text || (
                <span
                  className="
                    font-normal
                    text-black/35
                    dark:text-white/35
                  "
                >
                  Search anything...
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KEYBOARD */}

      <AnimatePresence initial={false}>
        {keyboardVisible && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.18,
              },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{
                y: 10,
                filter: "blur(3px)",
              }}
              animate={{
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                y: -4,
                filter: "blur(3px)",
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative space-y-1.5"
            >
              {rows.map(
                (
                  row,
                  rowIndex
                ) => (
                  <motion.div
                    key={rowIndex}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.24,
                      delay:
                        rowIndex * 0.025,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      flex
                      justify-center
                      gap-1.5
                      sm:gap-2
                    "
                  >
                    {row.map(
                      (item) => {
                        const pressed =
                          pressedKeys.has(
                            item.key
                          );

                        const displayKey =
                          item.key.length ===
                          1
                            ? shift ||
                              capsLock
                              ? item.key.toUpperCase()
                              : item.key
                            : item.key;

                        return (
                          <motion.button
                            key={
                              item.key
                            }
                            type="button"
                            tabIndex={-1}
                            onPointerDown={(
                              event
                            ) => {
                              /*
                               * Keep actual input
                               * focused.
                               */

                              event.preventDefault();

                              handleKey(
                                item.key,
                                item.action
                              );
                            }}
                            animate={{
                              y: pressed
                                ? 2
                                : 0,
                              scale: pressed
                                ? 0.96
                                : 1,
                            }}
                            transition={{
                              duration: 0.1,
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                            className={`
                              relative
                              flex
                              h-10
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-[8px]
                              border
                              text-[12px]
                              font-medium
                              outline-none
                              sm:h-11
                              sm:rounded-[9px]

                              ${
                                item.action ===
                                "space"
                                  ? "w-[34%] max-w-[260px]"
                                  : item.action ===
                                    "shift"
                                  ? "w-[18%] max-w-[105px]"
                                  : item.action ===
                                    "enter"
                                  ? "w-[15%] max-w-[90px]"
                                  : item.action ===
                                    "caps"
                                  ? "w-[14%] max-w-[82px]"
                                  : item.action ===
                                    "backspace"
                                  ? "w-[15%] max-w-[92px]"
                                  : "w-[8.2%] max-w-[52px]"
                              }

                              ${
                                pressed
                                  ? `
                                    bg-black/[0.12]
                                    shadow-none
                                    dark:bg-white/[0.18]
                                  `
                                  : `
                                    bg-white
                                    border-black/[0.08]
                                    shadow-[0_2px_0_rgba(0,0,0,0.14),0_3px_7px_rgba(0,0,0,0.08)]
                                    hover:bg-white/90
                                    dark:bg-[#2c2c2e]
                                    dark:border-white/[0.07]
                                    dark:shadow-[0_2px_0_rgba(0,0,0,0.5),0_3px_8px_rgba(0,0,0,0.3)]
                                    dark:hover:bg-[#333335]
                                  `
                              }

                              ${
                                item.action ===
                                  "shift" &&
                                shift
                                  ? `
                                    border-primary/40
                                    bg-primary/10
                                    text-primary
                                  `
                                  : ""
                              }

                              ${
                                item.action ===
                                  "caps" &&
                                capsLock
                                  ? `
                                    border-primary/40
                                    bg-primary/10
                                    text-primary
                                  `
                                  : ""
                              }

                              text-black
                              dark:text-white
                            `}
                            aria-label={
                              displayKey
                            }
                          >
                            {/* KEY HIGHLIGHT */}

                            <span
                              className="
                                pointer-events-none
                                absolute
                                inset-x-1
                                top-0
                                h-px
                                bg-white/80
                                dark:bg-white/10
                              "
                            />

                            {/* PRESS GLOW */}

                            <motion.span
                              animate={{
                                opacity:
                                  pressed
                                    ? 0.08
                                    : 0,
                              }}
                              transition={{
                                duration: 0.1,
                              }}
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                rounded-[inherit]
                                bg-primary
                              "
                            />

                            {/* CONTENT */}

                            <span
                              className="
                                relative
                                z-10
                                flex
                                items-center
                                justify-center
                              "
                            >
                              {item.action ===
                              "shift" ? (
                                <ArrowUp
                                  className={`h-4 w-4 ${
                                    shift
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              ) : item.action ===
                                "caps" ? (
                                <span
                                  className="
                                    text-[9px]
                                    font-semibold
                                    tracking-wide
                                    sm:text-[10px]
                                  "
                                >
                                  CAPS
                                </span>
                              ) : item.action ===
                                "backspace" ? (
                                <Delete className="h-4 w-4" />
                              ) : item.action ===
                                "space" ? (
                                <span
                                  className="
                                    text-[9px]
                                    tracking-wider
                                    text-black/30
                                    dark:text-white/30
                                  "
                                >
                                  SPACE
                                </span>
                              ) : item.action ===
                                "enter" ? (
                                <CornerDownLeft className="h-4 w-4" />
                              ) : (
                                displayKey
                              )}
                            </span>
                          </motion.button>
                        );
                      }
                    )}
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOW / HIDE KEYBOARD */}

      <div className="mt-2 flex justify-center">
        <motion.button
          type="button"
          whileTap={{
            scale: 0.96,
          }}
          onPointerDown={(event) => {
            event.preventDefault();

            setKeyboardVisible(
              (current) => !current
            );
          }}
          className="
            group
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-black/[0.07]
            bg-white/70
            px-3
            py-1.5
            text-[10px]
            font-medium
            text-black/50
            shadow-sm
            transition-colors
            duration-200
            hover:bg-white
            hover:text-black
            dark:border-white/[0.07]
            dark:bg-white/[0.04]
            dark:text-white/50
            dark:hover:bg-white/[0.08]
            dark:hover:text-white
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {keyboardVisible ? (
              <motion.span
                key="hide"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: 10,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="flex"
              >
                <KeyboardOff className="h-3.5 w-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="show"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -10,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="flex"
              >
                <Keyboard className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>

          <span>
            {keyboardVisible
              ? "Hide keyboard"
              : "Show keyboard"}
          </span>
        </motion.button>
      </div>

      {/* FOOTER */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.15,
          duration: 0.25,
        }}
        className="
          mt-2
          flex
          items-center
          justify-center
          gap-1.5
          text-[9px]
          text-black/30
          dark:text-white/30
        "
      >
        <span>
          Physical keyboard connected
        </span>

        <span>•</span>

        <span>
          Enter to search
        </span>
      </motion.div>
    </div>
  );
}

