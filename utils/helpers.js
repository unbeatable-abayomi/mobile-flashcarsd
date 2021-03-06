import AsyncStorage from '@react-native-async-storage/async-storage';


const NOTIFICATION_KEY = '@mobile_flashcard_notifications';
const STORAGE_KEY = '@mobile_flashcard_decks';

/**
 * Function to get deck information from async storage.
 *
 * @returns promise resolving with a JSON string value converted to an object
 */
export function getDecks () {
    return AsyncStorage.getItem(STORAGE_KEY).then(JSON.parse);
}

/**
 * Function to add a new deck to async storage.
 *
 * @returns promise
 */
export function createDeck (newDeckTitle) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [newDeckTitle]: {
            title: newDeckTitle,
            questions: []
        }
    }));
}

/**
 * Function to add a question to existing deck in async storage.
 *
 * @returns promise
 */
export function addCardToDeck (deck, question, answer) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deck.title]: {
            ...deck,
            questions: deck.questions.concat({question: question, answer: answer})
        }
    }));
}

/**
 * Function to remove all data from async storage.
 *
 * @returns promise
 */
export function emptyAllDecks () {
    return AsyncStorage.removeItem(STORAGE_KEY);
}

/**
 * Function to replace all data with initial test data in async storage.
 *
 * @returns promise resolves then passing the new data set as an object
 */
export function buildTestDecks () {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(testData)).then(() => testData);
}

// Default test data
const testData = {
    TestDeck1: {
        title: 'TestDeck1',
        questions: [
            {
                question: 'Are we having fun yet?',
                answer: 'Always!'
            },
            {
                question: 'Do you enjoy testing?',
                answer: 'Mostly.'
            },
            {
                question: 'Can you see this question?',
                answer: 'Yes!'
            }
        ]
    },
    TestDeck2: {
        title: 'TestDeck2',
        questions: [
            {
                question: 'What is more fun that coding?',
                answer: 'Nothing.'
            },
            {
                question: 'What is the airspeed velocity of an unladen swallow?',
                answer: 'African or European? 20 / 24'
            }
        ]
    }
}

/**
 * Function intends to replicate notification clearing logic. Since the expo.notification
 * we learned in the course work is no longer available in the new versions of expo.
 *
 * @returns boolean representing if notification was sent
 */
export function clearAlertNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY);
}

/**
 * Function intends to replicate notification logic thru alerts. Since the expo.notification
 * we learned in the course work is no longer available in the new versions of expo.
 *
 * @params int number of seconds to wait for notification
 * @returns boolean representing if notification was sent
 */
export function setAlertNotification (seconds) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      
        if (data === null) {
            setTimeout(() => {
                    alert("Don't forget to study your flashcards today!");
                },
                seconds * 1000
            );
          
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({notificationWasSent: true}))
            .then(() => {return true});
        }
        return false;
    });
}

