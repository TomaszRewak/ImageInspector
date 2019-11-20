export function throwError<T>(message: string): T
{
	throw new Error(message);
}