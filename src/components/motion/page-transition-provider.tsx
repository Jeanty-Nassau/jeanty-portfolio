"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

type TransitionPhase =
  | "idle"
  | "cover"
  | "reveal";

type PageTransitionProviderProps = {
  children: ReactNode;
};

const PANEL_COUNT = 8;

const COVER_DURATION = 0.72;
const REVEAL_DURATION = 0.82;
const PANEL_STAGGER = 0.045;

function getPageLabel(pathname: string) {
  if (pathname === "/") {
    return {
      eyebrow: "RETURN",
      title: "HOME",
    };
  }

  if (pathname.startsWith("/work")) {
    return {
      eyebrow: "SELECTED ENGINEERING",
      title: "WORK",
    };
  }

  if (pathname.startsWith("/lab")) {
    return {
      eyebrow: "CREATIVE EXPERIMENTS",
      title: "LAB",
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      eyebrow: "BACKGROUND / APPROACH",
      title: "ABOUT",
    };
  }

  if (pathname.startsWith("/notes")) {
    return {
      eyebrow: "THINKING / WRITING",
      title: "NOTES",
    };
  }

  return {
    eyebrow: "NAVIGATING",

    title:
      pathname
        .split("/")
        .filter(Boolean)
        .at(-1)
        ?.replaceAll("-", " ")
        .toUpperCase() ?? "PAGE",
  };
}

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const shouldReduceMotion =
    useReducedMotion();

  const [phase, setPhase] =
    useState<TransitionPhase>("idle");

  const [targetPath, setTargetPath] =
    useState<string | null>(null);

  /*
   * Refs are important here.
   *
   * The global click handler must always know the
   * current transition state without needing to
   * recreate itself whenever state changes.
   */
  const phaseRef =
    useRef<TransitionPhase>("idle");

  const targetPathRef =
    useRef<string | null>(null);

  const navigationTimer =
    useRef<
      ReturnType<typeof setTimeout> | undefined
    >(undefined);

  const revealTimer =
    useRef<
      ReturnType<typeof setTimeout> | undefined
    >(undefined);

  const finishTimer =
    useRef<
      ReturnType<typeof setTimeout> | undefined
    >(undefined);

  const safetyTimer =
    useRef<
      ReturnType<typeof setTimeout> | undefined
    >(undefined);

  function updatePhase(
    nextPhase: TransitionPhase,
  ) {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }

  /*
   * Once the pathname changes to the expected route,
   * we know Next has completed the navigation.
   */
  useEffect(() => {
    if (
      phase !== "cover" ||
      !targetPath
    ) {
      return;
    }

    const expectedPath =
      new URL(
        targetPath,
        window.location.origin,
      ).pathname;

    if (pathname !== expectedPath) {
      return;
    }

    /*
     * Navigation succeeded, so we no longer need
     * the emergency fallback.
     */
    if (safetyTimer.current) {
      clearTimeout(
        safetyTimer.current,
      );
    }

    revealTimer.current =
      setTimeout(() => {
        /*
         * New pages should begin from the top.
         */
        window.scrollTo(0, 0);

        updatePhase("reveal");

        finishTimer.current =
          setTimeout(() => {
            updatePhase("idle");

            targetPathRef.current =
              null;

            setTargetPath(null);
          }, 1050);
      }, 120);
  }, [
    pathname,
    phase,
    targetPath,
  ]);

  /*
   * Intercept internal navigation.
   *
   * IMPORTANT:
   * This effect intentionally does NOT depend on `phase`.
   *
   * The previous version did, which meant changing
   * phase caused the cleanup function to run and cancel
   * the pending router.push timer.
   */
  useEffect(() => {
    const handleClick = (
      event: MouseEvent,
    ) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target =
        event.target;

      if (
        !(target instanceof Element)
      ) {
        return;
      }

      const anchor =
        target.closest("a");

      if (!anchor) {
        return;
      }

      const href =
        anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      /*
       * Let downloads and new tabs behave normally.
       */
      if (
        anchor.hasAttribute(
          "download",
        ) ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const destination =
        new URL(
          href,
          window.location.href,
        );

      /*
       * External navigation should not use
       * our page transition.
       */
      if (
        destination.origin !==
        window.location.origin
      ) {
        return;
      }

      /*
       * Same-page anchors are handled by Lenis.
       */
      if (
        destination.pathname ===
          window.location.pathname &&
        destination.hash
      ) {
        return;
      }

      /*
       * Ignore navigation to the current route.
       */
      if (
        destination.pathname ===
          window.location.pathname &&
        destination.search ===
          window.location.search
      ) {
        return;
      }

      /*
       * Ignore additional clicks while a transition
       * is already running.
       */
      if (
        phaseRef.current !== "idle"
      ) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      /*
       * Respect reduced-motion users.
       */
      if (shouldReduceMotion) {
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );

        return;
      }

      const destinationHref =
        `${destination.pathname}${destination.search}${destination.hash}`;

      targetPathRef.current =
        destinationHref;

      setTargetPath(
        destinationHref,
      );

      /*
       * Set the ref immediately so a fast double-click
       * can't start another navigation before React
       * updates state.
       */
      updatePhase("cover");

      /*
       * Fetch the destination while the screen
       * is being covered.
       */
      router.prefetch(
        destination.pathname,
      );

      /*
       * Route change happens once most of the viewport
       * is obscured.
       */
      navigationTimer.current =
        setTimeout(() => {
          router.push(
            destinationHref,
          );
        }, 640);

      /*
       * Emergency fallback.
       *
       * If something unexpected prevents the pathname
       * effect from firing, never leave the user behind
       * a permanent transition overlay.
       */
      safetyTimer.current =
        setTimeout(() => {
          if (
            phaseRef.current !==
            "idle"
          ) {
            updatePhase(
              "reveal",
            );

            finishTimer.current =
              setTimeout(() => {
                updatePhase(
                  "idle",
                );

                targetPathRef.current =
                  null;

                setTargetPath(null);
              }, 1000);
          }
        }, 4000);
    };

    document.addEventListener(
      "click",
      handleClick,
      true,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick,
        true,
      );
    };
  }, [
    router,
    shouldReduceMotion,
  ]);

  /*
   * Only clear timers when this provider actually
   * unmounts — NOT whenever the phase changes.
   */
  useEffect(() => {
    return () => {
      if (
        navigationTimer.current
      ) {
        clearTimeout(
          navigationTimer.current,
        );
      }

      if (revealTimer.current) {
        clearTimeout(
          revealTimer.current,
        );
      }

      if (finishTimer.current) {
        clearTimeout(
          finishTimer.current,
        );
      }

      if (safetyTimer.current) {
        clearTimeout(
          safetyTimer.current,
        );
      }
    };
  }, []);

  const label =
    targetPath
      ? getPageLabel(
          new URL(
            targetPath,
            typeof window ===
              "undefined"
              ? "http://localhost"
              : window.location.origin,
          ).pathname,
        )
      : null;

  return (
    <>
      {children}

      {!shouldReduceMotion &&
        phase !== "idle" && (
          <div
            aria-hidden="true"
            className="
              pointer-events-auto
              fixed
              inset-0
              z-[9998]
              overflow-hidden
            "
          >
            {/* Vertical shutter panels */}
            <div className="absolute inset-0 flex">
              {Array.from({
                length:
                  PANEL_COUNT,
              }).map(
                (_, index) => {
                  const isEven =
                    index % 2 ===
                    0;

                  return (
                    <motion.div
                      key={index}
                      className={
                        isEven
                          ? "h-full flex-1 bg-cobalt"
                          : "h-full flex-1 bg-cobalt-dark"
                      }
                      initial={{
                        y:
                          phase ===
                          "cover"
                            ? "105%"
                            : "0%",
                      }}
                      animate={{
                        y:
                          phase ===
                          "cover"
                            ? "0%"
                            : "-105%",
                      }}
                      transition={{
                        duration:
                          phase ===
                          "cover"
                            ? COVER_DURATION
                            : REVEAL_DURATION,

                        delay:
                          index *
                          PANEL_STAGGER,

                        ease:
                          phase ===
                          "cover"
                            ? [
                                0.76,
                                0,
                                0.24,
                                1,
                              ]
                            : [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                      }}
                    />
                  );
                },
              )}
            </div>

            {/* Transition grain */}
            <motion.div
              className="
                absolute
                inset-0
                z-10
                mix-blend-soft-light
              "
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity:
                  phase ===
                  "cover"
                    ? 0.08
                    : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            />

            {/* Destination */}
            {label && (
              <motion.div
                className="
                  absolute
                  inset-0
                  z-20
                  flex
                  items-center
                  justify-center
                  px-6
                "
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity:
                    phase ===
                    "cover"
                      ? 1
                      : 0,
                }}
                transition={{
                  duration: 0.25,

                  delay:
                    phase ===
                    "cover"
                      ? 0.38
                      : 0,
                }}
              >
                <div className="text-center text-paper">
                  <motion.p
                    className="
                      mb-3
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.28em]
                      text-orange
                      md:text-xs
                    "
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity:
                        phase ===
                        "cover"
                          ? 1
                          : 0,

                      y:
                        phase ===
                        "cover"
                          ? 0
                          : -8,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.42,
                    }}
                  >
                    {label.eyebrow}
                  </motion.p>

                  <motion.p
                    className="
                      text-[clamp(4rem,13vw,10rem)]
                      font-medium
                      leading-[0.78]
                      tracking-[-0.07em]
                    "
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      filter:
                        "blur(10px)",
                    }}
                    animate={{
                      opacity:
                        phase ===
                        "cover"
                          ? 1
                          : 0,

                      scale:
                        phase ===
                        "cover"
                          ? 1
                          : 1.04,

                      filter:
                        phase ===
                        "cover"
                          ? "blur(0px)"
                          : "blur(6px)",
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.35,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    {label.title}
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Orange scanner */}
            <motion.div
              className="
                absolute
                left-0
                z-30
                h-[2px]
                w-full
                bg-orange
              "
              initial={{
                top: "-2%",
                opacity: 0,
              }}
              animate={{
                top:
                  phase ===
                  "cover"
                    ? "102%"
                    : "-2%",

                opacity:
                  phase ===
                  "cover"
                    ? [
                        0,
                        1,
                        1,
                        0,
                      ]
                    : 0,
              }}
              transition={{
                top: {
                  duration: 0.72,
                  delay: 0.25,
                  ease: "linear",
                },

                opacity: {
                  duration: 0.72,
                  delay: 0.25,

                  times: [
                    0,
                    0.12,
                    0.85,
                    1,
                  ],
                },
              }}
            />

            {/* System metadata */}
            <motion.div
              className="
                absolute
                bottom-6
                left-6
                z-30
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-paper/45
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity:
                  phase ===
                  "cover"
                    ? 1
                    : 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.3,
              }}
            >
              TRANSITION /
              RECONSTRUCTING
            </motion.div>
          </div>
        )}
    </>
  );
}