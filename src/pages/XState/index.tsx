import { createMachine, interpret, assign } from "xstate";

interface Context {
  gatePoint: { [key in string]: number };
  calcBonusPoint: (gatePoint: number) => number;
}

type SensorEvent = { type: "GOT_SENSOR" };

type Event =
  | { type: "NEXT_PLAYER" }
  | { type: "PASS_BONUS_BALL" }
  | { type: "NOT_PASS_BONUS_BALL" }
  | { type: "PASS_BALL" }
  | { type: "FALSE_NEGATIVE" }
  | SensorEvent;

const machine = createMachine<Context, Event>(
  {
    id: "machine",
    initial: "Gate2",
    context: {
      gatePoint: {
        gate1: 1,
        gate2: 2,
        gate3: 3,
        goalPole: 4,
      },
      calcBonusPoint: (gatePoint: number) => gatePoint + gatePoint * 2,
    },
    states: {
      Gate1: {
        id: "Gate1",
        initial: "WaitStrike1",
        states: {
          WaitStrike1: {
            on: {
              PASS_BALL: "#Gate2",
              NEXT_PLAYER: "WaitStrike1",
              GOT_SENSOR: "WaitSensorConfirm1",
            },
          },
          WaitSensorConfirm1: {
            on: {
              PASS_BALL: "#Gate2",
              FALSE_NEGATIVE: "WaitStrike1",
            },
          },
        },
      },
      Gate2: {
        id: "Gate2",
        initial: "Gate2Spark",
        states: {
          Gate2Spark: {
            initial: "Gate2SparkWait",
            states: {
              Gate2SparkWait: {
                on: {
                  PASS_BONUS_BALL: "#Gate2.Gate2StrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#Gate2.Gate2StrikeWithoutBonus",
                  NEXT_PLAYER: "Gate2SparkWait",
                  GOT_SENSOR: {
                    target: "Gate2SparkWaitSensorConfirm",
                    actions: ["debug"],
                  },
                },
              },
              Gate2SparkWaitSensorConfirm: {
                on: {
                  PASS_BONUS_BALL: "#Gate2.Gate2StrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#Gate2.Gate2StrikeWithoutBonus",
                  NEXT_PLAYER: "Gate2SparkWait",
                  FALSE_NEGATIVE: "Gate2SparkWait",
                },
              },
            },
          },
          Gate2StrikeWithoutBonus: {
            initial: "Gate2StrikeWithoutBonusWait",
            states: {
              Gate2StrikeWithoutBonusWait: {
                on: {
                  PASS_BALL: "#Gate3",
                  NEXT_PLAYER: "#Gate2.Gate2Spark",
                  GOT_SENSOR: "Gate2StrikeWithoutBonusWaitSensorConfirm",
                },
              },
              Gate2StrikeWithoutBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#Gate3",
                  FALSE_NEGATIVE: "Gate2StrikeWithoutBonusWait",
                },
              },
            },
          },
          Gate2StrikeWithBonus: {
            initial: "Gate2StrikeWithBonusWait",
            states: {
              Gate2StrikeWithBonusWait: {
                on: {
                  PASS_BALL: "#Gate3",
                  NEXT_PLAYER: "#Gate2.Gate2Spark",
                  GOT_SENSOR: "Gate2StrikeWithBonusWaitSensorConfirm",
                },
              },
              Gate2StrikeWithBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#Gate3",
                  FALSE_NEGATIVE: "#Gate2.Gate2Spark",
                },
              },
            },
          },
        },
      },
      Gate3: {
        id: "Gate3",
        initial: "Gate3Spark",
        states: {
          Gate3Spark: {
            initial: "Gate3SparkWait",
            states: {
              Gate3SparkWait: {
                on: {
                  PASS_BONUS_BALL: "#Gate3.Gate3StrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#Gate3.Gate3StrikeWithoutBonus",
                  NEXT_PLAYER: "Gate3SparkWait",
                  GOT_SENSOR: {
                    target: "Gate3SparkWaitSensorConfirm",
                    actions: ["debug"],
                  },
                },
              },
              Gate3SparkWaitSensorConfirm: {
                on: {
                  PASS_BONUS_BALL: "#Gate3.Gate3StrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#Gate3.Gate3StrikeWithoutBonus",
                  NEXT_PLAYER: "Gate3SparkWait",
                  FALSE_NEGATIVE: "Gate3SparkWait",
                },
              },
            },
          },
          Gate3StrikeWithoutBonus: {
            initial: "Gate3StrikeWithoutBonusWait",
            states: {
              Gate3StrikeWithoutBonusWait: {
                on: {
                  PASS_BALL: "#GoalPole",
                  NEXT_PLAYER: "#Gate3.Gate3Spark",
                  GOT_SENSOR: "Gate3StrikeWithoutBonusWaitSensorConfirm",
                },
              },
              Gate3StrikeWithoutBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#GoalPole",
                  FALSE_NEGATIVE: "Gate3StrikeWithoutBonusWait",
                },
              },
            },
          },
          Gate3StrikeWithBonus: {
            initial: "Gate3StrikeWithBonusWait",
            states: {
              Gate3StrikeWithBonusWait: {
                on: {
                  PASS_BALL: "#GoalPole",
                  NEXT_PLAYER: "#Gate3.Gate3Spark",
                  GOT_SENSOR: "Gate3StrikeWithBonusWaitSensorConfirm",
                },
              },
              Gate3StrikeWithBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#GoalPole",
                  FALSE_NEGATIVE: "#Gate3.Gate3Spark",
                },
              },
            },
          },
        },
      },
      GoalPole: {
        id: "GoalPole",
        initial: "GoalPoleSpark",
        states: {
          GoalPoleSpark: {
            initial: "GoalPoleSparkWait",
            states: {
              GoalPoleSparkWait: {
                on: {
                  PASS_BONUS_BALL: "#GoalPole.GoalPoleStrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#GoalPole.GoalPoleStrikeWithoutBonus",
                  NEXT_PLAYER: "GoalPoleSparkWait",
                  GOT_SENSOR: {
                    target: "GoalPoleSparkWaitSensorConfirm",
                    actions: ["debug"],
                  },
                },
              },
              GoalPoleSparkWaitSensorConfirm: {
                on: {
                  PASS_BONUS_BALL: "#GoalPole.GoalPoleStrikeWithBonus",
                  NOT_PASS_BONUS_BALL: "#GoalPole.GoalPoleStrikeWithoutBonus",
                  NEXT_PLAYER: "GoalPoleSparkWait",
                  FALSE_NEGATIVE: "GoalPoleSparkWait",
                },
              },
            },
          },
          GoalPoleStrikeWithoutBonus: {
            initial: "GoalPoleStrikeWithoutBonusWait",
            states: {
              GoalPoleStrikeWithoutBonusWait: {
                on: {
                  PASS_BALL: "#Gate1",
                  NEXT_PLAYER: "#GoalPole.GoalPoleSpark",
                  GOT_SENSOR: "GoalPoleStrikeWithoutBonusWaitSensorConfirm",
                },
              },
              GoalPoleStrikeWithoutBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#Gate1",
                  FALSE_NEGATIVE: "GoalPoleStrikeWithoutBonusWait",
                },
              },
            },
          },
          GoalPoleStrikeWithBonus: {
            initial: "GoalPoleStrikeWithBonusWait",
            states: {
              GoalPoleStrikeWithBonusWait: {
                on: {
                  PASS_BALL: "#Gate1",
                  NEXT_PLAYER: "#GoalPole.GoalPoleSpark",
                  GOT_SENSOR: "GoalPoleStrikeWithBonusWaitSensorConfirm",
                },
              },
              GoalPoleStrikeWithBonusWaitSensorConfirm: {
                on: {
                  PASS_BALL: "#Gate1",
                  FALSE_NEGATIVE: "#GoalPole.GoalPoleSpark",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      debug: (context, event) => console.log("debug:", context, event),
    },
  },
);

export const XState = () => {
  console.log("default context with", machine.context);
  console.log(
    "overwrite context with",
    machine.withContext({ elapsed: 1000, direction: "north" }).context,
  );

  // transition type (pure func)
  console.log("initial state with", machine.initialState.value);
  let nextState = machine.transition("Gate1.WaitStrike1", "GOT_SENSOR");
  console.log("got sensor with", nextState.toStrings().slice(-1)[0]);
  // nextState.actions.forEach((action) => {
  //   typeof action.exec === "function" && action.exec(1, 2);
  // });
  // nextState = machine.transition(nextState, "PASS_BONUS_BALL");
  // console.log("got sensor with", nextState.value);
  // nextState = machine.transition(nextState, "PASS_BALL");
  // console.log("got sensor with", nextState.value);

  // service type
  // const service = interpret(machine);
  // service.start();
  // service.send("GOT_SENSOR");
  // service.send("PASS_BONUS_BALL");

  return (
    <div>
      <h1>XState</h1>
    </div>
  );
};
