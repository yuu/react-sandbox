import { ok, err, Result } from "neverthrow";

export type Option<T> = Result<T, undefined>;
export const some = <T>(value: T): Option<T> => ok(value);
export const none = <T>(): Option<T> => err(undefined);
