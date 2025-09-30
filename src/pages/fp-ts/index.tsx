import { log } from "fp-ts/Console";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import {
    capDelay,
    exponentialBackoff,
    limitRetries,
    Monoid,
    RetryStatus,
} from "retry-ts";
import { retrying } from "retry-ts/Task";

const policy = capDelay(
    2000,
    Monoid.concat(exponentialBackoff(200), limitRetries(5)),
);

const fakeAPI = TE.left("API errored out");

const logDelay = (status: RetryStatus) =>
    TE.rightIO(
        log(
            pipe(
                status.previousDelay,
                O.map((delay) => `retrying in ${delay} milliseconds...`),
                O.getOrElse(() => "first attempt..."),
            ),
        ),
    );

export const FpTs = () => {
    const onClick1 = () => {
        const result = retrying(
            policy,
            (status) => pipe(logDelay(status), TE.apSecond(fakeAPI)),
            E.isLeft,
        );

        result().then((e) => console.log(e));
    };

    return (
        <div>
            <h1>fp-ts</h1>

            <button onClick={onClick1}>start</button>
        </div>
    );
};
