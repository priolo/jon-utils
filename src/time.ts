interface TimeoutDictionary {
    [key: string]: NodeJS.Timeout;
}

const timeoutIDs: TimeoutDictionary = {};

/**
 * Esegue una funzione dopo un determinato delay, resettando il timer se chiamata nuovamente
 * @param name Identificatore univoco del debounce
 * @param callback Funzione da eseguire
 * @param delay Ritardo in millisecondi
 */
export function debounce<T extends (...args: any[]) => void>(
    name: string,
    callback: T,
    delay: number = 0
): void {
    if (delay === 0) {
        callback();
        return;
    }

    const existingTimeout = timeoutIDs[name];
    if (existingTimeout) {
        clearTimeout(existingTimeout);
    }

    timeoutIDs[name] = setTimeout(() => {
        delete timeoutIDs[name];
        callback();
    }, delay);
}

/**
 * Crea una pausa asincrona
 * @param millisec Durata della pausa in millisecondi
 */
export const delay = (millisec: number): Promise<void> => new Promise(resolve => setTimeout(resolve, millisec))

/**
 * Aggiunge un timeout a una Promise
 * @param timeout Tempo massimo di attesa in millisecondi
 * @param promise Promise da monitorare
 * @throws Error se il timeout viene raggiunto
 */
export async function waitTimeout<T>(timeout: number, promise: Promise<T>): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout superato dopo ${timeout}ms`)), timeout);
    });

    return Promise.race([promise, timeoutPromise]);
}

/**
 * Genera un iteratore di date tra due date con incremento specificato
 * @param start Data di inizio
 * @param end Data di fine
 * @param step Incremento in giorni
 */
export function* forDates(
    start: Date | number,
    end: Date | number,
    step: number
): Generator<number> {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    
    const [minDate, maxDate] = startTime < endTime 
        ? [startTime, endTime] 
        : [endTime, startTime];

    let currentDate = new Date(minDate);
    
    while (currentDate.getTime() <= maxDate) {
        yield currentDate.getTime();
        currentDate.setDate(currentDate.getDate() + step);
    }
}